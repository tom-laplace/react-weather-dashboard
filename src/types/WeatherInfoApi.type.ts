export type WeatherInfoApi = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    cloud: number;
    uv: number;
  };
};

export type WeatherErrorApi = {
  message: string;
  code: string;
};
