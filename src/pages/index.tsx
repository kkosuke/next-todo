import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useUser, logout } from "@/context/auth";
import { PrimaryLinkButton } from "@/components/atoms/button/PrimaryLinkButton";
import {
  Alert,
  Button,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { SimpleDialog } from "@/components/molecules/dialog/SimpleDialog";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(
    router.query.from === "signup_success" ||
      router.query.from === "signin_success"
  );
  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = () => {
    if (user) {
      user.delete();
      setOpenDialog(false);
    }
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
      <SimpleDialog open={openDialog} onClose={handleClose}>
        <DialogTitle>本当にユーザー情報を削除しますか？</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            キャンセル
          </Button>
          <Button onClick={handleDelete} autoFocus>
            削除する
          </Button>
        </DialogActions>
      </SimpleDialog>
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
            <p>
              <button type="button" onClick={handleOpen}>
                ユーザー情報削除
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
