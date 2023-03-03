import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useUser, login } from "@/context/auth";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { css } from "@emotion/react";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const user = useUser();
  const auth = getAuth(app);
  const isLoggedIn = !!user;
  const [isSignUpping, setIsSignUpping] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = async () => {
    await router.push("/");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSignUpping(true);
    try {
      if (password.length > 5) {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push(
          {
            pathname: "/",
            query: { from: "signup_success" },
          },
          "/"
        );
      }
    } finally {
      setIsSignUpping(false);
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
  return (
    <>
      <Head>
        <title>サインアップ（新規会員登録）</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Snackbar
        open={isLoggedIn && !isSignUpping}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています（トップに移動します）
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
            サインアップ（新規会員登録）
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
              autoFocus
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              サインアップする
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
              google サインアップ
            </Button>
            <Grid
              container
              css={css`
                margin: 16px 0 0;
              `}
            >
              <Grid item xs></Grid>
              <Grid item>
                サインインは
                <Link href={"/signin"}>こちら</Link>
                から
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
