import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const TodoDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>{id} | TODO編集 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div>
          <h1>
            <input type="text" value={`${id}のTODOタイトル`} readOnly />
          </h1>
          <p>
            <Link href={`/todos/${id}`}>キャンセル</Link>{" "}
            <Link href={`/todos/${id}`}>更新</Link>
          </p>
          <div>
            <p>
              <textarea value={`${id}のtodo説明`} readOnly></textarea>
            </p>
          </div>
        </div>
        <div>
          <p>{id}のTODO期限</p>
          <p>{id}の作成日</p>
          <p>{id}の編集日</p>
        </div>
      </main>
    </>
  );
};

export default TodoDetail;
