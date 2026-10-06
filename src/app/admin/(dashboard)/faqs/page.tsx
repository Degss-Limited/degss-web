import { listFaqs } from "@/lib/data/faqs";
import { createFaqAction, deleteFaqAction, updateFaqAction } from "./actions";
import FaqManager from "./FaqManager";

export default async function AdminFaqsPage() {
  const faqs = await listFaqs();

  return (
    <FaqManager
      faqs={faqs}
      createAction={createFaqAction}
      updateAction={updateFaqAction}
      deleteAction={deleteFaqAction}
    />
  );
}
