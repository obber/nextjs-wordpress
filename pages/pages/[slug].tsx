import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import PostTitle from "../../components/post-title";
import { getAllPagesWithSlug, getPage } from "../../lib/api";
import { CMS_NAME } from "../../lib/constants";

export default function Page({ page }) {
  const router = useRouter();

  console.log("page = ", page);

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={false}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${page.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                <meta
                  property="og:image"
                  content={page.featuredImage?.node.sourceUrl}
                />
              </Head>
              <PostHeader
                title={page.title}
                coverImage={page.featuredImage}
                date={page.date}
                categories={page.categories}
              />
              <PostBody content={page.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getPage(params?.slug);

  console.log("data = ", data);

  return {
    props: {
      page: data.page,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPages = await getAllPagesWithSlug();

  return {
    paths: allPages.edges.map(({ node }) => `/pages/${node.slug}`) || [],
    fallback: true,
  };
};
