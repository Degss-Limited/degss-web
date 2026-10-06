"use client";

import { useEffect, useState } from "react";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import EmptyState from "@/components/admin/EmptyState";
import { CloseIcon } from "@/components/admin/icons";
import type { Faq } from "@/lib/data/faqs";
import FaqForm from "./FaqForm";

type ModalState = { mode: "new" } | { mode: "edit"; faq: Faq } | null;

export default function FaqManager({
  faqs,
  createAction,
  updateAction,
  deleteAction,
}: {
  faqs: Faq[];
  createAction: (formData: FormData) => void;
  updateAction: (id: string, formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
}) {
  const [modal, setModal] = useState<ModalState>(null);

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">FAQs</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Shown on the public /faqs page, in this order.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ mode: "new" })}
          className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          New FAQ
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {faqs.length === 0 && (
          <div className="rounded-2xl border border-black/10 bg-white">
            <EmptyState title="No FAQs yet" />
          </div>
        )}
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="rounded-2xl border border-black/10 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-neutral-950">{faq.question}</p>
                <p className="mt-1.5 text-sm text-neutral-600">{faq.answer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModal({ mode: "edit", faq })}
                  className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                >
                  Edit
                </button>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={faq.id} />
                  <ConfirmSubmitButton
                    confirmMessage="Delete this FAQ?"
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Delete
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-950">
                {modal.mode === "new" ? "New FAQ" : "Edit FAQ"}
              </h2>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
              >
                <CloseIcon className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="mt-5">
              <FaqForm
                faq={modal.mode === "edit" ? modal.faq : undefined}
                action={
                  modal.mode === "edit"
                    ? updateAction.bind(null, modal.faq.id)
                    : createAction
                }
                onCancel={() => setModal(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
