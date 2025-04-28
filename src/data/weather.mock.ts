export interface WeatherInfo{
  city: string 
  temperature: number 
}

export const weatherMock : WeatherInfo[] = [
  {
    city: "Bayonne",
    temperature: 21,
  },
  {
    city: "Biarritz",
    temperature: 17,
  },
  {
    city: "Saint-Jean-de-Luz",
    temperature: 16,
  },
];
