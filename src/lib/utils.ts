import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LinkType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLinkInputPlaceholder(linkType: LinkType): string {
  switch (linkType) {
    case "Spotify":
      return "https://spotify.com";
    case "Youtube":
      return "https://youtube.com";
    case "Twitter":
      return "https://x.com";
    default:
      return "";
  }
}

export function getYoutubeID(link: string) {
  try {
    const url = new URL(link);

    if (url.hostname.includes("www.youtube.com")) {
      return url.searchParams.get("v");
    }

    if (url.hostname === "youtu.be") {
      return url.pathname.slice(1);
    }
  } catch (err) {
    console.log(err);
  }
}

export function getSpotifySongID(link: string) {
  const url = new URL(link);

  return url.pathname.slice(7);
}

export function validateSpotifyLink(link: string) {
  try {
    const parsedURL = new URL(link);

    if (parsedURL.hostname.includes("open.spotify.com")) return true;
    else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function validateYoutubeLink(link: string) {
  try {
    const parsedURL = new URL(link);

    if (
      parsedURL.hostname.includes("www.youtube.com") ||
      parsedURL.hostname.includes("youtu.be")
    )
      return true;
    else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function generateSixDigitRoomCode() {
  const allDigits =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let roomCode = "";
  for (let i = 0; i < 6; i++) {
    roomCode += allDigits[Math.floor(Math.random() * allDigits.length)];
  }

  // TODO - Delete this after testing
  console.log("RoomCode: ", roomCode);

  return roomCode;
}
