import Head from "next/head";
import { useRouter } from "next/router";
import { useUser, login } from "@/context/auth";
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { css } from "@emotion/react";
import { app } from "@/lib/firebase";

export default function SignIn() {
  const user = useUser();
  const router = useRouter();
  const isLoggedIn = !!user;
  const auth = getAuth(app);
  const [isSignInning, setIsSignInning] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSignInning(true);
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
    } finally {
      setIsSignInning(false);
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
  const handleClose = async () => {
    await router.push("/");
  };
  return (
    <>
      <Head>
        <title>SignIn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Snackbar
        open={isLoggedIn && !isSignInning}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています（トップに移動します）
        </Alert>
      </Snackbar>
      <main>
        <p>
          <Link href="/">トップへ</Link>
        </p>
        <h1>サインイン</h1>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-flow: column;
          `}
        >
          <form onSubmit={handleSubmit}>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <InputLabel>メールアドレス</InputLabel>
              <TextField
                name="email"
                type="email"
                size="small"
                onChange={handleChangeEmail}
                css={css`
                  padding-left: 12px;
                `}
              />
            </div>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 16px;
              `}
            >
              <InputLabel>パスワード</InputLabel>
              <TextField
                name="password"
                type="password"
                size="small"
                onChange={handleChangePassword}
                css={css`
                  padding-left: 12px;
                `}
              />
            </div>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                margin-top: 16px;
              `}
            >
              <Button type="submit" variant="outlined">
                サインイン
              </Button>
            </div>
            <div
              css={css`
                text-align: center;
                margin-top: 20px;
              `}
            >
              もしくは
            </div>
            <div
              css={css`
                text-align: center;
                margin-top: 20px;
              `}
            >
              <Button variant="contained" onClick={handleGoogleLogin}>
                google サインイン
              </Button>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                margin-top: 24px;
              `}
            >
              サインインは<Link href={"/signin"}>こちら</Link>から
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
