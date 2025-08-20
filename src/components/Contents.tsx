import { useEffect } from "react";
import Loading from "./Loading";
import {
  spotifyEmbedLinkPrefix,
  youtubeEmbedLinkPrefix,
} from "@/lib/constants";
import { getSpotifySongID, getYoutubeID } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useContent, type ContentItem } from "@/store/ContentStore";

function YoutubeContentCard({ content }: { content: ContentItem }) {
  const youtubeID = getYoutubeID(content.link);

  if (!youtubeID) return null;

  return (
    <div className="flex flex-col gap-[10px] border p-[10px] rounded-md">
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

function SpotifyContentCard({ content }: { content: ContentItem }) {
  return (
    <div className="border p-[10px] rounded-md h-fit">
      <iframe
        src={spotifyEmbedLinkPrefix + getSpotifySongID(content.link)}
        className="w-full h-[152px]"
      ></iframe>
    </div>
  );
}

export default function Contents() {
  const { contents, isLoading, fetchContents } = useContent();

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
    fetchContents();
  }, []);

  if (isLoading) return <Loading text={"Loading Links..."} />;

  interface ContentToRenderProps {
    path: string;
    contentType: string;
    content: ContentItem;
  }

  console.log(location.pathname);
  function ContentToRender({
    path,
    contentType,
    content,
  }: ContentToRenderProps) {
    return (
      <>
        {/* Youtube */}
        {path === "/youtube" && contentType === "Youtube" && (
          <YoutubeContentCard content={content} />
        )}

        {/* Spotify */}
        {path === "/spotify" && contentType === "Spotify" && (
          <SpotifyContentCard content={content} />
        )}

        {/* Default (home path) */}
        {path === "/" && contentType === "Youtube" && (
          <YoutubeContentCard content={content} />
        )}

        {path === "/" && contentType === "Spotify" && (
          <SpotifyContentCard content={content} />
        )}
      </>
    );
  }

  return (
    <div className="mt-[10px] pt-[20px] h-[calc(100svh-30px-41.6px-30px)] pb-[70px] md:pb-[70px] grid content-start md:grid-cols-2 lg:grid-cols-3 gap-[10px] overflow-y-scroll no-scrollbar">
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
}
