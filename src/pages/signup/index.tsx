import Head from "next/head";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useUser } from "@/context/auth";
import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material";
import Link from "next/link";
import { css } from "@emotion/react";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const user = useUser();
  const auth = getAuth(app);
  const isLoggedIn = !!user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = async () => {
    await router.push("/");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  return (
    <>
      <Head>
        <title>サインアップ（新規会員登録）</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          すでにログインしています（トップに移動します）
        </Alert>
      </Snackbar>
      <p>
        <Link href="/">トップへ</Link>
      </p>
      <main>
        <h1>サインアップ（新規会員登録）</h1>
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
                登録
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
