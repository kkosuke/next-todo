// つくったけど、firebaseでのType設定が全然できなかった。。
export type TodoType = {
  id: string;
  detail:string;
  title : string;
  createdAt:Date;
  deadlineAt:Date;
  editedAt: Date;
}