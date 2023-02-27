import { Button } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  href: string;
  text: string;
};

export const PrimaryLinkButton: FC<Props> = (props) => {
  const { href, text } = props;
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
      }}
    >
      <Button variant="contained">{text}</Button>
    </Link>
  );
};
