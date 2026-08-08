export default function PathCard({ path }) {
  return (
    <article>
      <h2>{path.title}</h2>

      <p>
        {path.description || "No description provided."}
      </p>

      <p>Visibility: {path.visibility}</p>
    </article>
  );
}