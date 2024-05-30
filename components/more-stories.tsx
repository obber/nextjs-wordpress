import PostPreview from "./post-preview";

export default function Stories({ posts, title = "More Stories" }) {
  return (
    <section>
      <div className="flex flex-col mb-8 gap-2">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
        <p className="text-lg text-gray-600">Category</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
