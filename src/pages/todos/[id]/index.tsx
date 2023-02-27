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
        <title>{id} | TODO詳細 | TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <p>
        <Link href="/todos">TODO一覧へ</Link>
      </p>
      <main>
        <div>
          <h1>{id}のTODOタイトル</h1>
          <p>
            <Link href={`/todos/${id}/edit`}>編集する</Link>
          </p>
          <div>
            <p>{id}のtodo説明</p>
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
