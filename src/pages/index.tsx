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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SimpleDialog } from "@/components/molecules/dialog/SimpleDialog";
import { Box, Container } from "@mui/system";
import Stack from "@mui/material/Stack";

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
          {router.query.from === "signup_success"
            ? "サインアップ"
            : "サインイン"}
          に成功しました
        </Alert>
      </Snackbar>
      <SimpleDialog open={openDialog}>
        <DialogTitle>本当にユーザー情報を削除しますか？</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            キャンセル
          </Button>
          <Button onClick={handleDelete} autoFocus>
            ユーザー情報を削除する
          </Button>
        </DialogActions>
      </SimpleDialog>
      <Box pt={8} pb={6}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            NEXT-TODO
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            「<Link href="/todos">TODOs</Link>
            」いい感じの文章が入ります。いい感じの文章が入ります。いい感じの文章が入ります。
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {user !== null ? (
              <>
                <PrimaryLinkButton href="/mypage" text="[WIP]マイページ" />
                <button type="button" onClick={handleLogout}>
                  サインアウト
                </button>
                <button type="button" onClick={handleOpen}>
                  ユーザー情報削除
                </button>
              </>
            ) : (
              <>
                <PrimaryLinkButton href="/signup" text="サインアップ" />

                <PrimaryLinkButton href="/signin" text="サインイン" />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
