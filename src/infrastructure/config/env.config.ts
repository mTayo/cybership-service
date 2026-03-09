import dotenv from "dotenv";

dotenv.config();

export const config = {
  upsClientId: process.env.UPS_CLIENT_ID!,
  upsClientSecret: process.env.UPS_CLIENT_SECRET!,
  upsBaseUrl: process.env.UPS_BASE_URL!,
  upsAuthUrl: process.env.UPS_AUTH_URL!,
  httpTimeout: Number(process.env.HTTP_TIMEOUT || 5000)
};
