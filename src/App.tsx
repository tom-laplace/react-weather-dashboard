import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { WeatherDashboard } from "./components/weather-dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <WeatherDashboard></WeatherDashboard>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
