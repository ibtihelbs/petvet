"use client";

import { useState, type FormEvent } from "react";
import { trackLeadSubmitted } from "@/lib/gtag";
import type { SiteSettings } from "@/types/sanity";

type Status = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = [
  "Urgences et soins généraux",
  "Chirurgie avancée",
  "Hospitalisation",
  "Bien-être et soins",
  "Alimentation animalière",
  "Je ne sais pas encore",
];

export function ContactForm({ settings }: { settings: SiteSettings | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok)
        throw new Error("Une erreur s'est produite lors de l'envoi.");

      trackLeadSubmitted(String(data.serviceType || ""));
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-brand bg-marine text-almond p-8 text-center">
        <p className="font-headline text-xl mb-2">
          Merci — nous avons bien reçu votre demande.
        </p>
        <p className="text-sm opacity-90">
          Nous vous contacterons très prochainement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-ink mb-1"
          >
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-ink mb-1"
          >
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-ink mb-1"
          >
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ink mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="suburb"
          className="block text-sm font-medium text-ink mb-1"
        >
          Ville <span className="text-ink/40">(facultatif)</span>
        </label>
        <input
          id="suburb"
          name="suburb"
          className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
        />
      </div>

      <div>
        <label
          htmlFor="serviceType"
          className="block text-sm font-medium text-ink mb-1"
        >
          Quel service vous intéresse ?
        </label>
        <select
          id="serviceType"
          name="serviceType"
          className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
        >
          <option value="">Sélectionnez un service</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink mb-1"
        >
          Décrivez votre demande
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-brand border border-ink/20 px-4 py-3 bg-white focus-visible:outline-terracotta"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-brand bg-terracotta px-8 py-4 font-semibold text-marine hover:bg-terracotta-75 transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi…" : "Demander un rendez-vous"}
      </button>
    </form>
  );
}
