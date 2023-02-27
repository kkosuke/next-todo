import React from "react";
import Head from "next/head";
import Link from "next/link";

const Create = () => {
  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>todos/create</h1>
      <main>
        <Link href="/todos">todos</Link>
      </main>
    </>
  );
};

export default Create;
