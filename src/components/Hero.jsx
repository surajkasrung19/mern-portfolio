import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const GITHUB_URL = "https://github.com/surajkasrung19";
const YOUTUBE_URL = "https://www.youtube.com/@officialcodewithsuraj";
const introText =
  "I am Suraj, a full stack developer focused on practical products, thoughtful interfaces, and backend systems that are ready to grow.";

const stats = [
  { value: "3+", label: "MERN projects" },
  { value: "1", label: "Live products" },
  { value: "100%", label: "Build focused" },
];

const Hero = () => {
  const [typedText, setTypedText] = useState("");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let index = 0;
    const typingTimer = setInterval(() => {
      setTypedText(introText.slice(0, index + 1));
      index += 1;

      if (index === introText.length) {
        clearInterval(typingTimer);
      }
    }, 28);

    return () => clearInterval(typingTimer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-50 px-6 pt-32 text-slate-950 transition-colors dark:bg-[#060914] dark:text-white"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.16),transparent_34%,rgba(34,211,238,0.14)_72%,transparent)] dark:bg-[linear-gradient(120deg,rgba(99,102,241,0.18),transparent_34%,rgba(34,211,238,0.12)_72%,transparent)]" />
      <div className="hero-motion-gradient absolute inset-0 opacity-80" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 pb-24 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
            <Sparkles size={16} className="text-accent" />
            Actively Building Real-World MERN Applications
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-normal text-slate-950 dark:text-white md:text-7xl">
            Building clean, scalable web apps with{" "}
            <span className="bg-linear-to-r from-primary via-accent to-emerald-300 bg-clip-text text-transparent">
              MERN
            </span>
            .
          </h1>

          <p className="mt-6 min-h-24 max-w-2xl text-lg leading-8 text-slate-600 dark:text-gray-300 md:min-h-16">
            <span>{typedText}</span>
            <span className="typing-cursor ml-1 inline-block h-5 w-0.5 translate-y-1 bg-primary dark:bg-accent" />
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white shadow-xl shadow-primary/20 transition hover:bg-primary dark:bg-white dark:text-dark dark:hover:bg-accent"
            >
              View Projects
              <ArrowUpRight size={18} />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/80 px-6 py-3 font-semibold text-slate-950 shadow-sm transition hover:border-primary/40 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-accent/60 dark:hover:bg-white/10"
            >
              Contact Me
            </button>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
              >
                <p className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase text-slate-500 dark:text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto flex w-full max-w-[470px] justify-center md:justify-end"
        >
          <div className="absolute -left-8 top-16 hidden h-32 w-32 rounded-full border border-primary/25 md:block" />
          <div className="absolute -right-6 bottom-28 hidden h-24 w-24 rounded-lg border border-accent/25 rotate-12 md:block" />
          <div className="absolute inset-x-4 bottom-0 h-44 rounded-full bg-primary/25 blur-3xl dark:bg-accent/25" />
          <div className="absolute left-10 top-24 h-72 w-72 rounded-full bg-accent/15 blur-[80px] dark:bg-primary/20" />

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[460px] w-full max-w-[390px] md:h-[570px] md:max-w-[450px]"
          >
            <div className="absolute inset-4 rounded-full bg-linear-to-br from-primary/35 via-accent/20 to-emerald-300/25 blur-3xl" />
            <div className="absolute inset-14 rounded-full bg-white/70 blur-2xl dark:bg-white/10" />

            <div className="hero-portrait-frame absolute inset-0 overflow-hidden">
              <img
                src="/profile.jpeg"
                alt="Suraj profile"
                className="hero-profile-cutout h-full w-full scale-110 object-cover object-[50%_32%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_36%,rgba(248,250,252,0.74)_66%,rgba(248,250,252,1)_100%)] dark:bg-[radial-gradient(ellipse_at_50%_35%,transparent_36%,rgba(6,9,20,0.78)_68%,rgba(6,9,20,1)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/85 to-transparent dark:from-[#060914] dark:via-[#060914]/85" />
            </div>

            <div className="absolute bottom-12 left-0 flex gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white/85 text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:border-primary/40 hover:text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 dark:shadow-black/20 dark:hover:border-accent/50 dark:hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/surajkasrung/"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white/85 text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:border-primary/40 hover:text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 dark:shadow-black/20 dark:hover:border-accent/50 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white/85 text-slate-700 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:border-red-400/60 hover:text-red-500 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 dark:shadow-black/20 dark:hover:border-red-400/60 dark:hover:text-red-400"
                aria-label="YouTube"
              >
                <FaYoutube size={19} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase text-slate-500 transition hover:text-slate-950 dark:text-gray-500 dark:hover:text-white md:flex"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <span className="scroll-indicator grid h-10 w-7 place-items-center rounded-full border border-slate-300 bg-white/70 shadow-sm dark:border-white/15 dark:bg-white/5">
          <ChevronDown size={16} />
        </span>
      </motion.button>
    </section>
  );
};

export default Hero;
