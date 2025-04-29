import { AppWeather } from "@/app/app-weather";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { queryClient } from "@/services/weather.api";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout children={<AppWeather></AppWeather>} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
