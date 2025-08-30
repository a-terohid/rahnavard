"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TiptabMenueBar from "./TiptabMenueBar";
import Image from "@tiptap/extension-image";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
    setImages: React.Dispatch<React.SetStateAction<File[]>>;

}

const TiptapEditor = ({ content, onChange , setImages }: RichTextEditorProps) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px]  border rounded-md bg-primary-0 py-2 px-3 focus:text-neutral-900 focus:border-neutral-900 focus:outline-none",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="tiptap">
        <TiptabMenueBar editor={editor} setImages={setImages}/>
        <div className="max-h-[450px] overflow-y-auto border rounded-md bg-primary-0">
            <EditorContent editor={editor} />
        </div>
    </div>
  );
};

export default TiptapEditor;