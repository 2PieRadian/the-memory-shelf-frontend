import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LinkType } from "@/lib/types";
import { Home } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";

import BottomNavbar from "@/components/BottomNavbar";
import BottomNavbarIcon from "@/components/BottomNavbarIcon";
import { getLinkInputPlaceholder, validateYoutubeLink } from "@/lib/utils";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({ label, placeholder, onChange }: LabeledInputProps) {
  return (
    <div className="flex flex-col gap-[5px]">
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        className="text-[15px]"
        onChange={onChange}
      />
    </div>
  );
}

export default function CreateContent() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const location = useLocation();

  let contentType = location.pathname.split("/")[2];
  contentType = contentType[0].toUpperCase() + contentType.substring(1);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  async function createContent() {
    if (!title || !link) {
      window.alert("Title and Link must not be empty");
      return;
    }

    if (contentType.toLowerCase() === "youtube" && !validateYoutubeLink(link)) {
      alert("Link is not valid!");
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_CONTENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: link, title: title, type: contentType }),
        credentials: "include",
      });

      console.log(await response.json());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full relative h-[100svh]">
      <div className="absolute top-[calc(50%-50px)] left-1/2 -translate-x-1/2 -translate-y-1/2 border w-[calc(100%-30px)] p-[15px] max-w-[700px] flex flex-col gap-[30px] rounded-md">
        <h1 className="text-[27px] mt-[15px] font-semibold text-center">
          Add {contentType} link
        </h1>

        <div className="flex flex-col gap-[20px]">
          <LabeledInput
            label="Title"
            placeholder="eg. Title here"
            value={title}
            onChange={handleTitleChange}
          />
          <LabeledInput
            label="Link"
            placeholder={getLinkInputPlaceholder(contentType as LinkType)}
            value={link}
            onChange={handleLinkChange}
          />

          <LabeledInput
            label="Add Tags"
            placeholder="#Machine learning, #ElonMusk"
            value={link}
            onChange={handleLinkChange}
          />
        </div>

        <Link to="/">
          <Button className="cursor-pointer w-full" onClick={createContent}>
            Create
          </Button>
        </Link>
      </div>

      <BottomNavbar>
        <BottomNavbarIcon to="/" Icon={Home}></BottomNavbarIcon>
      </BottomNavbar>
    </div>
  );
}
