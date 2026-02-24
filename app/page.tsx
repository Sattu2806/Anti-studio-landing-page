"use client";

import { useEffect, useRef, useState } from "react";

function useInViewOnce(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [inView, options]);

  return { ref, inView };
}

type AnimatedCurvesProps = {
  variant?: "subtle" | "bold";
};

function AnimatedCurves({ variant = "subtle" }: AnimatedCurvesProps) {
  const opacity = variant === "bold" ? "opacity-40" : "opacity-25";

  return (
    <svg
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${opacity} mix-blend-screen`}
      viewBox="0 0 400 1000"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="curve-gradient-a"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#bef264" stopOpacity="0.04" />
          <stop offset="50%" stopColor="#bef264" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient
          id="curve-gradient-b"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#a3e635" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <g fill="none" strokeWidth="1">
        <path
          className="curves-line"
          stroke="url(#curve-gradient-a)"
          d="M80 -160 C 70 40, 70 280, 80 520 C 90 760, 90 920, 80 1120"
        />
        <path
          className="curves-line curves-line--slow"
          stroke="url(#curve-gradient-b)"
          d="M200 -140 C 190 60, 195 300, 205 540 C 215 780, 210 940, 205 1160"
        />
        <path
          className="curves-line curves-line--reverse"
          stroke="url(#curve-gradient-a)"
          d="M320 -120 C 315 80, 320 320, 330 560 C 340 800, 340 960, 335 1180"
        />
      </g>
    </svg>
  );
}

export default function Home() {
  const [showNav, setShowNav] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const {
    ref: featuresRef,
    inView: featuresInView,
  } = useInViewOnce({ threshold: 0.25 });
  const {
    ref: howItWorksRef,
    inView: howItWorksInView,
  } = useInViewOnce({ threshold: 0.25 });
  const {
    ref: metricsRef,
    inView: metricsInView,
  } = useInViewOnce({ threshold: 0.25 });
  const {
    ref: testimonialsRef,
    inView: testimonialsInView,
  } = useInViewOnce({ threshold: 0.25 });
  const {
    ref: socialProofRef,
    inView: socialProofInView,
  } = useInViewOnce({ threshold: 0.25 });
  const {
    ref: footerRef,
    inView: footerInView,
  } = useInViewOnce({ threshold: 0.1 });

  useEffect(() => {
    const navTimer = setTimeout(() => setShowNav(true), 1700);
    const contentTimer = setTimeout(() => setShowContent(true), 2400);

    return () => {
      clearTimeout(navTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#02040a] px-4 py-8 text-zinc-50">
      <div className="relative w-full max-w-7xl overflow-hidden rounded-3xl border border-lime-400/15 bg-gradient-to-b from-[#050711] via-[#050711] to-black shadow-[0_0_80px_rgba(190,242,100,0.4)]">
        {/* Background glow and subtle texture */}
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(190,242,100,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.24),_transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-10 top-28 bg-[radial-gradient(circle_at_center,_rgba(10,10,15,1)_0,_rgba(10,10,15,0)_60%)]" />
        </div>

        {/* Navbar (appears after semicircle sweep) */}
        <header
          className={`relative z-10 flex items-center justify-between px-7 pt-6 pb-4 transition-all duration-700 ${
            showNav ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lime-300 to-emerald-500 text-sm font-semibold text-black shadow-[0_0_22px_rgba(190,242,100,0.7)]">
              +
            </div>
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-zinc-300/80">
              Anti Studio
            </span>
          </div>

          <nav className="hidden items-center gap-8 rounded-full bg-black/40 px-6 py-2 text-xs text-zinc-300/90 ring-1 ring-white/5 md:flex">
            {["Features", "How it works", "Testimonials", "FAQs"].map(
              (item) => (
                <button
                  key={item}
                  className="relative cursor-pointer font-medium tracking-wide text-zinc-400 transition-colors hover:text-lime-300"
                >
                  {item}
                </button>
              ),
            )}
          </nav>

          <button className="ml-3 rounded-full border border-lime-400/70 px-5 py-2 text-xs font-semibold tracking-wide text-lime-300 shadow-[0_0_24px_rgba(190,242,100,0.6)] transition-colors hover:bg-lime-300 hover:text-black">
            Login
          </button>
        </header>

        {/* Hero semicircle + top content */}
        <main className="relative z-10 flex flex-col items-center gap-9 px-5 pb-12 pt-4 sm:px-10 md:px-16">
          <div className="mt-5 flex w-full justify-center">
            <div className="hero-circle">
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center transition-all duration-700 sm:gap-6 sm:px-8 ${
                  showContent
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-lime-200/80">
                  Innovative by design
                </p>
                <h1 className="max-w-xl text-balance text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl md:text-[2.8rem]">
                  Design work,{" "}
                  <span className="text-lime-300">the efficient way</span>
                </h1>
                <p className="max-w-md text-sm text-zinc-300/80 sm:text-[0.95rem]">
                  Smart design solutions for teams tired of the same old
                  aesthetics. Streamline your workflow and ship visuals that
                  feel fresh, focused, and on brand.
                </p>

                <div className="mt-1 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                  <div className="flex-1 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 text-left text-xs text-zinc-400 sm:text-sm">
                    johndoi@email.com
                  </div>
                  <button className="inline-flex items-center justify-center rounded-full bg-lime-300 px-7 py-2.5 text-xs font-semibold tracking-wide text-black shadow-[0_0_26px_rgba(190,242,100,0.65)] transition hover:bg-lime-200">
                    Get notified
                  </button>
                </div>

                <p className="text-[0.65rem] text-zinc-500">
                  No spam ever. Just a single email when we launch.
                </p>
              </div>
            </div>
          </div>

          {/* Logos / "already chosen" section (appears with content) */}
          <section
            className={`mt-3 flex w-full flex-col items-center gap-4 text-xs text-zinc-400/90 transition-all duration-700 ${
              showContent
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-zinc-500">
              Already chosen by the leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[0.75rem] sm:gap-8 sm:text-xs md:gap-12 md:text-sm">
              <span className="text-zinc-400/90">headspace</span>
              <span className="text-zinc-400/90">shopify</span>
              <span className="text-zinc-400/90">volvo</span>
              <span className="text-zinc-400/90">Mobbin</span>
              <span className="text-zinc-400/90">Pinterest</span>
              <span className="text-zinc-400/90">duolingo</span>
            </div>
          </section>
          {/* Divider */}
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-lime-300/25 to-transparent" />

          {/* Section 1 – Features */}
          <section
            ref={featuresRef}
            className={`relative mt-8 w-full space-y-6 overflow-hidden transition-all duration-700 ${
              featuresInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <AnimatedCurves />
            <div className="flex flex-col gap-2 text-left">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-lime-200/80">
                Why teams switch
              </p>
              <h2 className="max-w-xl text-balance text-xl font-semibold text-zinc-50 sm:text-2xl">
                Replace scattered tools with one focused workflow.
              </h2>
              <p className="max-w-lg text-xs text-zinc-400 sm:text-sm">
                Anti strips away the noise so your team can design, review, and
                ship in a single, calm surface.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Async-first reviews",
                  body: "Threaded comments and snapshots keep feedback focused, even across time zones.",
                },
                {
                  label: "System-aware layouts",
                  body: "Stay on-brand with tokens, grids, and motion baked into every frame.",
                },
                {
                  label: "Launch-ready exports",
                  body: "Hand-off specs that actually match production, no manual redlines.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl border border-lime-300/20 bg-gradient-to-b from-white/5 via-white/0 to-lime-300/5 px-4 py-5 text-left shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-60">
                    <div className="absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(190,242,100,0.5),_transparent_60%)]" />
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200/80">
                    {item.label}
                  </p>
                  <p className="text-xs text-zinc-300 sm:text-[0.8rem]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 – How it works */}
          <section
            ref={howItWorksRef}
            className={`relative mt-12 w-full overflow-hidden transition-all duration-700 ${
              howItWorksInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <AnimatedCurves />
            <div className="flex flex-col gap-3 text-left md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-lime-200/80">
                  How it works
                </p>
                <h2 className="mt-1 text-xl font-semibold text-zinc-50 sm:text-2xl">
                  A simple rhythm for complex work.
                </h2>
              </div>
              <p className="max-w-md text-xs text-zinc-400 sm:text-sm">
                Move from idea to shipped design in three focused loops, built
                around async collaboration.
              </p>
            </div>

            <ol className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "01. Capture",
                  text: "Import product context, constraints, and references into a single brief.",
                },
                {
                  title: "02. Explore",
                  text: "Branch safely, explore options, and track what resonates with stakeholders.",
                },
                {
                  title: "03. Commit",
                  text: "Lock in a direction, generate specs, and sync decisions with engineering.",
                },
              ].map((step, idx) => (
                <li
                  key={step.title}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/40 px-4 py-5 text-left ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/60 hover:bg-zinc-950/70"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_top_left,_rgba(190,242,100,0.4),_transparent_55%)] transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="relative z-10">
                    <div className="mb-3 inline-flex h-7 items-center rounded-full border border-lime-300/50 bg-black/60 px-3 text-[0.65rem] font-medium tracking-[0.18em] text-lime-200">
                      {step.title}
                    </div>
                    <p className="text-[0.8rem] text-zinc-300">{step.text}</p>
                  </div>
                  {idx < 2 && (
                    <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 text-xs text-lime-300/70 md:inline">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Section 3 – Metrics / signal */}
          <section
            ref={metricsRef}
            className={`relative mt-12 w-full overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/40 px-5 py-6 text-left shadow-[0_18px_50px_rgba(0,0,0,0.9)] transition-all duration-700 ${
              metricsInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <AnimatedCurves variant="bold" />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md space-y-2">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-lime-200/80">
                  A calmer pipeline
                </p>
                <h2 className="text-lg font-semibold text-zinc-50 sm:text-xl">
                  Less time in decks, more time in the work.
                </h2>
                <p className="text-xs text-zinc-300 sm:text-sm">
                  Anti becomes the live heartbeat of your design pipeline, so
                  everyone sees the same source of truth.
                </p>
              </div>

              <div className="grid w-full max-w-md gap-3 text-[0.8rem] sm:grid-cols-3">
                {[
                  { stat: "3x", label: "faster approvals" },
                  { stat: "-40%", label: "launch meeting time" },
                  { stat: "98%", label: "handoff accuracy" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-lime-300/30 bg-black/40 px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-lime-200/70 hover:bg-black/80 hover:shadow-[0_0_40px_rgba(190,242,100,0.35)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 translate-y-4 bg-gradient-to-t from-lime-300/40 via-lime-200/0 to-transparent opacity-0 blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-80" />
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-lime-200">
                        {item.stat}
                      </p>
                      <p className="mt-1 text-[0.7rem] text-zinc-400">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4 – Testimonials */}
          <section
            ref={testimonialsRef}
            className={`relative mt-12 w-full space-y-6 overflow-hidden transition-all duration-700 ${
              testimonialsInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <AnimatedCurves />
            <div className="text-left">
              <p className="text-[0.7rem] uppercase tracking-[0.35em] text-lime-200/80">
                Teams we build for
              </p>
              <h2 className="mt-1 text-xl font-semibold text-zinc-50 sm:text-2xl">
                Built with fast-moving product orgs in mind.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Elena, Head of Design",
                  company: "Consumer fintech",
                  quote:
                    "We replaced four tools with Anti and finally stopped screenshotting Figma.",
                },
                {
                  name: "Marcus, PM Lead",
                  company: "B2B SaaS",
                  quote:
                    "Stakeholders understand the work faster because everything is framed around outcomes.",
                },
                {
                  name: "Riya, Brand Director",
                  company: "Growth studio",
                  quote:
                    "Launch weeks feel less like a scramble and more like a playlist we can replay.",
                },
              ].map((item) => (
                <article
                  key={item.name}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/60 px-4 py-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-300/60 hover:bg-zinc-950/80"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0),_transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                    <div className="absolute inset-x-0 bottom-[-40%] h-40 bg-[radial-gradient(circle_at_center,_rgba(190,242,100,0.4),_transparent_60%)] blur-2xl" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[0.8rem] text-zinc-300">“{item.quote}”</p>
                    <p className="mt-3 text-[0.7rem] font-medium text-lime-200">
                      {item.name}
                    </p>
                    <p className="text-[0.65rem] text-zinc-500">
                      {item.company}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Section 5 – Social proof / CTA */}
          <section
            ref={socialProofRef}
            className={`relative mt-12 w-full overflow-hidden rounded-3xl border border-lime-300/15 bg-gradient-to-r from-lime-300/10 via-transparent to-emerald-300/10 px-5 py-6 text-left shadow-[0_22px_60px_rgba(0,0,0,0.8)] transition-all duration-700 ${
              socialProofInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <AnimatedCurves variant="bold" />
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl space-y-2">
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-lime-200/80">
                  Designed for modern teams
                </p>
                <h2 className="text-lg font-semibold text-zinc-50 sm:text-xl">
                  “Anti keeps our design work calm, even when launches are not.”
                </h2>
                <p className="text-xs text-zinc-300 sm:text-sm">
                  Built with fast-growing product teams in mind: fewer standing
                  meetings, more clarity, and a shared visual source of truth.
                </p>
                <p className="text-[0.7rem] font-medium text-zinc-400">
                  Trusted by product, marketing, and brand teams shipping weekly
                  releases.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="inline-flex items-center justify-center rounded-full bg-lime-300 px-7 py-2.5 text-xs font-semibold tracking-wide text-black shadow-[0_0_30px_rgba(190,242,100,0.7)] transition hover:bg-lime-200">
                  Join early access list
                </button>
                <span className="text-[0.7rem] text-zinc-400">
                  Limited spots for the first cohort of teams.
                </span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            ref={footerRef}
            className={`mt-10 flex w-full flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-[0.7rem] text-zinc-500 sm:flex-row sm:text-xs transition-all duration-700 ${
              footerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <span>© {new Date().getFullYear()} Anti Studio. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <button className="text-zinc-500 transition-colors hover:text-lime-200">
                Privacy
              </button>
              <button className="text-zinc-500 transition-colors hover:text-lime-200">
                Terms
              </button>
              <button className="text-zinc-500 transition-colors hover:text-lime-200">
                Status
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
