import { useUserStore } from "@/store/UserStore";
import type { Room } from "./interfaces";

// const GET_USER_ID_BY_EMAIL_URL = "http://localhost:3000/api/v1/user";
const GET_ROOMS_URL = "http://localhost:3000/api/v1/rooms";

// export async function getUserIDByEmail(email: string) {
//   console.log("GetUserIDByEmail Function Called with Email: ", email);

//   try {
//     const response = await fetch(GET_USER_ID_BY_EMAIL_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ email }),
//     });

//     const data = await response.json();
//     console.log("Data: ", data);
//     return data.userId;
//   } catch (err) {
//     console.error((err as any).message);
//   }
// }

export async function getRooms() {
  const { user } = useUserStore.getState();

  try {
    const response = await fetch(GET_ROOMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId: user?._id }),
    });

    const data = await response.json();
    return data.rooms;
  } catch (err) {
    console.error("An error occurred while fetching the rooms: ", err);
  }
}
