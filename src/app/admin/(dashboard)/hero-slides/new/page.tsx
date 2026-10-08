import HeroSlideForm from "../HeroSlideForm";
import { createHeroSlideAction } from "../actions";

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">New slide</h1>
      <div className="mt-6">
        <HeroSlideForm action={createHeroSlideAction} />
      </div>
    </div>
  );
}
