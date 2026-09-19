import { WingIntro } from "@/components/scenes/WingIntro";
import { AuthorIndex } from "@/components/author/AuthorIndex";
import { getAuthorsByWing } from "@/lib/authors/loaders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World Literature",
};

export default function InternationalWingPage() {
  const authors = getAuthorsByWing("international");
  return (
    <>
      <WingIntro wing="international" />
      <AuthorIndex authors={authors} wing="international" />
    </>
  );
}
