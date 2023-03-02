import Head from "next/head";
import Link from "next/link";

export default function Mypage() {
  return (
    <>
      <Head>
        <title>Mypage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <p>
        <Link href="/">トップへ</Link>
      </p>
      <main>
        <h1>マイページ</h1>
        <p>コンテンツはありません</p>
      </main>
    </>
  );
}
