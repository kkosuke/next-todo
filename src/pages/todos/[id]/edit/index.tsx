import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import moment from "moment";
import { PrimaryLinkButton } from "@/components/atoms/button/PrimaryLinkButton";
import {
  Alert,
  Button,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { SimpleDialog } from "@/components/molecules/dialog/SimpleDialog";

const TodoDetail = () => {
  const router = useRouter();
  const id = router.query.id;

  const [todo, setTodo] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, title: e.target.value });
  };
  const handleChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo({ ...todo, detail: e.target.value });
  };
  const handleChangeDeadlineAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      deadlineAt: Timestamp.fromDate(new Date(e.target.value)),
    });
  };
  const handleTodoDelete = async () => {
    if (typeof id === "string") {
      const userDocumentRef = doc(db, "todos", id);
      await updateDoc(userDocumentRef, {
        title: todo.title,
        detail: todo.detail,
        deadlineAt: todo.deadlineAt,
      })
        .then(() => {
          setOpenSnackbarSuccess(true);
        })
        .catch(() => {
          setOpenSnackbarError(true);
        })
        .finally(() => {
          setOpenDialog(false);
        });
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      const userDocumentRef = doc(db, "todos", id);
      getDoc(userDocumentRef).then((documentSnapshot) => {
        if (documentSnapshot.data()) {
          const _todo = { ...documentSnapshot.data(), id };
          setTodo(_todo);
        }
      });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>{id} | 編集 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <p>
        <PrimaryLinkButton
          variant="outlined"
          href={`/todos/${id}`}
          text="戻る"
        />
      </p>
      {todo ? (
        <>
          <Snackbar
            open={openSnackbarSuccess}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <Alert
              onClose={() => {
                setOpenSnackbarSuccess(false);
              }}
              severity="success"
              sx={{ width: "100%" }}
            >
              TODOを更新しました
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSnackbarError}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <Alert
              onClose={() => {
                setOpenSnackbarError(false);
              }}
              severity="error"
              sx={{ width: "100%" }}
            >
              TODO更新が失敗しました
            </Alert>
          </Snackbar>
          <SimpleDialog open={openDialog}>
            <DialogTitle>このTODOを更新します？</DialogTitle>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                キャンセル
              </Button>
              <Button onClick={handleTodoDelete} autoFocus>
                TODOを更新する
              </Button>
            </DialogActions>
          </SimpleDialog>
          <main>
            <div>
              <h1>
                <input
                  type="text"
                  value={todo.title}
                  onChange={handleChangeTitle}
                />
              </h1>
              <div>
                <p>
                  <textarea
                    value={todo.detail}
                    onChange={handleChangeDetail}
                  ></textarea>
                </p>
              </div>
            </div>
            <div>
              <p>
                期限：
                <input
                  type="datetime-local"
                  value={moment(todo.deadlineAt.toDate()).format(
                    "YYYY-MM-DDTHH:mm"
                  )}
                  onChange={handleChangeDeadlineAt}
                />
              </p>
              <div>
                作成：
                {moment(todo.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
              </div>
              <div>
                編集：
                {moment(todo.editedAt.toDate()).format("YYYY/MM/DD HH:mm")}
              </div>
            </div>
            <Button variant="contained" onClick={handleOpen}>
              更新する
            </Button>
          </main>
        </>
      ) : (
        <p>このTODOは存在しません。</p>
      )}
    </>
  );
};

export default TodoDetail;
