import React, { FC, ReactNode } from "react";
import Style from "./DefaultLayout.module.scss";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className={Style.main}>{children}</div>
    </div>
  );
};
