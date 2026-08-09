import ContactForm from "@/components/contact-form";
import { getSite } from "@/constants/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function Contact() {
  const site = await getSite();

  return (
    <main className="grow">
      <div className="mx-auto px-4 py-16 lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            Contact
          </span>
          <span className="text-xs">お問い合わせ</span>
        </h1>
        <p className="mb-16 text-xs whitespace-pre-wrap lg:text-sm">
          {site.contact}
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
