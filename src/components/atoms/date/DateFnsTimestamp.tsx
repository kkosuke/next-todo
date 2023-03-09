import React, { FC } from "react";
import { formatDistance, format } from "date-fns";
import { ja } from "date-fns/locale";

type Type = {
  dateObject: Date;
};

export const DateFnsTimestamp: FC<Type> = (props) => {
  const { dateObject } = props;
  const isPrevNext = new Date() > dateObject;
  return (
    <>
      {!isPrevNext && "あと"}
      {formatDistance(new Date(), dateObject, {
        locale: ja,
      })}
      {isPrevNext && "前"}（{format(dateObject, "yyyy-MM-dd HH:mm:ss")}）
    </>
  );
};
