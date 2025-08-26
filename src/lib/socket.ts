import { useUserStore } from "@/store/UserStore";
import type { Data, PrivacyOptions } from "./interfaces";
import { generateSixDigitRoomCode } from "./utils";
import { getUserIDByEmail } from "./api";

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

export function joinRoom(roomId: string) {
  const { user } = useUserStore.getState();

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

  if (!user) {
    console.log("User not logged in");
    return;
  }

  const createRoomData: Data = {
    type: "create-room",
    email: user?.email || "",
    roomId: generateSixDigitRoomCode(),
    roomName,
    privacy,
  };

  // Create the room in the database
  const roomData = {
    createdBy: await getUserIDByEmail(user?.email || ""),
    roomName: createRoomData.roomName,
    privacy: createRoomData.privacy,
  };

  console.log("roomData: ", roomData);

  socket?.send(JSON.stringify(createRoomData));
}
