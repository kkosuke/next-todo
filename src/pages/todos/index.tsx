import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { PrimaryButton } from "@/components/atoms/button/PrimaryButton";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Todos = () => {
  const [todos, setTodos] = useState<any>([]);
  useEffect(() => {
    const postData = collection(db, "todos");
    const q = query(postData, orderBy("createdAt", "desc"));
    // getDocs(q).then((snapshot)=>{
    //   setPosts(snapshot.docs.map((doc)=>(doc.data())));
    // });
    onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);
  return (
    <>
      <Head>
        <title>TODO一覧 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Link href="/">トップへ</Link>
      </div>
      <h1>TODO一覧</h1>
      <main>
        <p>
          <PrimaryButton href="/todos/create" text="TODOを新規作成する" />
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
