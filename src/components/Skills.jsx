import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const fallbackSkills = [
  { name: "React", category: "frontend", image: "/react img.png", level: "Advanced" },
  { name: "JavaScript", category: "frontend", image: "/js.png", level: "Advanced" },
  { name: "Tailwind CSS", category: "frontend", image: "/tailwind css.png", level: "Advanced" },
  { name: "Node.js", category: "backend", image: "/nodejs img.png", level: "Intermediate" },
  { name: "Express.js", category: "backend", image: "/Expressjs img.png", level: "Intermediate" },
  { name: "MongoDB", category: "database", image: "/mongoDB img.png", level: "Intermediate" },
  { name: "Git", category: "tools", image: "/github img.png", level: "Daily use" },
  { name: "Postman", category: "tools", image: "/postman img.png", level: "Daily use" },
];

const categories = ["all", "frontend", "backend", "database", "tools"];

const Skills = () => {
  const [active, setActive] = useState("all");
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const { data } = await axios.get("/api/skills");
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      } catch (error) {
        console.warn("Using fallback skills:", error);
      }
    };

    loadSkills();
  }, []);

  const filteredSkills =
    active === "all"
      ? skills
      : skills.filter((skill) => skill.category === active);

  return (
    <section id="skills" className="bg-slate-50 px-6 py-24 text-slate-950 transition-colors dark:bg-[#060914] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase text-accent">
            Skills
          </p>
          <h2 className="text-4xl font-black tracking-normal md:text-5xl">
            A focused stack for modern product development.
          </h2>
          <p className="mt-5 text-slate-500 dark:text-gray-400">
            Tools I use to design, build, test, and deploy full stack web
            applications with confidence.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold capitalize transition ${
                active === cat
                  ? "border-primary/40 bg-primary/10 text-slate-950 dark:border-accent/50 dark:bg-accent/15 dark:text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSkills.map(({ name, category, image, level }, index) => (
            <motion.div
              layout
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.04 }}
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.045] dark:shadow-none dark:hover:border-accent/40 dark:hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10 p-2 transition group-hover:bg-white dark:bg-white/10 dark:group-hover:bg-white">
                  <img
                    src={image}
                    alt={`${name} logo`}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-500 dark:bg-white/5 dark:text-gray-400">
                  {category}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-950 dark:text-white">{name}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">{level}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
