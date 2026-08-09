import * as z from "zod";

export const User = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください")
    .max(50, "50文字以内で入力してください"),
  email: z
    .email("メールアドレスの形式が正しくありません")
    .trim()
    .min(1, "メールアドレスを入力してください"),
  message: z
    .string()
    .trim()
    .min(1, "お問い合わせ内容を入力してください")
    .max(1000, "1000文字以内で入力してください"),
});
