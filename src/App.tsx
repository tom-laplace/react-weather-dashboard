import { AppWeather } from "@/app/app-weather";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { queryClient } from "@/services/weather.api";
import { QueryClientProvider } from "@tanstack/react-query";
import { JotaiProvider } from "./components/jotai-provider";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout children={<AppWeather></AppWeather>} />
        </ThemeProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
