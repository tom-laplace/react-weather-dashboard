import { QueryClient } from "@tanstack/react-query";

import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "./weather.api.types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const baseUrl = import.meta.env.VITE_WEATHER_API_URL;
if (!baseUrl) {
  throw new Error("WEATHER API URL not defined");
}

export const tsr = initTsrReactQuery(contract, {
  baseUrl,
  baseHeaders: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

export function getApiUrl(path: `/${string}`) {
  return `${baseUrl}/${path}`;
}
