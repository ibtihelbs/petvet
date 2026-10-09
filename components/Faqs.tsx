"use client";

import { useState } from "react";
import type { Faq } from "@/types/sanity";

function faqText(faq: Faq): string {
  return (
    faq.answer
      ?.map((block) => block.children?.map((c) => c.text).join(""))
      .join(" ") ?? ""
  );
}

export function Faqs({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section
      id="faqs"
      className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-10 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq._id;
          return (
            <div
              key={faq._id}
              className="rounded-brand bg-white shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq._id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-marine">
                  {faq.question}
                </span>
                <span className="text-terracotta text-xl shrink-0">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-sm text-ink/70 leading-relaxed">
                  {faqText(faq)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
