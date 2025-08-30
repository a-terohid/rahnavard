"use client";

import { Editor } from "@tiptap/react";
import { LuBold, LuHeading1, LuHeading3, LuItalic } from "react-icons/lu";
import { GoStrikethrough } from "react-icons/go";
import { CiTextAlignCenter, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { PiHighlighterLight } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";


export default function TiptabMenueBar({ editor , setImages }: { editor: Editor | null , setImages: React.Dispatch<React.SetStateAction<File[]>>; }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    if (!editor) return null;



  const Options = [
    {
      icon: <LuHeading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <LuHeading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <LuHeading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <LuBold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <LuItalic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <GoStrikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },
    {
      icon: <CiTextAlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      active: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <CiTextAlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      active: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <CiTextAlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      active: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AiOutlineUnorderedList className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: <AiOutlineOrderedList className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      icon: <PiHighlighterLight className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      editor?.chain().focus().setImage({ src: url }).run();
      setImages((prev) => [...prev, file]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border rounded-md p-1 mb-1 bg-Neutral flex gap-1 flex-wrap">
      {Options.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          className={`p-2 rounded-md border text-sm ${
            option.active
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          {option.icon}
        </button>
      ))}
        <button
        onClick={triggerFileInput}
        className="p-2 rounded-md border text-sm bg-white text-gray-800 hover:bg-gray-100"
        title="Upload image"
      >
        <CiImageOn className="size-4" />
      </button>
        <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}