import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../libs/s3";
import bcrypt from 'bcrypt';


export async function uploadFile(file: File) {
  const fileExtension = file.name.split('.').pop();
  const bytes = await file.arrayBuffer();
  const Body = Buffer.from(bytes);
  const Key = `${bcrypt.hash(file.name, 10)}.${fileExtension}`;
  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.DIGITAL_OCEAN_BUCKET_NAME,
      Key,
      Body,
      ACL: 'public-read',
    })
  );
  return {
    ...result,
    url: `${process.env.DIGITAL_OCEAN_BUCKET_ENDPOINT}/${process.env.DIGITAL_OCEAN_BUCKET_NAME}/${Key}`,
  };
}
