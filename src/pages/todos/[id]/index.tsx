import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import moment from "moment";

const TodoDetail = () => {
  const [todo, setTodo] = useState<any>();
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    const userDocumentRef = doc(db, "todos", String(id));
    getDoc(userDocumentRef).then((documentSnapshot) => {
      if (id !== undefined && typeof id === "string") {
        setTodo({ ...documentSnapshot.data(), id });
      }
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>{id} | TODO詳細 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <p>
        <Link href="/todos">TODO一覧へ</Link>
      </p>
      {todo ? (
        <main>
          <div>
            <h1>{todo.title}</h1>
            <p>
              <Link href={`/todos/${id}/edit`}>編集する</Link>
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
              作成：{moment(todo.createdAt.toDate()).format("YYYY/MM/DD HH:mm")}
            </div>
            <div>
              編集：{moment(todo.editedAt.toDate()).format("YYYY/MM/DD HH:mm")}
            </div>
          </div>
        </main>
      ) : (
        <>
          <p>TODOが見つかりません</p>
        </>
      )}
    </>
  );
};

export default TodoDetail;
