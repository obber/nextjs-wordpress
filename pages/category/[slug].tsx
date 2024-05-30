import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import { getAllCategories, getCategoryAndAssociatedPosts } from "../../lib/api";
import { HeroPostWithMorePosts } from "../../components/hero-post-with-more-posts";
import MoreStories from "../../components/more-stories";

export default function Post({ category, preview }) {
  const router = useRouter();
  const posts = category.node.posts;

  if (!router.isFallback && !category?.node.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <MoreStories posts={posts.edges} title={category.node.name} />
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const data = await getCategoryAndAssociatedPosts(String(params?.slug));

  return {
    props: {
      preview,
      category: data,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getAllCategories();

  return {
    paths:
      allCategories.edges.map(({ node }) => `/category/${node.slug}`) || [],
    fallback: true,
  };
};
