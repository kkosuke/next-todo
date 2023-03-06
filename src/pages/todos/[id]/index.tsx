import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import moment from "moment";
import { PrimaryLinkButton } from "@/components/atoms/button/PrimaryLinkButton";
import { Button, DialogActions, DialogTitle } from "@mui/material";
import { SimpleDialog } from "@/components/molecules/dialog/SimpleDialog";

const TodoDetail = () => {
  const [todo, setTodo] = useState<any>(null);
  const router = useRouter();
  const id = router.query.id;
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (typeof id === "string") {
      const userDocumentRef = doc(db, "todos", id);
      getDoc(userDocumentRef).then((documentSnapshot) => {
        if (documentSnapshot.data()) {
          console.log({ ...documentSnapshot.data(), id });
          setTodo({ ...documentSnapshot.data(), id });
        }
      });
    }
  }, [id]);
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleTodoDelete = async () => {
    await deleteDoc(doc(db, "todos", String(id))).then(() => {
      router.push("/todos");
    });
  };
  return (
    <>
      <Head>
        <title>{id} | 詳細 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <p>
        <PrimaryLinkButton variant="outlined" href={`/todos/`} text="一覧へ" />
      </p>
      {todo ? (
        <>
          <SimpleDialog open={openDialog}>
            <DialogTitle>本当にTODOを削除しますか？</DialogTitle>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                キャンセル
              </Button>
              <Button onClick={handleTodoDelete} autoFocus>
                TODOを削除する
              </Button>
            </DialogActions>
          </SimpleDialog>
          <main>
            <div>
              <h1>{todo.title}</h1>
              <p>
                <PrimaryLinkButton href={`/todos/${id}/edit`} text="編集する" />{" "}
                <Button variant="outlined" onClick={handleOpen}>
                  削除する
                </Button>
              </p>
              <div>
                <p>{todo.detail}</p>
              </div>
            </div>
            <div>
              <div>
                期限：
                {moment(todo.deadlineAt.toDate()).format("YYYY/MM/DD HH:mm")}
              </div>
              <div>
                作成：
                {moment(todo.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
              </div>
              <div>
                編集：
                {moment(todo.editedAt.toDate()).format("YYYY/MM/DD HH:mm")}
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <p>TODOが見つかりません</p>
        </>
      )}
    </>
  );
};

export default TodoDetail;
