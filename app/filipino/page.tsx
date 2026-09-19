import { WingIntro } from "@/components/scenes/WingIntro";
import { AuthorIndex } from "@/components/author/AuthorIndex";
import { getAuthorsByWing } from "@/lib/authors/loaders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filipino Literature",
};

export default function FilipinoWingPage() {
  const authors = getAuthorsByWing("filipino");
  return (
    <>
      <WingIntro wing="filipino" />
      <AuthorIndex authors={authors} wing="filipino" />
    </>
  );
}
