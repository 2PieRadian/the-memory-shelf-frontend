import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface LabeledInputProps {
  label: string;
  placeholder: string;
  onChange?: () => void;
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

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
  }

  return (
    <div className="w-full px-[15px] h-[100svh] max-w-[700px] mx-auto flex flex-col gap-[30px]">
      <h1 className="text-[27px] mt-[30px] font-semibold text-center">
        Create content
      </h1>

      <div className="flex flex-col gap-[20px]">
        <LabeledInput
          label="Title"
          placeholder="eg. Title here"
          onChange={handleTitleChange}
        />
        <LabeledInput
          label="Link"
          placeholder="eg. https://youtube.com"
          onChange={handleLinkChange}
        />

        <div className="flex flex-col gap-[7px]">
          <Label>Type</Label>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spotify">Spotify</SelectItem>
              <SelectItem value="youtube">Youtube</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Link
        to="/"
        className="text-center bg-green-600 text-[17px] py-[5px] rounded-sm text-white"
      >
        Create
      </Link>
    </div>
  );
}
