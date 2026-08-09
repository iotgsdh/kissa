"use client";

import { ContactFormState, submitContactForm } from "@/libs/actions";
import { useActionState } from "react";

const initialState: ContactFormState = {
  success: false,
  error: null,
  fieldErrors: null,
  ids: null,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  return (
    <div>
      <form action={formAction} className="grid gap-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block">
            お名前
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="山田 太郎"
            autoComplete="name"
            required
            aria-invalid={!!state.fieldErrors?.name}
            aria-describedby={
              state.fieldErrors?.name ? "name-error" : undefined
            }
            className="w-full rounded-sm border p-2"
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="text-error mbs-1 text-xs">
              {state.fieldErrors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block">
            メール
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            required
            aria-invalid={!!state.fieldErrors?.email}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className="w-full rounded-sm border p-2"
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="text-error mbs-1 text-xs">
              {state.fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block">
            メッセージ
          </label>
          <textarea
            name="message"
            id="message"
            rows={8}
            required
            aria-invalid={!!state.fieldErrors?.message}
            aria-describedby={
              state.fieldErrors?.message ? "message-error" : undefined
            }
            className="block w-full rounded-sm border p-2"
          ></textarea>
          {state.fieldErrors?.message && (
            <p id="message-error" className="text-error mbs-1 text-xs">
              {state.fieldErrors.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="bg-accent text-surface cursor-pointer rounded-sm p-4 font-bold"
        >
          {isPending ? "送信中..." : "送信"}
        </button>
      </form>

      {state.success && <p className="mbs-4">メールが送信されました</p>}

      {state.error && <p className="mbs-4">メールが送信できませんでした</p>}
    </div>
  );
}
