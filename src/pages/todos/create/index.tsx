import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Create = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoDeadlineAt, setTodoDeadlineAt] = useState("2023-03-01T00:00"); // 暫定的に設定（設定 or 未設定ができれば良いが…）

  // 一旦コメントアウトで保存しておく。
  // const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setTodoTitle(e.target.value);
  // ;
  // const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //   setTodoDetail(e.target.value);
  // ;

  // 型の参考：https://qiita.com/Takepepe/items/f1ba99a7ca7e66290f24
  const handelFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoTitle) {
      const docRef = await addDoc(collection(db, "todos"), {
        title: todoTitle,
        detail: todoDetail,
        deadlineAt: todoDeadlineAt,
        createdAt: serverTimestamp(),
        editedAt: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      setTodoTitle("");
      setTodoDetail("");
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
        <div>
          <Link href="/todos">TODO一覧に戻る</Link>
        </div>
        <form onSubmit={handelFormSubmit}>
          <div>タイトル</div>
          <div>
            <input
              type="text"
              placeholder="例）今日のご飯"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </div>
          <div>詳細</div>
          <div>
            <textarea
              value={todoDetail}
              placeholder="例）生姜焼き、味噌汁、ごはん"
              onChange={(e) => setTodoDetail(e.target.value)}
            ></textarea>
          </div>
          <div>期限</div>
          <div>
            <input
              type="datetime-local"
              value={todoDeadlineAt}
              onChange={(e) => setTodoDeadlineAt(e.currentTarget.value)}
            />
          </div>
          <Button variant="contained" type="submit">
            この内容で作成する
          </Button>
        </form>
      </main>
    </>
  );
};

export default Create;
