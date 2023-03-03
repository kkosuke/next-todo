import { DefaultLayout } from "@/components/templates/DefaultLayout";
import "@/styles/globals.css";
import styles from "@/styles/app.module.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useAuth } from "@/context/auth";
import { AuthProvider } from "@/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const theme = createTheme();

type Props = {
  children: JSX.Element;
};
const Auth = ({ children }: Props): JSX.Element => {
  const isLoading = useAuth();
  return isLoading ? <p className={styles.loading}>Loading...</p> : children;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Auth>
          <DefaultLayout>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </DefaultLayout>
        </Auth>
      </AuthProvider>
    </RecoilRoot>
  );
}
