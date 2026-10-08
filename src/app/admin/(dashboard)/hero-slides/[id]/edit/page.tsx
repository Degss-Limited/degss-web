import { notFound } from "next/navigation";
import HeroSlideForm from "../../HeroSlideForm";
import { updateHeroSlideAction } from "../../actions";
import { getHeroSlideById } from "@/lib/data/heroSlides";

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await getHeroSlideById(id);

  if (!slide) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit slide</h1>
      <div className="mt-6">
        <HeroSlideForm slide={slide} action={updateHeroSlideAction.bind(null, slide.id)} />
      </div>
    </div>
  );
}
