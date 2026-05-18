import { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const currentYear = new Date().getFullYear();
const YOUTUBE_URL = "https://www.youtube.com/@officialcodewithsuraj";

const formatDate = ({ startYear, endYear, ongoing }) => {
  if (ongoing && currentYear >= startYear) {
    return `${startYear} - Present`;
  }

  if (endYear && endYear !== startYear) {
    return `${startYear} - ${endYear}`;
  }

  return `${startYear}`;
};

const fallbackExperiences = [
  {
    title: "Content Creator",
    company: "YouTube / Self",
    startYear: 2026,
    ongoing: true,
    link: YOUTUBE_URL,
    linkLabel: "Visit YouTube Channel",
    description:
      "Started creating YouTube content in 2026, sharing practical development concepts, backend workflows, and real-world coding lessons.",
  },
  {
    title: "Connect Ease",
    company: "Final Year Project",
    startYear: 2025,
    endYear: 2025,
    description:
      "Completed Connect Ease in 2025 as my last year project, building a full-stack web application with a responsive UI and deployed backend.",
  },
  {
    title: "Full Stack Project Development",
    company: "Self / Personal Projects",
    startYear: 2025,
    endYear: 2025,
    description:
      "Built MERN stack projects with focus on practical problem solving, clean frontend structure, and scalable backend APIs.",
  },
  {
    title: "Learning and Skill Development",
    company: "Self",
    startYear: 2023,
    endYear: 2024,
    description:
      "Focused on mastering JavaScript, React, Node.js, MongoDB, and building multiple practice projects to strengthen fundamentals.",
  },
];

const Experience = () => {
  const [experiences, setExperiences] = useState(fallbackExperiences);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const { data } = await api.get("/api/experiences");
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data);
        }
      } catch (error) {
        console.warn("Using fallback experiences:", error);
      }
    };

    loadExperiences();
  }, []);

  return (
    <section id="experience" className="bg-slate-50 px-6 py-24 text-slate-950 transition-colors dark:bg-[#060914] dark:text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase text-accent">
            Experience
          </p>
          <h2 className="text-4xl font-black tracking-normal md:text-5xl">
            A steady path from learning to shipping.
          </h2>
          <p className="mt-5 text-slate-500 dark:text-gray-400">
            Project work, academic builds, and content creation all feeding into
            stronger full stack judgment.
          </p>
        </div>

        <div className="relative mt-14 space-y-6">
          <div className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-linear-to-b from-primary/10 via-primary/45 to-accent/10 shadow-[0_0_24px_rgba(99,102,241,0.55)] dark:from-accent/10 dark:via-accent/50 dark:to-primary/10 md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id || exp.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07 }}
              className="relative grid gap-4 md:grid-cols-[2.75rem_12rem_1fr]"
            >
              <div className="relative hidden justify-center md:flex">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-white text-primary shadow-lg shadow-primary/20 dark:border-accent/30 dark:bg-[#0B0F19] dark:text-accent dark:shadow-accent/10">
                  <CalendarDays size={19} />
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/4.5 md:block">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-accent md:hidden">
                  <CalendarDays size={19} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    {formatDate(exp)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-gray-500">
                    {exp.company}
                  </p>
                </div>
              </div>

              <div className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/4.5 dark:shadow-none dark:hover:border-accent/40 dark:hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness size={20} className="text-primary" />
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    {exp.title}
                  </h3>
                </div>
                <p className="mt-3 leading-7 text-slate-500 dark:text-gray-400">
                  {exp.description}
                </p>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-500 transition hover:border-red-400/50 hover:bg-red-500/15 dark:text-red-300"
                  >
                    <FaYoutube size={17} />
                    {exp.linkLabel}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
