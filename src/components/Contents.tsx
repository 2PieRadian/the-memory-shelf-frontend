import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  spotifyEmbedLinkPrefix,
  youtubeEmbedLinkPrefix,
} from "@/lib/constants";
import { getSpotifySongID, getYoutubeID } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: string[];
  userId: string;
}

function YoutubeContentCard({ content }: { content: Content }) {
  const youtubeID = getYoutubeID(content.link);

  if (!youtubeID) return null;

  return (
    <div className="flex flex-col gap-[10px]">
      <iframe
        src={youtubeEmbedLinkPrefix + youtubeID}
        className="w-full aspect-video rounded-md"
        allowFullScreen
      ></iframe>

      <div className="flex items-center justify-between">
        <h1>{content.title}</h1>
      </div>
    </div>
  );
}

function SpotifyContentCard({ content }: { content: Content }) {
  return (
    <div>
      <iframe
        src={spotifyEmbedLinkPrefix + getSpotifySongID(content.link)}
        className="border w-full"
      ></iframe>
    </div>
  );
}

const Contents = React.memo(function () {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const isValidLocation =
    location.pathname === "/youtube" ||
    location.pathname === "/spotify" ||
    location.pathname === "/";

  if (!isValidLocation) {
    navigate("/404PageNotFound");
  }

  useEffect(() => {
    async function getContents() {
      try {
        setIsLoading(true);
        const response = await fetch(import.meta.env.VITE_BACKEND_CONTENT_URL, {
          credentials: "include",
        });
        const data = await response.json();

        setContents(data.contents);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getContents();
  }, []);

  if (isLoading) return <Loading text={"Loading Links..."} />;

  const contentStyles = "rounded-lg font-semibold border p-[10px]";

  console.log(location.pathname);

  interface ContentToRenderProps {
    path: string;
    contentType: string;
    content: Content;
  }

  function ContentToRender({
    path,
    contentType,
    content,
  }: ContentToRenderProps) {
    return (
      <>
        {path === "/youtube" && contentType === "Youtube" && (
          <div className="border p-[10px] rounded-md">
            <YoutubeContentCard content={content} />
          </div>
        )}

        {path === "/spotify" && contentType === "Spotify" && (
          <div className="border p-[10px] rounded-md">
            <SpotifyContentCard content={content} />
          </div>
        )}

        {path === "" && contentType === "Spotify" && (
          <div className="border p-[10px] rounded-md">
            <SpotifyContentCard content={content} />
          </div>
        )}

        {path === "" && contentType === "Youtube" && (
          <div className="border p-[10px] rounded-md">
            <YoutubeContentCard content={content} />
          </div>
        )}
      </>
    );
  }

  return (
    <div className="mt-[10px] pt-[20px] h-[calc(100svh-30px-41.6px-30px)] pb-[70px] md:pb-[70px] grid md:grid-cols-2 lg:grid-cols-3 gap-[10px] overflow-y-scroll no-scrollbar">
      {contents.map((content) => (
        <ContentToRender
          key={content._id}
          path={location.pathname}
          contentType={content.type}
          content={content}
        />
      ))}
    </div>
  );
});

export default Contents;
