"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

export function RichTextField({
  label,
  name,
  defaultValue,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  hint?: string;
}) {
  const [html, setHtml] = useState(defaultValue ?? "");

  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-32 px-4 py-3 text-sm text-neutral-950 focus:outline-none prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1",
      },
    },
  });

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-neutral-950"> *</span>}
      </label>
      <div className="rounded-xl border border-black/10 bg-white focus-within:ring-2 focus-within:ring-neutral-950/20">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <input type="hidden" name={name} value={html} required={required} />
      {hint && <p className="mt-1 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  // Re-render the toolbar on every selection/transaction so active states stay in sync.
  const [, forceRender] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const rerender = () => forceRender((n) => n + 1);
    editor.on("selectionUpdate", rerender);
    editor.on("transaction", rerender);
    return () => {
      editor.off("selectionUpdate", rerender);
      editor.off("transaction", rerender);
    };
  }, [editor]);

  if (!editor) return null;

  const buttons: { label: string; title: string; onClick: () => void; active: boolean }[] = [
    {
      label: "B",
      title: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      label: "I",
      title: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      label: "• List",
      title: "Bullet list",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      label: "1. List",
      title: "Numbered list",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-black/10 p-2">
      {buttons.map((button) => (
        <button
          key={button.title}
          type="button"
          title={button.title}
          onClick={button.onClick}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            button.active
              ? "bg-neutral-950 text-white"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
