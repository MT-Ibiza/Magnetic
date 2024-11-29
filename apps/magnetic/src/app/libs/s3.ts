import { S3 } from '@aws-sdk/client-s3';

export const s3Client = new S3({
  endpoint: process.env.DIGITAL_OCEAN_BUCKET_ENDPOINT,
  region: process.env.DIGITAL_OCEAN_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.DIGITAL_OCEAN_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.DIGITAL_OCEAN_BUCKET_SECRET_ACCESS_KEY,
  },
});
