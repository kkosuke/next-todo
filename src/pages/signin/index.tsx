import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/react";
import { app } from "@/lib/firebase";
import { useUser, login } from "@/context/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

export default function SignIn() {
  const user = useUser();
  const router = useRouter();
  const isLoggedIn = !!user;
  const auth = getAuth(app);

  const [isNeedToSignin, setIsNeedToSignin] = useState(
    router.query.situation === "need_to_signin"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password.length > 5) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push(
          {
            pathname: "/",
            query: { from: "signin_success" },
          },
          "/"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleGoogleLogin = (): void => {
    login().catch((error) => console.error(error));
  };
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>SignIn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Snackbar
        open={isNeedToSignin}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <Alert onClose={() => setIsNeedToSignin(false)} severity="info">
          利用するにはログインをしてください。
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            サインイン
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChangeEmail}
              autoFocus={!isNeedToSignin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              onChange={handleChangePassword}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="[WIP]Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              サインイン
            </Button>
            <div
              css={css`
                text-align: center;
                margin: 16px 0;
              `}
            >
              もしくは
            </div>
            <Button variant="contained" fullWidth onClick={handleGoogleLogin}>
              google サインイン
            </Button>
            <Grid
              container
              css={css`
                margin: 16px 0 0;
              `}
            >
              <Grid item xs>
                <Link href="#">[WIP]Forgot password?</Link>
              </Grid>
              <Grid item>
                サインアップは
                <Link href={"/signup"}>こちら</Link>
                から
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
