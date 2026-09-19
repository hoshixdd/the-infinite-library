import { notFound } from "next/navigation";
import { AuthorExhibition } from "@/components/author/AuthorExhibition";
import { getAuthorBySlug, getAuthorSlugs } from "@/lib/authors/loaders";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAuthorSlugs("international").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug("international", slug);
  if (!author) return { title: "Author" };
  return { title: author.name, description: author.bio.slice(0, 160) };
}

export default async function InternationalAuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug("international", slug);
  if (!author) notFound();
  return <AuthorExhibition author={author} />;
}
