export type PrivacyOptions = "public" | "private";

export interface Data {
  type: "join-room" | "create-room" | "message" | "leave-room";
  email: string;
  roomId: string;
  message?: string;
  roomName?: string;
  privacy?: PrivacyOptions;
}

export interface Room {
  _id: string;
  createdBy: string;
  members: string[];
  roomId: string;
  roomName: string;
}
