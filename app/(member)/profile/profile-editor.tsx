"use client";

import { useState, type FormEvent } from "react";
import { Check, Plus, Upload } from "lucide-react";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardBody, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/field";
import { cn } from "@/lib/utils";

/**
 * Demo-only interactivity: tags and saves live in local state so the profile
 * screen feels real to click through. Nothing here is persisted — the app
 * has no write path for member-edited profile data yet.
 */

function useConfirm(resetMs = 1600) {
  const [confirmed, setConfirmed] = useState(false);
  function fire() {
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), resetMs);
  }
  return { confirmed, fire };
}

export function TagEditor({
  initialTags,
  tone = "neutral",
  placeholder
}: {
  initialTags: string[];
  tone?: BadgeTone;
  placeholder: string;
}) {
  const [tags, setTags] = useState(initialTags);
  const [draft, setDraft] = useState("");

  function addTag() {
    const value = draft.trim();
    if (!value) return;
    setTags((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setDraft("");
  }

  return (
    <>
      <CardBody className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {tags.length ? (
            tags.map((tag) => (
              <Badge key={tag} tone={tone}>
                {tag}
              </Badge>
            ))
          ) : (
            <p className="text-[13px] text-ink-3">Nothing added yet.</p>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-8"
        />
        <Button variant="secondary" size="sm" type="button" onClick={addTag}>
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </CardFooter>
    </>
  );
}

export function ReplaceLogoButton() {
  const { confirmed, fire } = useConfirm();
  return (
    <Button variant="secondary" size="sm" type="button" onClick={fire} className="w-[126px]">
      {confirmed ? (
        <>
          <Check className="h-3.5 w-3.5 text-positive" />
          Updated
        </>
      ) : (
        <>
          <Upload className="h-3.5 w-3.5" />
          Replace logo
        </>
      )}
    </Button>
  );
}

export function SaveDetailsForm({ children }: { children: React.ReactNode }) {
  const { confirmed, fire } = useConfirm(2000);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fire();
  }

  return (
    <form onSubmit={onSubmit}>
      {children}
      <CardFooter className="justify-end gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[12px] text-positive transition-opacity",
            confirmed ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Check className="h-3.5 w-3.5" />
          Saved
        </span>
        <Button type="submit">Save changes</Button>
      </CardFooter>
    </form>
  );
}
