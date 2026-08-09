import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grow">
      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 py-16">
        <div>
          <h1>Not Found</h1>
          <p className="mb-16">Could not find requested resource</p>
          <div className="flex justify-center">
            <Link
              href={ROUTES[0].path}
              className="underline underline-offset-(--underline-offset)"
            >
              Return Top
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
