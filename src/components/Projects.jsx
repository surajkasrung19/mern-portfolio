import { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { ArrowUpRight, MonitorUp, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const GITHUB_URL = "https://github.com/surajkasrung19";

const fallbackProjects = [
  {
    title: "Connect Ease",
    description:
      "A full-stack web application designed to Book verified professionals for plumbing, electrical, cleaning & more, with a clean UI and scalable backend architecture.",
    tech: ["React", "Node.js", "MongoDB"],
    featured: true,
    live: "http://connectease-frontend.vercel.app/",
    github: GITHUB_URL,
    image: "/connectease img.png",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get("/api/projects");
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.warn("Using fallback projects:", error);
      }
    };

    loadProjects();
  }, []);

  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="bg-white px-6 py-24 text-slate-950 transition-colors dark:bg-[#080C16] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-accent">
              Projects
            </p>
            <h2 className="max-w-2xl text-4xl font-black tracking-normal md:text-5xl">
              Selected builds with real product intent.
            </h2>
          </div>
          <p className="max-w-md text-slate-500 dark:text-gray-400">
            Each project is shaped around practical workflows, clean interfaces,
            and maintainable full stack architecture.
          </p>
        </div>

        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-12 grid overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-2xl shadow-slate-200/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20 md:grid-cols-[1fr_0.85fr]"
          >
            <div className="p-7 md:p-9">
              <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-amber-300/20 px-3 py-1.5 text-sm font-semibold text-amber-700 dark:bg-amber-300/10 dark:text-amber-200">
                <Star size={16} />
                Featured project
              </div>

              <h3 className="text-3xl font-black text-slate-950 dark:text-white">
                {featuredProject.title}
              </h3>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-gray-300">
                {featuredProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={featuredProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-primary dark:bg-white dark:text-dark dark:hover:bg-accent"
                >
                  Live Demo
                  <ArrowUpRight size={17} />
                </a>
                {featuredProject.github && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3 font-semibold text-slate-950 transition hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                  >
                    <FaGithub size={17} />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 bg-[linear-gradient(145deg,rgba(99,102,241,0.14),rgba(34,211,238,0.12),rgba(16,185,129,0.10))] p-7 dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(99,102,241,0.18),rgba(34,211,238,0.10),rgba(16,185,129,0.12))] md:border-l md:border-t-0">
              <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white/80 p-5 dark:border-white/10 dark:bg-[#090D18]/80">
                <img
                  src={featuredProject.image || "/connectease img.png"}
                  alt="Connect Ease website preview"
                  className="absolute inset-0 h-full w-full object-cover object-top opacity-100 transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-b from-white/55 via-white/15 to-white/80 dark:from-[#090D18]/62 dark:via-[#090D18]/20 dark:to-[#090D18]/82" />
                <div className="absolute inset-0 bg-linear-to-r from-white/50 via-transparent to-white/20 dark:from-[#090D18]/55 dark:via-transparent dark:to-[#090D18]/25" />

                <div className="relative z-10 flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/10">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300" />
                  </div>
                  <MonitorUp size={18} className="text-slate-400 dark:text-gray-500" />
                </div>

                <div className="relative z-10 my-6 rounded-lg border border-slate-200/80 bg-white/78 p-4 shadow-xl shadow-slate-900/5 backdrop-blur-md dark:border-white/10 dark:bg-[#090D18]/78 dark:shadow-black/25">
                  <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
                    Deployment status
                  </p>
                  <p className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                    Live and deployed
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-gray-400">
                    Built as a real-world full stack application that users can
                    open, explore, and interact with.
                  </p>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-3 text-center text-sm">
                  {["Frontend", "Backend", "Database"].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project._id || project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-lg dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-accent/40 dark:hover:bg-white/[0.07] dark:hover:shadow-none"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-accent">
                  <MonitorUp size={21} />
                </span>
                <span className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-white/5 dark:text-gray-400">
                  Case study
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-500 dark:text-gray-400">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4 text-sm font-semibold">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary transition hover:text-slate-950 dark:text-accent dark:hover:text-white"
                >
                  Live
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 transition hover:text-slate-950 dark:text-gray-300 dark:hover:text-white"
                >
                  Code
                  <FaGithub size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
