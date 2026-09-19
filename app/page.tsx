import { HomeJourney } from "@/components/scenes/HomeJourney";
import { getAllAuthors } from "@/lib/authors/loaders";

export default function HomePage() {
  return <HomeJourney authors={getAllAuthors()} />;
}
