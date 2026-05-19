import { useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const GITHUB_URL = "https://github.com/surajkasrung19";
const YOUTUBE_URL = "https://www.youtube.com/@officialcodewithsuraj";
const CONTACT_EMAIL = "surajkasrung1904@gmail.com";

const contactLinks = [
  { label: "Email", value: CONTACT_EMAIL, icon: Mail, href: `mailto:${CONTACT_EMAIL}` },
  { label: "LinkedIn", value: "Connect professionally", icon: FaLinkedin, href: "https://www.linkedin.com/in/surajkasrung/" },
  { label: "YouTube", value: "Watch Code With Suraj", icon: FaYoutube, href: YOUTUBE_URL },
  { label: "GitHub", value: "View repositories", icon: FaGithub, href: GITHUB_URL },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      await api.post("/api/contact", form);
      setSubmitted(true);
      setStatus({
        type: "success",
        message: "Message sent successfully. I will get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      const serverMessage =
        error.response?.data?.error ||
        (error.code === "ERR_NETWORK"
          ? "Contact server is not running. Start the backend with npm run server or use npm run dev:full."
          : "");

      setStatus({
        type: "error",
        message:
          serverMessage ||
          "Message could not be sent right now. Please email me directly.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="bg-white px-6 py-24 text-slate-950 transition-colors dark:bg-[#080C16] dark:text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase text-accent">
            Contact
          </p>
          <h2 className="text-4xl font-black tracking-normal md:text-5xl">
            Let us build something useful together.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-gray-300">
            I am open to opportunities, collaborations, and conversations about
            practical web products.
          </p>

          <div className="mt-8 space-y-3">
            {contactLinks.map(({ label, value, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 transition hover:border-primary/40 hover:bg-white hover:shadow-sm dark:border-white/10 dark:bg-white/4.5 dark:hover:border-accent/40 dark:hover:bg-white/[0.07]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block font-semibold text-slate-950 dark:text-white">{label}</span>
                  <span className="mt-1 block text-sm text-slate-500 dark:text-gray-400">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-2xl shadow-slate-200/70 dark:border-white/10 dark:bg-white/4.5 dark:shadow-black/20"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-accent">
              <MessageSquare size={21} />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Start a conversation</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">Send a quick note below.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">
                Name
              </span>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary dark:border-white/10 dark:bg-[#0B0F19] dark:text-white dark:placeholder:text-gray-600 dark:focus:border-accent"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">
                Email
              </span>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary dark:border-white/10 dark:bg-[#0B0F19] dark:text-white dark:placeholder:text-gray-600 dark:focus:border-accent"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-semibold text-slate-600 dark:text-gray-300">
              Message
            </span>
            <textarea
              name="message"
              placeholder="Tell me about your idea..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-primary dark:border-white/10 dark:bg-[#0B0F19] dark:text-white dark:placeholder:text-gray-600 dark:focus:border-accent"
            />
          </label>

          <button
            type="submit"
            disabled={isSending}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-primary dark:bg-white dark:text-dark dark:hover:bg-accent"
          >
            {isSending ? "Sending..." : "Send Message"}
            <Send size={17} />
          </button>

          {status.message && (
            <p
              className={`mt-4 rounded-lg border px-4 py-3 text-sm font-medium ${
                status.type === "success" || submitted
                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-500 dark:text-emerald-300"
                  : "border-rose-400/20 bg-rose-400/10 text-rose-500 dark:text-rose-300"
              }`}
            >
              {status.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
