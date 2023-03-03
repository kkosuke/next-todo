import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import Style from "./DefaultLayout.module.scss";
import { css } from "@emotion/react";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Toolbar sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="inherit" noWrap>
              <Link
                href="/"
                css={css`
                  color: #fff;
                  text-decoration: none;
                `}
              >
                NEXT-TODO
              </Link>
            </Typography>
            <Link
              href="/todos"
              css={css`
                margin-left: 16px;
                color: #fff;
                text-decoration: none;
              `}
            >
              一覧
            </Link>
          </Toolbar>
          <nav>
            <div>ナビゲーション要素A</div>
          </nav>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="xl">{children}</Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            <Typography color="text.secondary">
              {"Copyright © "}
              NEXT-TODO {new Date().getFullYear()}
              {"."}
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};
