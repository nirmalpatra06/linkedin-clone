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
import { createPostAction } from "@/lib/serveraction";

export function PostDialog({
  user,
  openDialog,
  setOpenDialog,
  src,
}: {
  user: any;
  openDialog: boolean;
  setOpenDialog: any;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [inputText, setInputText] = useState<string>("");

  const handleChange = (e: any) => {
    setInputText(e.target.value);
  };

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedImg(dataUrl);
    }
  }

  const postActionHandler = async (formData: FormData) => {
    const inputText = formData.get("input") as string;
    // console.log(inputText);
    try {
      await createPostAction(inputText, selectedImg);
    } catch (error) {
      console.log("Error occured", error);
    }
    setInputText("");
    setSelectedImg("");
    setOpenDialog(false);
  };
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
              <h1>{`${user.firstName} ${user.lastName}`}</h1>
              <p className="text-xs">Post to Anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={postActionHandler}>
          <div className="flex flex-col">
            <Textarea
              onChange={handleChange}
              value={inputText}
              className="border-none text-lg focus-visible:ring-0"
              name="input"
              id="name"
              placeholder="What do you wnat to talk about?"
            />
          </div>
          <div className="my-4">
            {selectedImg && (
              <Image
                src={selectedImg}
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
