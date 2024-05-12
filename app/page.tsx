import Amount from "@/sections/Amount";
import Hero from "@/sections/Hero";
import PeopleCount from "@/sections/PeopleCount";

export default function Home() {
  return (
    <div className="flex-col">
      <Hero />
      <PeopleCount />
      <Amount />
    </div>
  );
}
