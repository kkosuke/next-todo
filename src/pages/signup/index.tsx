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
import { useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const user = useUser();
  const auth = getAuth(app);
  const isLoggedIn = !!user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password.length > 5) {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push(
          {
            pathname: "/",
            query: { situation: "signup_success" },
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
        <title>サインアップ（新規会員登録）</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
