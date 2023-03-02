import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useUser, logout } from "@/context/auth";
import { PrimaryLinkButton } from "@/components/atoms/button/PrimaryLinkButton";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  const [isLoginSuccess, setIsLoginSuccess] = useState(
    router.query.from === "signup_success" ||
      router.query.from === "signin_success"
  );
  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Snackbar
        open={isLoginSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert onClose={() => setIsLoginSuccess(false)} severity="success">
          {router.query.from === "signup_success" ? (
            <>サインアップありがとうございます！</>
          ) : (
            <>サインインしました</>
          )}
        </Alert>
      </Snackbar>
      <main className={styles.main}>
        <p>
          <Link href="/todos">TODOs</Link>
        </p>

        {user !== null ? (
          <>
            <p>
              <Link href="/mypage">[WIP]マイページ</Link>
            </p>
            <p>
              <button type="button" onClick={handleLogout}>
                サインアウト
              </button>
            </p>
          </>
        ) : (
          <>
            <p>
              <PrimaryLinkButton href="/signup" text="サインアップ" />
            </p>
            <p>
              <PrimaryLinkButton href="/signin" text="サインイン" />
            </p>
          </>
        )}
      </main>
    </>
  );
}
