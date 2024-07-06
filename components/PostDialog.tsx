import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileImage from "./shared/ProfileImage";
import { Textarea } from "./ui/textarea";
import React, { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import Image from "next/image";
import { Images } from "lucide-react";

export function PostDialog({
  openDialog,
  setOpenDialog,
  src,
}: {
  openDialog: boolean;
  setOpenDialog: any;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState("");

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelected(dataUrl);
    }
  }
  return (
    <Dialog open={openDialog}>
      <DialogContent
        onInteractOutside={() => setOpenDialog(false)}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfileImage src={src} />
            <div>
              <h1>Tukuna Patra</h1>
              <p className="text-xs">Post to Anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action="">
          <div className="flex flex-col">
            <Textarea
              className="border-none text-lg focus-visible:ring-0"
              name="input"
              id="name"
              placeholder="What do you wnat to talk about?"
            />
          </div>
          <div className="my-4">
            {selected && (
              <Image
                src={selected}
                alt="selectedImage"
                width={400}
                height={400}
              />
            )}
          </div>
          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={handleImageFile}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button
          className="gap-2"
          onClick={() => inputRef?.current?.click()}
          variant={"ghost"}
        >
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
