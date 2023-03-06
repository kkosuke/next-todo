import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Button, TextField } from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PrimaryLinkButton } from "@/components/atoms/button/PrimaryLinkButton";

const Create = () => {
  const router = useRouter();
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoDeadlineAt, setTodoDeadlineAt] = useState("2023-03-01T00:00"); // 暫定的に設定（設定 or 未設定ができれば良いが…）

  const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoTitle) {
      const docRef = await addDoc(collection(db, "todos"), {
        title: todoTitle,
        detail: todoDetail,
        deadlineAt: Timestamp.fromDate(new Date(todoDeadlineAt)),
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTodoTitle("");
      setTodoDetail("");
      router.push(
        {
          pathname: "/todos",
          query: { situation: "todo_creat_success" },
        },
        "/"
      );
    } else {
      alert("タイトルを入力してください。");
    }
  };
  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>todos/create</h1>
      <main>
        <p>
          <PrimaryLinkButton
            href="/todos"
            text="TODO一覧に戻る"
            variant="outlined"
          />
        </p>
        <form onSubmit={handelFormSubmit}>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="TODOのタイトル"
              placeholder="例）今日のご飯"
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              multiline
              fullWidth
              value={todoDetail}
              InputProps={{
                rows: 3,
              }}
              label="TODOの詳細"
              placeholder="例）生姜焼き、味噌汁、ごはん"
              onChange={(e) => setTodoDetail(e.target.value)}
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              label="TODOの期限"
              type="datetime-local"
              value={todoDeadlineAt}
              onChange={(e) => setTodoDeadlineAt(e.currentTarget.value)}
            />
          </Box>
          <Button variant="contained" type="submit">
            この内容で作成する
          </Button>
        </form>
      </main>
    </>
  );
};

export default Create;
