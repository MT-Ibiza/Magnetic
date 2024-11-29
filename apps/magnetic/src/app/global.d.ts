declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DIGITAL_OCEAN_BUCKET_ACCESS_KEY_ID: string;
      DIGITAL_OCEAN_BUCKET_ENDPOINT: string;
      DIGITAL_OCEAN_BUCKET_SECRET_ACCESS_KEY: string;
    }
  }
}
export {};
