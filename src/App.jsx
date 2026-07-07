import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const PROFILE_IMG = "/assets/profile_pic.jpeg";
const RESUME_URL = "/assets/MohdViquaruddinAnas_Resume.pdf";
const PAPER_URL = "/assets/Trust_Aware_Q_Learning_IoT_Routing.pdf";
const GCP_CERTIFICATE_URL = "/assets/google-cloud-career-launchpad-certificate.pdf";
const DELTA_CERTIFICATE_URL = "/assets/delta-full-stack-certificate.pdf";
const CISCO_CERTIFICATE_URL = "/assets/cisco-forecast-league-certificate.pdf";
const EXITLENS_VIDEO = "/assets/exitlens-demo.mp4";
const POSTVISIT_VIDEO = "/assets/postvisit-demo.mp4";
const URBANSTAY_VIDEO = "/assets/urbanstay-demo.mp4";
const NEKO_SCRIPT_URL = "https://louisabraham.github.io/nekojs/neko.js";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Why Me", id: "whyme" },
  { label: "Projects", id: "projects" },
  { label: "Stack", id: "skills" },
  { label: "Research", id: "research" },
  { label: "Achievements", id: "achievements" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const ROTATING_ROLES = [
  "Full Stack Developer",
  "MERN Stack",
  "AI Workflow Enthusiast",
];

const devicon = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const simpleIcon = (slug, color = "22e276") => `https://cdn.simpleicons.org/${slug}/${color}`;

const PROJECTS = [
  {
    id: 1,
    title: "ExitLens",
    tagline: "AI-Powered User Behavior Analytics",
    desc: "SaaS analytics platform with a lightweight 3KB tracker to monitor clicks, scroll depth, rage clicks, and bounce sessions. AI converts session data into severity-scored UX insights with heatmaps.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini AI", "JWT", "Render"],
    features: [
      "Multi-tenant backend with API key isolation",
      "Real-time heatmap visualization",
      "AI-generated UX insights",
      "Rage & dead click detection",
      "Session dashboard & exports",
    ],
    live: "https://exitlens-app.onrender.com",
    github: "https://github.com/Anas2694/ExitLens",
    video: EXITLENS_VIDEO,
    demo: { email: "mohdviquaruddin.is23@bmsce.ac.in", password: "Anas_2004" },
    color: "#6366f1",
    featured: true,
  },
  {
    id: 2,
    title: "PostVisit",
    tagline: "AI-Powered Healthcare Platform",
    desc: "End-to-end AI pipeline that extracts 10 key health indicators from medical PDFs/images and converts them into clear, actionable insights. Includes context-aware AI chatbot and health trend dashboards.",
    stack: ["Node.js", "Express.js", "MongoDB", "Gemini API", "Cloudinary", "Chart.js", "EJS", "Render"],
    features: [
      "OCR-based report ingestion with fallback",
      "AI health metric extraction",
      "Context-aware chatbot",
      "Trend dashboards over time",
      "Role-based access control",
    ],
    live: "https://postvisit-healthcare.onrender.com",
    github: "https://github.com/Anas2694/PostVisit-healthcare",
    video: POSTVISIT_VIDEO,
    demo: { email: "mohdviquaruddin.is23@bmsce.ac.in", password: "Anas_2004" },
    color: "#14b8a6",
    featured: false,
  },
  {
    id: 3,
    title: "UrbanStay",
    tagline: "Full-Stack Vacation Rental Platform",
    desc: "Airbnb-inspired platform with full CRUD, Cloudinary image storage, Mapbox geolocation, complete booking lifecycle with date validation, dynamic pricing, and Brevo email notifications.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mapbox API", "Cloudinary", "Passport.js", "Brevo", "Render"],
    features: [
      "Category-based filtering & regex search",
      "Complete booking lifecycle",
      "Event-driven email notifications",
      "Interactive map visualization",
      "CI/CD with GitHub Actions",
    ],
    live: "https://urbanstay-81ly.onrender.com",
    github: "https://github.com/Anas2694",
    video: URBANSTAY_VIDEO,
    demo: null,
    color: "#f59e0b",
    featured: false,
  },
];

const SKILLS_FLAT = [
  { name: "React.js", icon: devicon("react"), symbol: "R", color: "#61dafb" },
  { name: "Node.js", icon: devicon("nodejs"), symbol: "N", color: "#3c873a" },
  { name: "Express.js", icon: simpleIcon("express", "f7f7f7"), symbol: "Ex", color: "#f7f7f7" },
  { name: "MongoDB", icon: devicon("mongodb"), symbol: "M", color: "#00ed64" },
  { name: "JavaScript", icon: devicon("javascript"), symbol: "JS", color: "#f7df1e" },
  { name: "TypeScript", icon: devicon("typescript"), symbol: "TS", color: "#3178c6" },
  { name: "Python", icon: devicon("python"), symbol: "Py", color: "#ffd43b" },
  { name: "C++", icon: devicon("cplusplus"), symbol: "C++", color: "#659ad2" },
  { name: "Java", icon: devicon("java"), symbol: "J", color: "#f89820" },
  { name: "C", icon: devicon("c"), symbol: "C", color: "#a8b9cc" },
  { name: "HTML", icon: devicon("html5"), symbol: "H", color: "#e34f26" },
  { name: "CSS", icon: devicon("css3"), symbol: "CSS", color: "#1572b6" },
  { name: "Tailwind CSS", icon: devicon("tailwindcss"), symbol: "Tw", color: "#38bdf8" },
  { name: "EJS", icon: devicon("ejs"), symbol: "E", color: "#b4ca65" },
  { name: "Bootstrap", icon: devicon("bootstrap"), symbol: "B", color: "#7952b3" },
  { name: "REST APIs", icon: simpleIcon("openapiinitiative", "22e276"), symbol: "API", color: "#22e276" },
  { name: "JWT Auth", icon: simpleIcon("jsonwebtokens", "d63aff"), symbol: "JWT", color: "#d63aff" },
  { name: "Git", icon: devicon("git"), symbol: "Git", color: "#f05032" },
  { name: "GitHub", icon: simpleIcon("github", "f7f7f7"), symbol: "GH", color: "#f7f7f7" },
  { name: "Postman", icon: devicon("postman"), symbol: "P", color: "#ff6c37" },
  { name: "Render", icon: simpleIcon("render", "46e3b7"), symbol: "Re", color: "#46e3b7" },
  { name: "Cloudinary", icon: simpleIcon("cloudinary", "3448c5"), symbol: "Cl", color: "#3448c5" },
  { name: "Firebase", icon: devicon("firebase"), symbol: "Fb", color: "#ffca28" },
  { name: "Mapbox", icon: simpleIcon("mapbox", "4264fb"), symbol: "Mb", color: "#4264fb" },
  { name: "Brevo API", icon: simpleIcon("brevo", "0b996e"), symbol: "Br", color: "#0b996e" },
  { name: "GitHub Actions", icon: simpleIcon("githubactions", "2088ff"), symbol: "GA", color: "#2088ff" },
  { name: "CI/CD", icon: simpleIcon("githubactions", "22e276"), symbol: "CI", color: "#22e276" },
  { name: "Docker", icon: devicon("docker"), symbol: "D", color: "#2496ed" },
  { name: "Kubernetes", icon: devicon("kubernetes"), symbol: "K8s", color: "#326ce5" },
  { name: "Vercel", icon: simpleIcon("vercel", "f7f7f7"), symbol: "V", color: "#f7f7f7" },
  { name: "Claude Code", icon: simpleIcon("claude", "ff7a45"), symbol: "AI", color: "#ff7a45" },
  { name: "Streamlit", icon: simpleIcon("streamlit", "ff4b4b"), symbol: "St", color: "#ff4b4b" },
  { name: "SQL", icon: devicon("postgresql"), symbol: "SQL", color: "#336791" },
  { name: "Mongoose", icon: simpleIcon("mongoose", "880000"), symbol: "Mg", color: "#880000" },
];

const WHY_ME = [
  { icon: "⚡", title: "Fast Learner", desc: "Quickly adapts to new technologies, frameworks, and real-world development environments." },
  { icon: "🎯", title: "Attention to Detail", desc: "Clean, readable code with robust error handling and thoughtful UX." },
  { icon: "🧩", title: "Problem Solver", desc: "Focused on building scalable and practical solutions for real-world problems." },
  { icon: "🏗️", title: "Scalable Architecture", desc: "Multi-tenant SaaS, MVC patterns, and production-ready backends by default." },
  { icon: "🤝", title: "Team Collaboration", desc: "Co-authored an IEEE research paper with a four-member cross-discipline team." },
  { icon: "🎨", title: "UI/UX Focused", desc: "Every project is designed to feel good to use, not just functional." },
  { icon: "🔄", title: "Adaptable", desc: "Comfortable across the full stack - from React frontends to Node.js backends." },
  { icon: "📦", title: "Deployment Ready", desc: "All projects are live, cloud-deployed, and CI/CD integrated." },
];

function useLocalTime() {
  const [time, setTime] = useState({ time: "", date: "" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime({
        time: now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        date: now.toLocaleDateString("en-IN", {
          timeZone: "Asia/Kolkata",
          weekday: "short",
        }),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function useYearProgress() {
  const [progress, setProgress] = useState({
    year: "",
    percent: 0,
    percentLabel: "",
    day: 0,
    totalDays: 365,
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const year = now.getFullYear();
      const start = new Date(year, 0, 1);
      const end = new Date(year + 1, 0, 1);
      const dayMs = 24 * 60 * 60 * 1000;
      const totalDays = Math.round((end - start) / dayMs);
      const elapsedDays = (now - start) / dayMs;
      const percent = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

      setProgress({
        year,
        percent,
        percentLabel: percent.toFixed(1),
        day: Math.min(totalDays, Math.floor(elapsedDays) + 1),
        totalDays,
      });
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return progress;
}

function useTypewriterText(items) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = items[index];
    const isComplete = displayed === current;
    const isEmpty = displayed === "";
    let timeout = 75;

    if (!deleting && isComplete) {
      timeout = 1200;
    } else if (deleting && isEmpty) {
      timeout = 220;
    } else if (deleting) {
      timeout = 38;
    }

    const id = setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }

      if (deleting && isEmpty) {
        setDeleting(false);
        setIndex((currentIndex) => (currentIndex + 1) % items.length);
        return;
      }

      setDisplayed((value) =>
        deleting ? current.slice(0, Math.max(0, value.length - 1)) : current.slice(0, value.length + 1)
      );
    }, timeout);

    return () => clearTimeout(id);
  }, [deleting, displayed, index, items]);

  return displayed;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

function ProjectCard({ p, onClick }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const previewing = inView || interacting;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.35, rootMargin: "-8% 0px -12% 0px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (previewing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [previewing]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      className={`project-card ${p.featured ? "featured" : ""} ${previewing ? "previewing" : ""}`}
      onClick={() => onClick(p)}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{ "--accent": p.color }}
    >
      {p.featured && <div className="featured-badge">Featured</div>}
      <div className="project-accent" style={{ background: p.color }} />
      {p.video && (
        <div className="project-video-wrap" aria-hidden="true">
          <video ref={videoRef} className="project-video" src={p.video} muted loop playsInline preload="metadata" />
          <div className="project-video-label">Preview</div>
        </div>
      )}
      <div className="project-body">
        <h3 className="project-title">{p.title}</h3>
        <p className="project-tagline">{p.tagline}</p>
        <p className="project-desc">{p.desc}</p>
        <div className="stack-row">
          {p.stack.slice(0, 4).map((s) => (
            <span key={s} className="badge">
              {s}
            </span>
          ))}
          {p.stack.length > 4 && <span className="badge dim">+{p.stack.length - 4}</span>}
        </div>
      </div>
      <div className="project-footer">
        <a href={p.live} target="_blank" rel="noreferrer" className="pf-btn primary" onClick={(e) => e.stopPropagation()}>
          Live
        </a>
        <a href={p.github} target="_blank" rel="noreferrer" className="pf-btn" onClick={(e) => e.stopPropagation()}>
          GitHub
        </a>
        <button className="pf-btn ghost" onClick={(e) => { e.stopPropagation(); onClick(p); }}>
          Details
        </button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ p, onClose }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!p) return null;

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="modal-box"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        style={{ "--accent": p.color }}
      >
        <button className="modal-close" onClick={onClose}>x</button>
        <div className="modal-bar" style={{ background: p.color }} />
        <h2 className="modal-title">{p.title}</h2>
        <p className="modal-sub">{p.tagline}</p>
        <p className="modal-desc">{p.desc}</p>
        <div className="modal-sec">
          <h4>Features</h4>
          <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <div className="modal-sec">
          <h4>Stack</h4>
          <div className="stack-row">{p.stack.map((s) => <span key={s} className="badge">{s}</span>)}</div>
        </div>
        {p.demo && (
          <div className="modal-demo">
            <h4>Demo Login</h4>
            <p>Email: <code>{p.demo.email}</code></p>
            <p>Password: <code>{p.demo.password}</code></p>
          </div>
        )}
        <div className="modal-actions">
          <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary">Live Demo</a>
          <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline">GitHub</a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {doubled.map((item, i) => (
          <span key={`${item.name}-${i}`} className="marquee-tag">
            <span className="stack-symbol" style={{ "--skill-color": item.color }}>
              <img src={item.icon} alt="" loading="lazy" />
              <span>{item.symbol}</span>
            </span>
            <span>{item.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const { time, date } = useLocalTime();
  const yearProgress = useYearProgress();
  const rotatingRole = useTypewriterText(ROTATING_ROLES);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-70px 0px -40% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let fallbackFrame = null;
    let fallbackX = Math.max(24, window.innerWidth - 80);
    let fallbackY = Math.max(24, window.innerHeight - 80);
    const fallbackTarget = { x: fallbackX, y: fallbackY };

    const stopFallbackNeko = () => {
      if (fallbackFrame) cancelAnimationFrame(fallbackFrame);
      fallbackFrame = null;
      document.querySelector(".neko")?.classList.remove("neko-local-running");
    };

    const cleanupNeko = () => {
      stopFallbackNeko();
      window.neko?.stop?.();
      window.neko?.destroy?.();
      window.neko = null;
      document.querySelectorAll(".neko").forEach((el) => el.remove());
      document.querySelectorAll('script[data-neko-loader="true"]').forEach((el) => el.remove());
    };

    const forwardPointerToNeko = (event) => {
      const point = event.touches?.[0] || event;
      fallbackTarget.x = point.clientX;
      fallbackTarget.y = point.clientY;

      if (!window.neko) return;

      window.neko.mouseX = point.clientX;
      window.neko.mouseY = point.clientY;
      window.neko.hasMouseMoved = true;
    };

    const startNeko = () => {
      if (!window.createNeko) return;

      window.neko?.stop?.();
      window.neko?.destroy?.();
      document.querySelectorAll(".neko").forEach((el) => el.remove());
      window.neko = window.createNeko({
        fps: 120,
        speed: 28,
        startX: Math.max(24, window.innerWidth - 80),
        startY: Math.max(24, window.innerHeight - 80),
        allowBehaviorChange: false,
      });
    };

    const startFallbackNeko = () => {
      if (window.neko || fallbackFrame) return;

      const el = document.querySelector(".neko");
      if (!el) return;

      el.classList.add("neko-local-running");
      el.style.pointerEvents = "none";

      const tick = () => {
        const dx = fallbackTarget.x - fallbackX - 16;
        const dy = fallbackTarget.y - fallbackY - 24;
        const distance = Math.hypot(dx, dy);

        if (distance > 2) {
          const step = Math.min(18, distance);
          fallbackX += (dx / distance) * step;
          fallbackY += (dy / distance) * step;
          el.style.left = `${Math.round(fallbackX)}px`;
          el.style.top = `${Math.round(fallbackY)}px`;
          el.style.transform = `scaleX(${dx < 0 ? -1 : 1})`;
        }

        fallbackFrame = requestAnimationFrame(tick);
      };

      fallbackFrame = requestAnimationFrame(tick);
    };

    cleanupNeko();
    window.addEventListener("pointermove", forwardPointerToNeko, { passive: true });
    window.addEventListener("touchmove", forwardPointerToNeko, { passive: true });
    window.addEventListener("touchstart", forwardPointerToNeko, { passive: true });

    let cancelled = false;
    const script = document.createElement("script");
    script.src = NEKO_SCRIPT_URL;
    script.async = true;
    script.dataset.nekoLoader = "true";
    script.onload = () => {
      if (cancelled) return;
      startNeko();
      setTimeout(startFallbackNeko, 800);
    };
    document.body.appendChild(script);
    setTimeout(startFallbackNeko, 2000);

    return () => {
      cancelled = true;
      window.removeEventListener("pointermove", forwardPointerToNeko);
      window.removeEventListener("touchmove", forwardPointerToNeko);
      window.removeEventListener("touchstart", forwardPointerToNeko);
      cleanupNeko();
    };
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Server error");
    setToast("Message sent! I will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  } catch (err) {
    console.error(err);
    setToast("Something went wrong.");
  }
  setTimeout(() => setToast(null), 4000);
};

  const half1 = SKILLS_FLAT.slice(0, Math.ceil(SKILLS_FLAT.length / 2));
  const half2 = SKILLS_FLAT.slice(Math.ceil(SKILLS_FLAT.length / 2));

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="hero-bg" />
      <div className="hero-grid-bg" />

      <nav className={`nav ${navScrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-logo">MVA</div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button className={activeSection === l.id ? "active" : ""} onClick={() => go(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-btn" onClick={() => setDark(!dark)}>
            {dark ? "Light" : "Dark"}
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>Menu</button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mob-close" onClick={() => setMenuOpen(false)}>x</button>
        {NAV_LINKS.map((l) => (
          <button key={l.id} onClick={() => go(l.id)}>
            {l.label}
          </button>
        ))}
      </div>

      <section style={{ position: "relative" }}>
        <div className="hero hero-split">
          <motion.div className="hero-left" initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="hero-badge">
              <span /> Available for work
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-name">
              <span className="hero-kicker">Hey, I am</span>
              <span className="grad">Anas</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-identity">
              <span>21, he/him</span>
              <span className="identity-sep">|</span>
              <span className="identity-role">
                {rotatingRole}
                <span className="identity-cursor">|</span>
              </span>
              <span>from India.</span>
            </motion.p>
            <motion.p variants={fadeUp} className="hero-tagline">
              I build production-ready web applications, scalable backends, and AI-assisted systems with a focus on reliable software, clear user experiences, and practical engineering.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-meta">
              <div className="meta-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                Bangalore, Karnataka, India
              </div>
              <div className="meta-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                {date}, {time}
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="hero-right" initial="hidden" animate="show" variants={fadeUp}>
            <div className="hero-code-wrap">
              <div className="hero-code-card">
                <div className="code-window-bar">
                  <span className="window-dot red" />
                  <span className="window-dot yellow" />
                  <span className="window-dot green" />
                  <span className="code-window-title">~/anas/profile.js</span>
                </div>
                <div className="code-body">
                  <p><span className="code-purple">const</span> <span className="code-light">developer</span> <span className="code-muted">= {"{"}</span></p>
                  <p className="code-indent"><span className="code-key">name</span><span className="code-muted">: </span><span className="code-green">"Anas"</span><span className="code-muted">,</span></p>
                  <p className="code-indent"><span className="code-key">focus</span><span className="code-muted">: </span><span className="code-green">"MERN + AI"</span><span className="code-muted">,</span></p>
                  <p className="code-indent"><span className="code-key">builds</span><span className="code-muted">: [</span></p>
                  <p className="code-indent code-indent-2"><span className="code-green">"SaaS"</span><span className="code-muted">, </span><span className="code-green">"AI Systems"</span><span className="code-muted">,</span></p>
                  <p className="code-indent code-indent-2"><span className="code-green">"Scalable Backends"</span></p>
                  <p className="code-indent"><span className="code-muted">],</span></p>
                  <p className="code-indent"><span className="code-key">status</span><span className="code-muted">: </span><span className="code-green">"available"</span></p>
                  <p><span className="code-muted">{"}"}</span></p>
                  <div className="code-run-line">
                    <span className="code-green">$</span>
                    <span className="code-muted">npm run build</span>
                    <span className="code-success">success</span>
                  </div>
                </div>
              </div>
              <span className="float-badge badge-react">React</span>
              <span className="float-badge badge-node">Node</span>
              <span className="float-badge badge-ai">AI</span>
              <span className="float-badge badge-mongo">MongoDB</span>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="hero-bottom">
            <div className="year-progress" aria-label={`${yearProgress.year} progress ${yearProgress.percentLabel}%`}>
              <span className="year-progress-year">{yearProgress.year}</span>
              <span className="year-progress-divider" />
              <span className="year-progress-label">Progress</span>
              <div className="year-progress-track">
                <span style={{ width: `${yearProgress.percent}%` }} />
              </div>
              <span className="year-progress-percent">{yearProgress.percentLabel}%</span>
              <span className="year-progress-dot" />
              <span className="year-progress-label">Day</span>
              <span className="year-progress-day">
                {yearProgress.day}/{yearProgress.totalDays}
              </span>
            </div>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => go("projects")}>View Work</button>
              <a href={RESUME_URL} download className="btn-outline">Resume</a>
              <button className="btn-outline" onClick={() => go("contact")}>Contact</button>
            </div>
          </motion.div>
        </div>
        <div className="scroll-ind"><span>scroll</span><div className="scroll-dot" /></div>
      </section>

      <hr className="divider" />

      <section id="about" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">01 / About</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">Who I Am</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Third-year B.E. student building things that actually ship.</motion.p>
          </div>
          <div className="about-grid">
            <motion.div variants={fadeUp}>
              <div className="about-photo">
                <img src={PROFILE_IMG} alt="Mohd Viquaruddin Anas" className="updated-about-img" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="about-text">
                <p>I am a third-year Information Science and Engineering student at BMS College of Engineering (Class of 2027), passionate about building full-stack systems that are fast, scalable, and actually useful.</p>
                <p>My work spans AI-powered healthcare platforms, multi-tenant SaaS analytics, and vacation rental apps. I care about clean architecture, thoughtful UX, and code that holds up in production, not just demos.</p>
                <p>Outside building, I am active in research - co-authoring an IEEE paper on trust-aware distributed Q-learning for IoT security, with another paper accepted at IEEE WCCST-2026 on knowledge distillation for medical AI.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <hr className="divider" />

      <section id="whyme" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">02 / Why Me</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">What I Bring</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Beyond the tech stack.</motion.p>
          </div>
          <div className="why-grid">
            {WHY_ME.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <div className="why-t">{w.title}</div>
                <div className="why-d">{w.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <hr className="divider" />

      <section id="projects" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">03 / Projects</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">What I've Built</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Three production apps, all live.</motion.p>
          </div>
          <div className="proj-grid">
            {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} onClick={setModal} />)}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>{modal && <ProjectModal p={modal} onClose={() => setModal(null)} />}</AnimatePresence>

      <hr className="divider" />

      <section id="skills" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">04 / Stack</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">Tools & Technologies</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">The stack I work with day to day.</motion.p>
          </div>
          <motion.div variants={fadeIn} className="skills-wrap">
            <MarqueeRow items={half1} />
            <MarqueeRow items={half2} reverse />
          </motion.div>
        </motion.div>
      </section>

      <hr className="divider" />

      <section id="research" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">05 / Research</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">Publications</motion.h2>
          </div>
          <div className="research-grid">
            <motion.div variants={fadeUp} className="research-card">
              <div className="r-venue">ACCEPTED AT IEEE WCCST-2026</div>
              <h3 className="r-title">Knowledge Distillation for Cataract Classification using a ViT-DenseNet Framework</h3>
              <p className="r-authors">BMS College of Engineering</p>
              <p className="r-desc">A computer vision research paper focused on efficient cataract classification using transformer and CNN knowledge transfer.</p>
              <a href="https://xplorestaging.ieee.org/document/11495690" target="_blank" rel="noreferrer" className="r-link">IEEE link</a>
            </motion.div>

            <motion.div variants={fadeUp} className="research-card">
              <div className="r-venue">ATTACHED MANUSCRIPT</div>
              <h3 className="r-title">Trust-Aware Q-Learning Based Secure Routing Against Blackhole Attacks in Dynamic IoT Networks</h3>
              <p className="r-authors">BMS College of Engineering</p>
              <p className="r-desc">A decentralized trust-aware reinforcement learning framework that isolates malicious routing nodes and reports F1 0.897 with a 0.000 false positive rate in simulation.</p>
              <div className="r-metrics">
                <div><div className="r-metric-val">0.897</div><div className="r-metric-lbl">F1 Score</div></div>
                <div><div className="r-metric-val">0.000</div><div className="r-metric-lbl">False Positive Rate</div></div>
                <div><div className="r-metric-val">+21.5pp</div><div className="r-metric-lbl">PDR Improvement</div></div>
              </div>
              <a href={PAPER_URL} download className="r-link">Download paper</a>
            </motion.div>
          </div>

        </motion.div>
      </section>

      <hr className="divider" />

      <section id="achievements" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">06 / Certifications</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">Certifications & Achievements</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Credentials and milestones that back the work.</motion.p>
          </div>

          <div className="ach-grid">
            <motion.div variants={fadeUp} className="ach-card">
              <div className="ach-icon">GC</div>
              <div>
                <h4>Google Cloud Career Launchpad</h4>
                <p>Completed the Cloud Engineer Track through Google Cloud's Career Launchpad program.</p>
                <a href={GCP_CERTIFICATE_URL} target="_blank" rel="noreferrer" className="ach-link">View certificate</a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="ach-card">
              <div className="ach-icon">DSA</div>
              <div>
                <h4>450+ DSA Problems</h4>
                <p>
                  Solved 450+ problems on <a href="https://leetcode.com/u/viquaruddinanas2694/" target="_blank" rel="noreferrer" className="inline-link">LeetCode</a> & GeeksforGeeks with a 365+ day streak.
                </p>
                <a href="https://leetcode.com/u/viquaruddinanas2694/" target="_blank" rel="noreferrer" className="ach-link">View LeetCode profile</a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="ach-card">
              <div className="ach-icon">FS</div>
              <div>
                <h4>Full Stack Web Development</h4>
                <p>Completed the Delta Full Stack Web Development course from Apna College.</p>
                <a href={DELTA_CERTIFICATE_URL} target="_blank" rel="noreferrer" className="ach-link">View certificate</a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="ach-card">
              <div className="ach-icon">CS</div>
              <div>
                <h4>Cisco Champions League</h4>
                <p>Received a Cisco certificate of participation for completing the Cisco Forecast League as part of the Global Supply Chain Champions League.</p>
                <a href={CISCO_CERTIFICATE_URL} target="_blank" rel="noreferrer" className="ach-link">View certificate</a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <hr className="divider" />
      <section id="education" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">07 / Education</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">Academic Background</motion.h2>
          </div>
          <motion.div variants={fadeUp} className="edu-card">
            <div className="edu-icon">🎓</div>
            <div>
              <div className="edu-degree">B.E. in Information Science & Engineering</div>
              <div className="edu-college">BMS College of Engineering, Bangalore</div>
              <div className="edu-pills">
                <span className="edu-pill">2023 - 2027</span>
                <span className="edu-pill hi">CGPA: 8.5 / 10.0</span>
                <span className="edu-pill">VTU Autonomous</span>
              </div>
              <p className="edu-note">Data Structures & Algorithms - OOP - DBMS - Operating Systems - Computer Networks - Machine Learning</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <hr className="divider" />

      <section id="contact" className="section">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <div className="sec-head">
            <motion.span variants={fadeUp} className="sec-label">08 / Contact</motion.span>
            <motion.h2 variants={fadeUp} className="sec-title">Get In Touch</motion.h2>
            <motion.p variants={fadeUp} className="sec-sub">Open to internship opportunities and collaborations.</motion.p>
          </div>
          <div className="contact-grid">
            <motion.div variants={fadeUp} className="c-info">
              <h3>Let's Work Together</h3>
              <p>I'm actively looking for software engineering and full-stack internships. If you're building something interesting or have an opening, I'd love to hear from you.</p>
              <div className="c-links">
                <a href="mailto:viquaruddinanas2694@gmail.com" className="c-link"><div className="c-link-icon">✉️</div>viquaruddinanas2694@gmail.com</a>
                <a href="https://www.linkedin.com/in/mohd-viquaruddin-anas-402a14282" target="_blank" rel="noreferrer" className="c-link"><div className="c-link-icon">💼</div>linkedin.com/in/mohd-viquaruddin-anas</a>
                <a href="https://github.com/Anas2694" target="_blank" rel="noreferrer" className="c-link"><div className="c-link-icon">GH</div>github.com/Anas2694</a>
                <a href="https://leetcode.com/u/viquaruddinanas2694/" target="_blank" rel="noreferrer" className="c-link"><div className="c-link-icon">LC</div>leetcode.com/u/viquaruddinanas2694</a>
                <div className="c-link"><div className="c-link-icon">📍</div>Bangalore, Karnataka, India</div>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <form onSubmit={submit}>
                <div className="f-group"><label className="f-label">NAME</label><input className="f-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
                <div className="f-group"><label className="f-label">EMAIL</label><input className="f-input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
                <div className="f-group"><label className="f-label">MESSAGE</label><textarea className="f-input" placeholder="What's on your mind?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></div>
                <button type="submit" className="f-submit">Send Message</button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          {NAV_LINKS.map((l) => <button key={l.id} onClick={() => go(l.id)}>{l.label}</button>)}
        </div>
        <span>© 2026 Mohd Viquaruddin Anas - Built with React & MERN</span>
      </footer>

      <a href={RESUME_URL} download className="resume-float">Resume</a>
      <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>

      <AnimatePresence>
        {toast && <motion.div className="toast" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>{toast}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
