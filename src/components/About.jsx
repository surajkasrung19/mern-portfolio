import { motion } from "framer-motion";
import { BadgeCheck, Code2, Layers3, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean & Maintainable Code",
    text: "Readable React components, reusable patterns, and APIs built with clarity.",
  },
  {
    icon: Layers3,
    title: "Full Stack Architecture",
    text: "Frontend polish and backend structure planned together from the start.",
  },
  {
    icon: Rocket,
    title: "Product-Focused Development",
    text: "Focused on useful features, deployed projects, and real user workflows.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="bg-white px-6 py-24 text-slate-950 transition-colors dark:bg-[#080C16] dark:text-white"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-2xl shadow-slate-200/70 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-black/20"
        >
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0C1220]">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-lg border border-white/70 bg-linear-to-br from-primary to-accent p-0.5 shadow-lg shadow-primary/20 dark:border-white/10">
                <img
                  src="/profile.jpeg"
                  alt="Suraj profile"
                  className="h-full w-full rounded-md object-cover object-[50%_28%]"
                />
              </div>
              <div>
                <p className="text-xl font-bold">Suraj</p>
                <p className="text-sm text-slate-500 dark:text-gray-400">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                "MERN Stack Developer",
                "Building and deploying real-world products like Connect Ease",
                "Focused on scalable architecture and production-ready code",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300"
                >
                  <BadgeCheck size={18} className="text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase text-accent">
            About Me
          </p>
          <h2 className="text-4xl font-black tracking-normal text-slate-950 dark:text-white md:text-5xl">
            I design and build scalable web applications with a strong focus on
            real-world impact.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-gray-300">
            I’m a full stack developer focused on building real-world web
            applications that solve meaningful problems. Currently, I’m
            developing a Fitness Tracker App using the MERN stack, with a strong
            focus on clean architecture, scalable backend systems, and
            production-ready deployments.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/40 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-accent/40 dark:hover:bg-white/[0.07]"
              >
                <Icon size={22} className="text-accent" />
                <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-gray-400">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/Resume.pdf"
            download="Suraj-Resume.pdf"
            className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
