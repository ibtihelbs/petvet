"use client";

import { useState } from "react";
import Image from "next/image";
import { projectImageFallback } from "@/lib/imageFallback";
import { urlFor } from "@/sanity/image";
import type { Project, SiteSettings } from "@/types/sanity";

function BeforeAfterCard({
  project,
  viewLabel,
  quoteLabel,
}: {
  project: Project;
  viewLabel: string;
  quoteLabel: string;
}) {
  const [position, setPosition] = useState(50);

  const beforeUrl =
    urlFor(project.beforeImage?.asset)?.width(700).height(500).url() ||
    projectImageFallback[project.slug?.current] ||
    null;
  const afterUrl =
    urlFor(project.afterImage?.asset)?.width(700).height(500).url() ||
    projectImageFallback[project.slug?.current] ||
    null;

  return (
    <div className="rounded-brand bg-white overflow-hidden shadow-sm">
      <div className="relative aspect-[4/3] select-none">
        {afterUrl && (
          <Image
            src={afterUrl}
            alt={project.afterImage?.alt || `${project.title} — after`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        )}
        {beforeUrl && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={beforeUrl}
              alt={project.beforeImage?.alt || `${project.title} — before`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          </div>
        )}

        <span className="absolute top-3 left-3 bg-marine/80 text-almond text-xs font-semibold px-2 py-1 rounded">
          Before
        </span>
        <span className="absolute top-3 right-3 bg-terracotta/90 text-marine text-xs font-semibold px-2 py-1 rounded">
          After
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Compare before and after photos for ${project.title}`}
          className="absolute inset-x-4 bottom-3 w-[calc(100%-2rem)] accent-terracotta"
        />
      </div>

      <div className="p-5">
        <h3 className="font-headline text-lg text-marine mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-ink/50 uppercase tracking-wide mb-3">
          {project.suburb}
        </p>
        <p className="text-sm text-ink/70 mb-1">
          <strong className="text-ink">Before:</strong>{" "}
          {project.beforeDescription}
        </p>
        <p className="text-sm text-ink/70 mb-4">
          <strong className="text-ink">After:</strong>{" "}
          {project.afterDescription}
        </p>
        <div className="flex gap-3">
          <a
            href="#projects"
            className="text-sm font-semibold text-marine border-2 border-marine rounded-brand px-4 py-2 hover:bg-marine hover:text-almond transition-colors"
          >
            {viewLabel}
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold text-marine bg-terracotta rounded-brand px-4 py-2 hover:bg-terracotta-75 transition-colors"
          >
            {quoteLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Projects({
  projects,
  settings,
}: {
  projects: Project[];
  settings: SiteSettings | null;
}) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
    >
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="uppercase leading-none tracking-tight text-[clamp(30px,8vw,48px)] text-marine mb-4">
          {settings?.projectsHeading || "Our Featured Transformations"}
        </h2>
        {settings?.projectsIntro && (
          <p className="text-ink/70">{settings.projectsIntro}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <BeforeAfterCard
            key={project._id}
            project={project}
            viewLabel={settings?.projectCardViewLabel || "View Project"}
            quoteLabel={settings?.projectCardQuoteLabel || "Get A Quote"}
          />
        ))}
      </div>
    </section>
  );
}
