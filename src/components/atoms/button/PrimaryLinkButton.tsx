import { Button } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";

type Props = {
  href: string;
  text: string;
  variant?: string;
};

export const PrimaryLinkButton: FC<Props> = (props) => {
  const { href, text, variant = "contained" } = props;
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
      }}
    >
      <Button variant={variant}>{text}</Button>
    </Link>
  );
};
