import { initContract } from "@ts-rest/core";
import { z } from "zod";

const APIErrorTemplate = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    errors: dataSchema,
  });

export const APIErrorSchema = z.object({
  message: z.string(),
  code: z.number(),
});
export type APIError = z.infer<typeof APIErrorSchema>;

const APILocationSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  tz_id: z.string(),
  localtime_epoch: z.number(),
  localtime: z.string(),
});

const APIAirQualitySchema = z.object({
  co: z.number(),
  o3: z.number(),
  no2: z.number(),
  so2: z.number(),
  pm2_5: z.number(),
  pm10: z.number(),
  "us-epa-index": z.number(),
  "gb-defra-index": z.number(),
});

const APIRealtimeSchema = z.object({
  last_updated: z.string(),
  last_updated_epoch: z.number(),
  temp_c: z.number(),
  temp_f: z.number(),
  feelslike_c: z.number(),
  feelslike_f: z.number(),
  windchill_c: z.number(),
  windchill_f: z.number(),
  heatindex_c: z.number(),
  heatindex_f: z.number(),
  dewpoint_c: z.number(),
  dewpoint_f: z.number(),
  condition: z.object({
    text: z.string(),
    icon: z.string(),
    code: z.number(),
  }),
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  pressure_in: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  cloud: z.number(),
  is_day: z.number(),
  uv: z.number(),
  gust_mph: z.number(),
  gust_kph: z.number(),
  air_quality: APIAirQualitySchema,
});

export const APICurrentWeatherPayloadSchema = z.object({
  location: APILocationSchema,
  current: APIRealtimeSchema,
});
export type APICurrentWeatherSchema = z.infer<
  typeof APICurrentWeatherPayloadSchema
>;

const c = initContract();

export const contract = c.router({
  getCurrentWeather: {
    method: "GET",
    path: "/current.json",
    query: z.object({
      q: z.string(),
      key: z.string().default(import.meta.env.VITE_WEATHER_API_KEY),
    }),
    responses: {
      200: APICurrentWeatherPayloadSchema,
      400: APIErrorTemplate(APIErrorSchema),
      401: APIErrorTemplate(APIErrorSchema),
      403: APIErrorTemplate(APIErrorSchema),
    },
    summary: "Get the current weather for a given location.",
  },
});
