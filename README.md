This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# メモ1
Next.jsで「TODOリスト」を作成してください。
・「簡易アプリ仕様設計-SampleTODOリスト」のようにページを分けて作ってみましょう。
・一覧、詳細、作成、編集画面を分ける
・FirebaseなどバックエンドをつかったCRUD機能

余裕があれば
・ChakraUIもしくはMaterialUI導入
・ログイン、ログアウト、サインアップ
・useContextもしくはRecoilを用いた状態管理
・Typescriptを導入

# メモ2
- npx create-next-app .
- npm install firebase
- yarn add @emotion/react @mui/material @emotion/styled @mui/icons-material
- tsconfig.json を更新
- yarn add sass
- yarn add moment
- https://mui.com/material-ui/react-dialog/
- https://cloud.google.com/firestore/docs/manage-data/add-data?hl=ja#server_timestamp
- https://qiita.com/cieloazul310/items/d630da98439c89d773ba
- MUI textare https://codesandbox.io/s/material-ui-textareaautosize-l2l2v?from-embed=&file=/src/index.tsx:1629-1705
- 型の参考：https://qiita.com/Takepepe/items/f1ba99a7ca7e66290f24
- date-fns
  - https://github.com/date-fns/date-fns/issues/1143
  - https://www.azukipan.com/posts/react-date-fns/
- cleanup
  - https://zenn.dev/takuyakikuchi/articles/a96b8d97a0450c