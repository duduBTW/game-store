import { ThemeProvider } from "styled-components";
import theme from "@/constants/theme";
import Pages from "@/components/pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Pages />
    </ThemeProvider>
  );
}

export default App;
