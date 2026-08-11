import { Link } from "react-router";


export default function PathCard({ path }) {
return (
  <article className="group flex min-h-56 flex-col rounded-2xl border border-zinc-900 bg-zinc-950 p-5 transition hover:-translate-y-1 hover:border-zinc-700">

    <div className="mb-6 flex items-start justify-between gap-4">
      <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-500">
        {path.visibility}
      </span>
    </div>

    <h2 className="text-xl font-medium tracking-tight">
      {path.title}
    </h2>

    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-500">
      {path.description || "No description provided."}
    </p>

    <div className="mt-auto pt-6">
      <Link
        to={`/path/${path._id}`}
        className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-800 px-4 py-2.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
      >
       Open Task Board
      </Link>
    </div>

  </article>
);
}