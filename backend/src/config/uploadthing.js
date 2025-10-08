import { createUploadthing } from "uploadthing/express";

const f = createUploadthing(); // reads UPLOADTHING_TOKEN from env

export const uploadRouter = {
  imageUploader: f({
    image: { maxFileSize: "87MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("✅ UploadThing uploaded:", file.url);
    return { fileUrl: file.url };
  }),
};
