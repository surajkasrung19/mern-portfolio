import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const GITHUB_URL = "https://github.com/surajkasrung19";
const YOUTUBE_URL = "https://www.youtube.com/@officialcodewithsuraj";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 py-8 text-slate-500 transition-colors dark:border-white/10 dark:bg-[#050812] dark:text-gray-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <button
          onClick={() =>
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex items-center gap-3 text-left"
        >
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-linear-to-br from-primary to-accent font-black text-white">
            S
          </span>
          <span>
            <span className="block font-bold text-slate-950 dark:text-white">Suraj.dev</span>
            <span className="text-sm text-slate-500 dark:text-gray-500">
              Full stack portfolio
            </span>
          </span>
        </button>

        <p className="text-sm">
          Copyright {new Date().getFullYear()} Suraj. Built with React and Tailwind.
        </p>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-primary/40 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-accent/40 dark:hover:text-white"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/surajkasrung/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-primary/40 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-accent/40 dark:hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-red-400/60 hover:text-red-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-red-400/60 dark:hover:text-red-400"
            aria-label="YouTube"
          >
            <FaYoutube size={19} />
          </a>

          <button
            onClick={() =>
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
            }
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-primary/40 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-accent/40 dark:hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
