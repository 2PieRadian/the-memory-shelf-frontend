import { useUserStore } from "@/store/UserStore";
import type { Data, PrivacyOptions } from "./interfaces";
import { generateSixDigitRoomCode } from "./utils";

// Create WebSocket connection
const PORT = 8081;
let socket: WebSocket | null = null;

// Functions
export function connectSocket() {
  if (!socket) {
    socket = new WebSocket(`ws://localhost:${PORT}`);
  }

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  socket.onmessage = (event) => {
    console.log("Message from server: ", event.data);
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };
}

// Join Room
export function joinRoom(roomId: string) {
  const { user } = useUserStore.getState();

  console.log("Joining room: ", roomId);

  const joinRoomData: Data = {
    type: "join-room",
    email: user?.email || "",
    roomId,
  };

  // Send the stringified data to the WebSocket server
  socket?.send(JSON.stringify(joinRoomData));
}

// Create Room and save it to the database and send the room code to the client
export async function createRoom(roomName: string, privacy: PrivacyOptions) {
  const { user } = useUserStore.getState();
  console.log(user);

  if (!user) {
    console.log("User not logged in");
    return;
  }

  // To send to the WebSocket server
  const createRoomData: Data = {
    type: "create-room",
    email: user?.email || "",
    roomId: generateSixDigitRoomCode(),
    roomName,
    privacy,
  };

  // To save in the Database
  const roomData = {
    createdBy: user._id,
    roomId: createRoomData.roomId,
    roomName: createRoomData.roomName,
    privacy: createRoomData.privacy,
  };

  // Saving the room to the database
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_CREATE_ROOM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
      credentials: "include",
    });

    const data = await response.json();
    console.log("Data: ", data);
  } catch (error) {
    console.error("Error creating room: ", error);
    return;
  }

  socket?.send(JSON.stringify(createRoomData));
}
