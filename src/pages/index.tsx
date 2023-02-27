import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <p>
          <Link href="/todos">TODOs</Link>
        </p>
        <p>
          <Link href="/signup">[WIP]サインアップ</Link>
        </p>
        <p>
          <Link href="/signin">[WIP]サインイン</Link>
        </p>
        <p>
          <Link href="/mypage">[WIP]マイページ</Link>
        </p>
      </main>
    </>
  );
}
