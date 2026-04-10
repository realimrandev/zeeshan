import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

import zeeshanImg from "@/assets/zeeshan.jpg";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";

interface HomeProps {
  targetSection?: string;
}

const PROFILE = {
  name: "Zeeshan Mazher",
  title: "Microsoft Office Specialist",
  tagline:
    "Microsoft Word, Excel & PowerPoint expert with 5+ years of hands-on experience.",
  location: "Lahore, Punjab, Pakistan",
  phone: "+92 317 7230289",
  email: "zeeshanmazherulhaq@gmail.com",
};

function cnJoin(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function SectionHeader({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6 max-md:flex-col max-md:items-start">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{kicker}</span>
        </div>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  // NOTE: Wouter hash routing wants /section (not #section)
  return (
    <a
      href={`./#/${href}`}
      className="rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </a>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [submitting, setSubmitting] = useState(false);

  // Scroll to target section when URL changes (e.g., /#/contact → scroll to #contact)
  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  const skills = useMemo(
    () => [
      { name: "Microsoft Word", level: "Expert" },
      { name: "Microsoft Excel", level: "Expert" },
      { name: "Microsoft PowerPoint", level: "Expert" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { value: "5+", label: "Years experience" },
      { value: "Office", label: "Word • Excel • PPT" },
      { value: "Fast", label: "Quick delivery" },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "What type of work do you do?",
        a: "I help clients with Microsoft Word formatting, Excel spreadsheets, and PowerPoint presentations — with clean structure and professional polish.",
      },
      {
        q: "Do you work remotely?",
        a: "Yes. I can work with clients in Lahore and remotely with clients anywhere.",
      },
      {
        q: "How can I contact you?",
        a: `Email me at ${PROFILE.email} or call/WhatsApp at ${PROFILE.phone}.`,
      },
    ],
    []
  );

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      message: String(form.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    const t = toast.loading("Sending message...");
    try {
      // Backend will be added in /server. For local dev:
      // - start backend on http://localhost:5050
      // - set VITE_API_BASE=http://localhost:5050
      const base = import.meta.env.VITE_API_BASE || "";
      await axios.post(`${base}/api/contact`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Message sent!", { id: t });
      e.currentTarget.reset();
    } catch (err) {
      toast.error("Could not send. Please try again.", { id: t });
    } finally {
      setSubmitting(false);
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Grain + accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[oklch(0.86_0.23_145_/_0.16)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22240%22 height=%22240%22 filter=%22url(%23n)%22 opacity=%220.55%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-border bg-card shadow-sm" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">{PROFILE.name}</div>
              <div className="text-xs text-muted-foreground">{PROFILE.title}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink href="about" label="About" />
            <NavLink href="skills" label="Skills" />
            <NavLink href="experience" label="Experience" />
            <NavLink href="contact" label="Contact" />
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden md:inline-flex"
              onClick={() => copy(PROFILE.email)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Copy Email
            </Button>
            <Button
              className="bg-primary text-primary-foreground shadow-sm hover:translate-y-[-1px] hover:shadow-md"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Hire Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative">
          <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-14 md:px-6 md:py-20">
            <motion.div
              className="col-span-12 md:col-span-7"
              initial={prefersReducedMotion ? undefined : "hidden"}
              animate={prefersReducedMotion ? undefined : "show"}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2">
                <Badge className="bg-[oklch(0.86_0.23_145)] text-[oklch(0.14_0.03_255)] hover:bg-[oklch(0.86_0.23_145)]">
                  Available for work
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Lahore-based • Remote-friendly
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
              >
                I build <span className="underline decoration-[oklch(0.86_0.23_145)] decoration-[6px] underline-offset-8">clean</span>,
                professional Office documents that people love to open.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
              >
                {PROFILE.tagline}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Button
                  className="bg-primary text-primary-foreground shadow-sm hover:translate-y-[-1px] hover:shadow-md"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Let’s work together
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => copy(PROFILE.phone)}
                  className="hover:translate-y-[-1px]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Copy Phone
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => toast.message("CV download can be added later.")}
                  className="hover:translate-y-[-1px]"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid grid-cols-3 gap-3 max-sm:grid-cols-1"
              >
                {stats.map((s) => (
                  <Card
                    key={s.label}
                    className="rounded-2xl border-border bg-card/80 p-4 shadow-sm"
                  >
                    <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </Card>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="col-span-12 md:col-span-5"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 22 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rounded-[2rem] border border-border bg-[oklch(0.86_0.23_145_/_0.18)] blur-xl" />
                <Card className="relative overflow-hidden rounded-[2rem] border-border bg-card shadow-sm">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={zeeshanImg}
                      alt="Zeeshan Mazher"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-[oklch(0.86_0.23_145)]" />
                      <div className="text-sm font-semibold">Ready to help</div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Word formatting • Excel sheets • PowerPoint decks
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary">Word</Badge>
                      <Badge variant="secondary">Excel</Badge>
                      <Badge variant="secondary">PowerPoint</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Marquee-ish strip */}
          <div className="border-y border-border bg-card/60">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 text-sm text-muted-foreground md:px-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {PROFILE.location}
              </div>
              <div className="hidden md:block">
                Clean files • Clear structure • On-time delivery
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <button
                  onClick={() => copy(PROFILE.email)}
                  className="underline decoration-border underline-offset-4 hover:text-foreground"
                >
                  {PROFILE.email}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <SectionHeader
              kicker="About"
              title="Professional, detail-first work"
              desc="I focus on clear formatting, consistent styling, and clean delivery — so your documents look trustworthy and polished." 
            />

            <div className="mt-10 grid grid-cols-12 gap-6">
              <Card className="col-span-12 rounded-3xl border-border bg-card/80 p-6 shadow-sm md:col-span-7">
                <h3 className="text-xl font-semibold tracking-tight">What you can expect</h3>
                <p className="mt-3 text-muted-foreground">
                  Whether it’s a resume, report, spreadsheet, or presentation, I’ll make it
                  easy to read, consistent, and ready to share.
                </p>
                <Separator className="my-5" />
                <ul className="grid gap-3 text-sm">
                  {[
                    "Clean formatting and alignment",
                    "Strong visual hierarchy (headings, spacing, structure)",
                    "Professional file delivery (PDF/Word/Excel/PPT)",
                    "Fast, responsive communication",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[oklch(0.86_0.23_145)]" />
                      <span className="text-foreground/85">{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="col-span-12 rounded-3xl border-border bg-card/80 p-6 shadow-sm md:col-span-5">
                <h3 className="text-xl font-semibold tracking-tight">Quick info</h3>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{PROFILE.name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">Lahore</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">5 Years</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => copy(PROFILE.phone)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                  <Button variant="outline" onClick={() => copy(PROFILE.email)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-24 border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <SectionHeader
              kicker="Skills"
              title="Tools I work with daily"
              desc="Focused expertise in Microsoft Office — delivered with clarity, structure, and speed." 
            />

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {skills.map((s) => (
                <Card
                  key={s.name}
                  className={cnJoin(
                    "group rounded-3xl border-border bg-card/80 p-6 shadow-sm transition",
                    "hover:-translate-y-1 hover:shadow-md"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{s.name}</h3>
                    <Badge className="bg-[oklch(0.86_0.23_145)] text-[oklch(0.14_0.03_255)]">
                      {s.level}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Clean formatting, consistent styling, and professional delivery.
                  </p>
                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[92%] rounded-full bg-[oklch(0.86_0.23_145)]" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <SectionHeader
              kicker="Experience"
              title="5 years of real delivery"
              desc="A track record of handling documents, spreadsheets, and presentations with attention to detail." 
            />

            <div className="mt-10 grid grid-cols-12 gap-6">
              <Card className="col-span-12 rounded-3xl border-border bg-card/80 p-6 shadow-sm md:col-span-7">
                <h3 className="text-xl font-semibold tracking-tight">Highlights</h3>
                <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  {[
                    "Professional document formatting (reports, resumes, proposals)",
                    "Excel sheets for tracking, calculations, and clean tables",
                    "PowerPoint decks with clear layouts and strong visual hierarchy",
                    "Revision-friendly delivery and quick turnaround",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[oklch(0.86_0.23_145)]" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="col-span-12 rounded-3xl border-border bg-card/80 p-6 shadow-sm md:col-span-5">
                <h3 className="text-xl font-semibold tracking-tight">FAQ</h3>
                <Accordion type="single" collapsible className="mt-4">
                  {faqs.map((f, idx) => (
                    <AccordionItem value={`i-${idx}`} key={f.q}>
                      <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-border bg-secondary/30"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
            <SectionHeader
              kicker="Contact"
              title="Send a message"
              desc="Tell me what you need. I usually respond quickly." 
            />

            <div className="mt-10 grid grid-cols-12 gap-6">
              <Card className="col-span-12 rounded-3xl border-border bg-card/80 p-6 shadow-sm md:col-span-7">
                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="name">
                        Your Name
                      </label>
                      <Input id="name" name="name" placeholder="Enter your name" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="What do you want to build?"
                      className="min-h-[130px]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm text-muted-foreground">
                      Or email directly: <span className="font-medium">{PROFILE.email}</span>
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-primary text-primary-foreground"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Card>

              <Card className="col-span-12 rounded-3xl border-border bg-card/80 p-6 shadow-sm md:col-span-5">
                <h3 className="text-xl font-semibold tracking-tight">Direct contact</h3>
                <div className="mt-4 grid gap-3 text-sm">
                  <button
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                    onClick={() => copy(PROFILE.phone)}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {PROFILE.phone}
                    </span>
                    <span className="text-muted-foreground">Copy</span>
                  </button>

                  <button
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
                    onClick={() => copy(PROFILE.email)}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {PROFILE.email}
                    </span>
                    <span className="text-muted-foreground">Copy</span>
                  </button>

                  <div className="rounded-2xl border border-border bg-card px-4 py-3">
                    <div className="flex items-center gap-2 font-medium">
                      <MapPin className="h-4 w-4" />
                      {PROFILE.location}
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Available for remote work and on-site opportunities in Lahore.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 text-sm md:flex-row md:items-center md:px-6">
          <div>
            <div className="font-medium">{PROFILE.name}</div>
            <div className="text-muted-foreground">{PROFILE.title}</div>
          </div>
          <div className="text-muted-foreground">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
