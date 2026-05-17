import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme ? savedTheme === "dark" : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: "smooth" });
    }

    setActive(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const sections = [...navItems.map((item) => item.id), "contact"];
      const currentSection = sections.findLast((id) => {
        const section = document.getElementById(id);
        return section && section.offsetTop <= scrollPosition;
      });

      setScrolled(window.scrollY > 12);

      if (currentSection) {
        setActive(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 py-4 text-slate-950 transition-colors dark:text-white">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-lg border px-4 py-3 transition-all duration-300 md:px-5 ${
          scrolled
            ? "border-slate-200/80 bg-white/85 shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-white/15 dark:bg-[#0B0F19]/85"
            : "border-slate-200/70 bg-white/70 shadow-lg shadow-slate-200/40 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
        }`}
      >
        <button
          onClick={() => scrollToSection("home")}
          className="group flex items-center gap-3"
          aria-label="Go to home section"
        >
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg bg-white shadow-lg shadow-primary/25">
            <img
              src="/Logo Navbar.png"
              alt="Suraj logo"
              className="h-full w-full object-contain p-1"
            />
          </span>
          <span className="text-left">
            <span className="block text-base font-bold leading-none tracking-normal">
              Suraj.dev
            </span>
            <span className="mt-1 block text-xs font-medium text-slate-500 transition group-hover:text-primary dark:text-gray-400 dark:group-hover:text-accent">
              MERN Developer
            </span>
          </span>
        </button>

        <div className="hidden items-center rounded-full border border-slate-200 bg-slate-100/80 p-1 md:flex dark:border-white/10 dark:bg-black/20">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                active === item.id
                  ? "text-slate-950 dark:text-white"
                  : "text-slate-600 hover:text-slate-950 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              {active === item.id && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm shadow-slate-200 dark:bg-white/10 dark:shadow-inner dark:shadow-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary dark:bg-white dark:text-dark dark:hover:bg-accent md:flex"
          >
            Contact
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-primary/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:hover:border-accent/50 dark:hover:bg-white/15"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-100 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white/95 p-2 shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0F19]/95 md:hidden"
          >
            {[...navItems, { id: "contact", label: "Contact" }].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  active === item.id
                    ? "bg-primary/10 text-slate-950 dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`h-2 w-2 rounded-full ${
                    active === item.id ? "bg-accent" : "bg-slate-300 dark:bg-white/20"
                  }`}
                />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
