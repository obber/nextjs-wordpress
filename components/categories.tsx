import Link from "next/link";

export default function Categories({ categories }) {
  return (
    <span className="ml-1">
      under
      {categories.edges.length > 0 ? (
        categories.edges.map((category, index) => (
          <Link
            href={`/category/${category.node.slug}`}
            className="hover:underline"
            key={index}
          >
            <span key={index} className="ml-1">
              {category.node.name}
            </span>
          </Link>
        ))
      ) : (
        <span className="ml-1">{categories.edges.node.name}</span>
      )}
    </span>
  );
}
