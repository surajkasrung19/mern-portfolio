import { useEffect, useState } from "react";
import axios from "axios";
import { Edit3, LogOut, Plus, Trash2 } from "lucide-react";

const emptyProject = {
  title: "",
  description: "",
  tech: "",
  featured: false,
  live: "",
  github: "",
  image: "",
};

const emptySkill = {
  name: "",
  category: "",
  image: "",
  level: "",
};

const emptyExperience = {
  title: "",
  company: "",
  startYear: "",
  endYear: "",
  ongoing: false,
  description: "",
  link: "",
  linkLabel: "",
};

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem("portfolio-admin-token") || "");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [experienceForm, setExperienceForm] = useState(emptyExperience);
  const [editingId, setEditingId] = useState("");
  const [editingSkillId, setEditingSkillId] = useState("");
  const [editingExperienceId, setEditingExperienceId] = useState("");
  const [status, setStatus] = useState("");

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const loadAdminData = async () => {
    if (!token) return;

    try {
      const [projectResponse, skillResponse, experienceResponse, contactResponse] =
        await Promise.all([
        axios.get("/api/admin/projects", authHeaders),
        axios.get("/api/admin/skills", authHeaders),
        axios.get("/api/admin/experiences", authHeaders),
        axios.get("/api/admin/contacts", authHeaders),
      ]);

      setProjects(projectResponse.data);
      setSkills(skillResponse.data);
      setExperiences(experienceResponse.data);
      setContacts(contactResponse.data);
    } catch (error) {
      setStatus(error.response?.data?.error || "Unable to load admin data.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAdminData();
    }, 0);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const { data } = await axios.post("/api/admin/login", login);
      localStorage.setItem("portfolio-admin-token", data.token);
      setToken(data.token);
      setLogin({ username: "", password: "" });
    } catch (error) {
      setStatus(error.response?.data?.error || "Login failed.");
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const payload = {
      ...projectForm,
      tech: projectForm.tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await axios.put(`/api/admin/projects/${editingId}`, payload, authHeaders);
        setStatus("Project updated.");
      } else {
        await axios.post("/api/admin/projects", payload, authHeaders);
        setStatus("Project added.");
      }

      setProjectForm(emptyProject);
      setEditingId("");
      loadAdminData();
    } catch (error) {
      setStatus(error.response?.data?.error || "Project save failed.");
    }
  };

  const editProject = (project) => {
    setEditingId(project._id);
    setProjectForm({
      title: project.title || "",
      description: project.description || "",
      tech: project.tech?.join(", ") || "",
      featured: Boolean(project.featured),
      live: project.live || "",
      github: project.github || "",
      image: project.image || "",
    });
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await axios.delete(`/api/admin/projects/${id}`, authHeaders);
    loadAdminData();
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      if (editingSkillId) {
        await axios.put(`/api/admin/skills/${editingSkillId}`, skillForm, authHeaders);
        setStatus("Skill updated.");
      } else {
        await axios.post("/api/admin/skills", skillForm, authHeaders);
        setStatus("Skill added.");
      }

      setSkillForm(emptySkill);
      setEditingSkillId("");
      loadAdminData();
    } catch (error) {
      setStatus(error.response?.data?.error || "Skill save failed.");
    }
  };

  const editSkill = (skill) => {
    setEditingSkillId(skill._id);
    setSkillForm({
      name: skill.name || "",
      category: skill.category || "",
      image: skill.image || "",
      level: skill.level || "",
    });
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    await axios.delete(`/api/admin/skills/${id}`, authHeaders);
    loadAdminData();
  };

  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      if (editingExperienceId) {
        await axios.put(
          `/api/admin/experiences/${editingExperienceId}`,
          experienceForm,
          authHeaders
        );
        setStatus("Experience updated.");
      } else {
        await axios.post("/api/admin/experiences", experienceForm, authHeaders);
        setStatus("Experience added.");
      }

      setExperienceForm(emptyExperience);
      setEditingExperienceId("");
      loadAdminData();
    } catch (error) {
      setStatus(error.response?.data?.error || "Experience save failed.");
    }
  };

  const editExperience = (experience) => {
    setEditingExperienceId(experience._id);
    setExperienceForm({
      title: experience.title || "",
      company: experience.company || "",
      startYear: experience.startYear || "",
      endYear: experience.endYear || "",
      ongoing: Boolean(experience.ongoing),
      description: experience.description || "",
      link: experience.link || "",
      linkLabel: experience.linkLabel || "",
    });
  };

  const deleteExperience = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    await axios.delete(`/api/admin/experiences/${id}`, authHeaders);
    loadAdminData();
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact message?")) return;

    await axios.delete(`/api/admin/contacts/${id}`, authHeaders);
    loadAdminData();
  };

  const logout = () => {
    localStorage.removeItem("portfolio-admin-token");
    setToken("");
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl"
        >
          <h1 className="text-3xl font-black">Portfolio Admin</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage projects and contact messages.
          </p>

          <input
            type="text"
            placeholder="Username"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            className="mt-6 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-accent"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="mt-3 w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-accent"
            required
          />

          <button className="mt-5 w-full rounded-lg bg-white px-4 py-3 font-semibold text-slate-950 transition hover:bg-accent">
            Login
          </button>

          {status && <p className="mt-4 text-sm text-rose-300">{status}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Admin</p>
            <h1 className="text-4xl font-black">Portfolio Control Panel</h1>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        {status && (
          <p className="mt-6 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
            {status}
          </p>
        )}

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form
            onSubmit={handleProjectSubmit}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Project" : "Add Project"}
            </h2>

            <div className="mt-5 space-y-3">
              {[
                ["title", "Project title"],
                ["live", "Live URL"],
                ["github", "GitHub URL"],
                ["image", "Image path, e.g. /connectease img.png"],
              ].map(([field, placeholder]) => (
                <input
                  key={field}
                  type="text"
                  placeholder={placeholder}
                  value={projectForm[field]}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, [field]: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                />
              ))}

              <input
                type="text"
                placeholder="Tech stack, comma separated"
                value={projectForm.tech}
                onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-primary"
              />

              <textarea
                placeholder="Project description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, description: e.target.value })
                }
                className="h-28 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                required
              />

              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={projectForm.featured}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, featured: e.target.checked })
                  }
                />
                Featured project
              </label>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white">
                <Plus size={17} />
                {editingId ? "Update" : "Add"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId("");
                    setProjectForm(emptyProject);
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-3 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Projects</h2>
            <div className="mt-5 space-y-3">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-bold">{project.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{project.description}</p>
                      <p className="mt-2 text-xs font-semibold text-primary">
                        {project.tech?.join(", ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editProject(project)}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-700"
                        aria-label="Edit project"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/10 text-rose-600"
                        aria-label="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form
            onSubmit={handleSkillSubmit}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {editingSkillId ? "Edit Skill" : "Add Skill"}
            </h2>
            <div className="mt-5 space-y-3">
              {[
                ["name", "Skill name"],
                ["category", "Category, e.g. frontend"],
                ["level", "Level, e.g. Advanced"],
                ["image", "Image path, e.g. /react img.png"],
              ].map(([field, placeholder]) => (
                <input
                  key={field}
                  type="text"
                  placeholder={placeholder}
                  value={skillForm[field]}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, [field]: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  required={field === "name" || field === "category"}
                />
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white">
                <Plus size={17} />
                {editingSkillId ? "Update" : "Add"}
              </button>
              {editingSkillId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingSkillId("");
                    setSkillForm(emptySkill);
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-3 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Skills</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    {skill.image && (
                      <img
                        src={skill.image}
                        alt=""
                        className="h-10 w-10 rounded-lg object-contain"
                      />
                    )}
                    <div>
                      <h3 className="font-bold">{skill.name}</h3>
                      <p className="text-xs text-slate-500">
                        {skill.category} - {skill.level}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editSkill(skill)}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-700"
                      aria-label="Edit skill"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/10 text-rose-600"
                      aria-label="Delete skill"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <form
            onSubmit={handleExperienceSubmit}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {editingExperienceId ? "Edit Experience" : "Add Experience"}
            </h2>
            <div className="mt-5 space-y-3">
              {[
                ["title", "Title"],
                ["company", "Company / source"],
                ["startYear", "Start year"],
                ["endYear", "End year"],
                ["link", "Optional link"],
                ["linkLabel", "Optional link label"],
              ].map(([field, placeholder]) => (
                <input
                  key={field}
                  type={field.includes("Year") ? "number" : "text"}
                  placeholder={placeholder}
                  value={experienceForm[field]}
                  onChange={(e) =>
                    setExperienceForm({ ...experienceForm, [field]: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                  required={["title", "company", "startYear"].includes(field)}
                />
              ))}
              <textarea
                placeholder="Description"
                value={experienceForm.description}
                onChange={(e) =>
                  setExperienceForm({ ...experienceForm, description: e.target.value })
                }
                className="h-28 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-primary"
                required
              />
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={experienceForm.ongoing}
                  onChange={(e) =>
                    setExperienceForm({ ...experienceForm, ongoing: e.target.checked })
                  }
                />
                Ongoing / Present
              </label>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white">
                <Plus size={17} />
                {editingExperienceId ? "Update" : "Add"}
              </button>
              {editingExperienceId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingExperienceId("");
                    setExperienceForm(emptyExperience);
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-3 font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Experience</h2>
            <div className="mt-5 space-y-3">
              {experiences.map((experience) => (
                <div
                  key={experience._id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{experience.title}</h3>
                      <p className="text-xs text-slate-500">
                        {experience.startYear}
                        {experience.ongoing
                          ? " - Present"
                          : experience.endYear
                            ? ` - ${experience.endYear}`
                            : ""}{" "}
                        | {experience.company}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {experience.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editExperience(experience)}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-white text-slate-700"
                        aria-label="Edit experience"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteExperience(experience._id)}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/10 text-rose-600"
                        aria-label="Delete experience"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold">Contact Messages</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">{contact.name}</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm font-semibold text-primary"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/10 text-rose-600"
                    aria-label="Delete contact"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{contact.message}</p>
                <p className="mt-3 text-xs text-slate-400">
                  {new Date(contact.createdAt).toLocaleString()} - {contact.emailStatus}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminPanel;
