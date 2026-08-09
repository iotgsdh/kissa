import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex justify-center gap-x-4">
      {currentPage > 1 && (
        <div>
          <Link
            href={`?page=${currentPage - 1}`}
            className="grid size-8 place-content-center rounded-full border tracking-normal lg:size-10"
          >
            {currentPage - 1}
          </Link>
        </div>
      )}
      {currentPage && (
        <div className="bg-secondary text-surface grid size-8 place-content-center rounded-full border tracking-normal lg:size-10">
          <span>{currentPage}</span>
        </div>
      )}
      {currentPage < totalPages && (
        <div>
          <Link
            href={`?page=${currentPage + 1}`}
            className="grid size-8 place-content-center rounded-full border tracking-normal lg:size-10"
          >
            {currentPage + 1}
          </Link>
        </div>
      )}
    </div>
  );
}
