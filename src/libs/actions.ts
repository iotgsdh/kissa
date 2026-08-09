"use server";

import { resend } from "./resend";
import { User } from "./validation/contact";

export interface ContactFormState {
  success: boolean;
  error: string | null;
  fieldErrors: {
    name?: string;
    email?: string;
    message?: string;
  } | null;
  ids: { id: string }[] | null;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const result = User.safeParse({ name, email, message });

  if (!result.success) {
    const fieldErrors: NonNullable<ContactFormState["fieldErrors"]> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof fieldErrors;
      fieldErrors[field] = issue.message;
    });

    return {
      success: false,
      error: null,
      fieldErrors,
      ids: null,
    };
  }

  const {
    name: validatedName,
    email: validatedEmail,
    message: validatedMessage,
  } = result.data;

  const fromEmail = "Resend <onboarding@resend.dev>";
  const contactEmail = "tw08iwckpyvz48pfu0sx@gmail.com";

  try {
    const { data, error } = await resend.batch.send([
      {
        from: fromEmail,
        to: [validatedEmail],
        subject: "お問い合わせありがとうございます",
        text: `
お問い合わせを受け付けました。
内容を確認の上、担当者よりご連絡いたします。
        
【お問い合わせ内容】

お名前：${validatedName}

メールアドレス：${validatedEmail}

お問い合わせ内容：
${validatedMessage}

※通常は○営業日以内にご返信いたします。

※このメールは送信専用の自動返信メールです。ご返信いただいてもお返事できませんので、あらかじめご了承ください。
`,
      },
      {
        from: fromEmail,
        to: [contactEmail],
        subject: "新しいお問い合わせを受け付けました",
        replyTo: `${validatedEmail}`,
        text: `
【お問い合わせ情報】

お名前：
${validatedName}

メールアドレス：
${validatedEmail}

お問い合わせ内容：
${validatedMessage}
`,
      },
    ]);

    if (error) {
      console.error("Resend batch error", error);
      return {
        success: false,
        error: error.message,
        fieldErrors: null,
        ids: null,
      };
    }

    return {
      success: true,
      error: null,
      fieldErrors: null,
      ids: data?.data ?? null,
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      error: "メールの送信に失敗しました。時間をおいて再度お試しください。",
      fieldErrors: null,
      ids: null,
    };
  }
}
