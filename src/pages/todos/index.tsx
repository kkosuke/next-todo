import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PrimaryLinkButton } from "@/components/atoms/button/PrimaryLinkButton";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Alert, Snackbar } from "@mui/material";

const Todos = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<any>([]);
  const [isTodoCreateSuccess, setIsTodoCreateSuccess] = useState(
    router.query.situation === "todo_create_success"
  );

  useEffect(() => {
    const postData = collection(db, "todos");
    const q = query(postData, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Head>
        <title>TODO一覧 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Snackbar
        open={isTodoCreateSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <Alert onClose={() => setIsTodoCreateSuccess(false)} severity="success">
          TODO作成に成功しました。
        </Alert>
      </Snackbar>

      <h1>TODO一覧</h1>
      <main>
        <p>
          <PrimaryLinkButton href="/todos/create" text="TODOを新規作成する" />
        </p>
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>
              <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Todos;
