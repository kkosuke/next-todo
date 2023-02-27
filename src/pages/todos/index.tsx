import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Todos = () => {
  const [todos, setTodos] = useState([1, 2, 3, 4, 5]);
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
          <Link href="/todos/create">TODOを新規作成する</Link>
        </p>
        <div>
          {todos.map((todo) => (
            <div key={todo}>
              <Link href={`/todos/${todo}`}>/todos/{todo}</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Todos;
