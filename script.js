(function () {
  const d = PORTFOLIO;

  // ---------- Color palettes ----------
  const TAG_COLORS = {
    Featured: "#a78bfa",
    "Full-Stack": "#60a5fa",
    "AI/ML": "#34d399",
    Algorithms: "#fbbf24",
    "Computer Vision": "#f472b6",
    Security: "#f87171",
  };
  const SKILL_COLORS = {
    Languages: "#60a5fa",
    "Frameworks / Libraries": "#34d399",
    Databases: "#fbbf24",
    Tools: "#f472b6",
    Concepts: "#a78bfa",
  };
  const SECTION_COLORS = {
    experience: "#60a5fa",
    research: "#a78bfa",
    education: "#34d399",
    leadership: "#f472b6",
  };
  const CONTACT_COLORS = {
    Email: "#60a5fa",
    "USC Email": "#38bdf8",
    Phone: "#34d399",
    GitHub: "#a78bfa",
    LinkedIn: "#38bdf8",
    LeetCode: "#fbbf24",
    Location: "#f472b6",
  };
  const cardColorFor = (tags) => {
    for (const t of tags) if (TAG_COLORS[t]) return TAG_COLORS[t];
    return null;
  };

  // ---------- Theme ----------
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  function currentTheme() {
    if (root.getAttribute("data-theme")) return root.getAttribute("data-theme");
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function syncIcons() {
    const light = currentTheme() === "light";
    document.getElementById("iconSun").style.display = light ? "none" : "block";
    document.getElementById("iconMoon").style.display = light ? "block" : "none";
  }
  syncIcons();
  document.getElementById("themeToggle").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    btn.style.transform = "rotate(180deg)";
    setTimeout(() => (btn.style.transform = ""), 350);
    const next = currentTheme() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncIcons();
  });

  // ---------- Helpers ----------
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  };
  const reveal = (node) => {
    node.classList.add("reveal");
    return node;
  };

  // ---------- Toast ----------
  const toastEl = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2000);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied "${text}"`);
    } catch {
      showToast("Couldn't copy — please copy manually");
    }
  }

  // ---------- Scroll reveal (defined early: renderProjects() calls observeReveals()) ----------
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in-view)").forEach((n) => revealObserver.observe(n));
  }

  // ---------- Hero ----------
  document.getElementById("heroName").textContent = d.profile.name;
  document.getElementById("heroTitle").textContent = d.profile.title;
  document.getElementById("heroTagline").textContent = d.profile.tagline;
  document.title = `${d.profile.name} — ${d.profile.title}`;

  const profileImg = document.getElementById("profileImg");
  const fallback = document.getElementById("photoFallback");
  fallback.textContent = d.profile.initials;
  profileImg.src = d.profile.photo;
  profileImg.addEventListener("error", () => {
    profileImg.style.display = "none";
    fallback.style.display = "flex";
  });

  const socials = document.getElementById("heroSocials");
  const socialLabels = { github: "GH", linkedin: "in", leetcode: "LC" };
  Object.entries(d.profile.links).forEach(([key, url]) => {
    const a = el("a", null, socialLabels[key] || key.slice(0, 2).toUpperCase());
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = key;
    socials.appendChild(a);
  });

  document.getElementById("resumeLink").href = d.profile.resume;

  // ---------- Live GitHub stats ----------
  const ghStatsEl = document.getElementById("ghStats");
  if (d.profile.githubUsername) {
    fetch(`https://api.github.com/users/${d.profile.githubUsername}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((user) => {
        const items = [
          { label: "Public Repos", value: user.public_repos },
          { label: "Followers", value: user.followers },
        ];
        items.forEach((it) => {
          const wrap = el("div", "gh-stat");
          wrap.appendChild(el("strong", null, it.value));
          wrap.appendChild(document.createTextNode(it.label));
          ghStatsEl.appendChild(wrap);
        });
        ghStatsEl.classList.add("loaded");
      })
      .catch(() => {
        /* offline or rate-limited: fail silently, badge stays empty */
      });
  }

  // ---------- Stats strip (animated count-up) ----------
  const statsStrip = document.getElementById("statsStrip");
  const statTiles = [];
  d.stats.forEach((s) => {
    const tile = el("div", "stat-tile");
    const valueEl = el("div", "stat-value", "0" + s.suffix);
    tile.appendChild(valueEl);
    tile.appendChild(el("div", "stat-label", s.label));
    statsStrip.appendChild(tile);
    statTiles.push({ target: s.value, suffix: s.suffix, el: valueEl });
  });

  function animateStats() {
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      statTiles.forEach((st) => {
        const current = st.target * eased;
        const display = Number.isInteger(st.target) ? Math.round(current) : current.toFixed(2);
        st.el.textContent = display + st.suffix;
      });
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  statsObserver.observe(statsStrip);

  // ---------- Skills ----------
  const skillsGrid = document.getElementById("skillsGrid");
  Object.entries(d.skills).forEach(([group, items]) => {
    const wrap = reveal(el("div", "skill-group"));
    const color = SKILL_COLORS[group];
    if (color) wrap.style.setProperty("--group-color", color);
    wrap.appendChild(el("h4", null, group));
    const row = el("div", "chip-row");
    items.forEach((item) => {
      const chip = el("span", "chip colored", item);
      if (color) chip.style.setProperty("--chip-color", color);
      row.appendChild(chip);
    });
    wrap.appendChild(row);
    skillsGrid.appendChild(wrap);
  });

  // ---------- Experience ----------
  const experienceList = document.getElementById("experienceList");
  d.experience.forEach((job) => {
    const item = reveal(el("div", "timeline-item"));
    item.style.setProperty("--item-color", SECTION_COLORS.experience);
    const head = el("div", "timeline-head");
    head.appendChild(el("h3", null, job.company));
    head.appendChild(el("span", "timeline-meta", job.date));
    item.appendChild(head);
    item.appendChild(el("p", "timeline-role", job.role));
    item.appendChild(el("p", "timeline-loc", job.location));
    const ul = el("ul");
    job.bullets.forEach((b) => ul.appendChild(el("li", null, b)));
    item.appendChild(ul);
    experienceList.appendChild(item);
  });

  // ---------- Research ----------
  const researchList = document.getElementById("researchList");
  d.research.forEach((r) => {
    const item = reveal(el("div", "timeline-item"));
    item.style.setProperty("--item-color", SECTION_COLORS.research);
    const head = el("div", "timeline-head");
    head.appendChild(el("h3", null, r.title));
    head.appendChild(el("span", "timeline-meta", r.date));
    item.appendChild(head);
    item.appendChild(el("p", "timeline-role", r.role));
    const ul = el("ul");
    r.bullets.forEach((b) => ul.appendChild(el("li", null, b)));
    item.appendChild(ul);
    researchList.appendChild(item);
  });

  // ---------- Education ----------
  const educationList = document.getElementById("educationList");
  d.education.forEach((e) => {
    const item = reveal(el("div", "timeline-item"));
    item.style.setProperty("--item-color", SECTION_COLORS.education);
    const head = el("div", "timeline-head");
    head.appendChild(el("h3", null, e.school));
    head.appendChild(el("span", "timeline-meta", e.date));
    item.appendChild(head);
    item.appendChild(el("p", "timeline-role", e.degree));
    item.appendChild(el("p", "timeline-loc", e.location));
    if (e.note) item.appendChild(el("p", "detail", e.note));
    educationList.appendChild(item);
  });

  // ---------- Certifications ----------
  const certificationsList = document.getElementById("certificationsList");
  d.certifications.forEach((c) => {
    const item = reveal(el("div", "timeline-item"));
    item.style.setProperty("--item-color", SECTION_COLORS.education);
    const head = el("div", "timeline-head");
    if (c.url) {
      const link = el("a", "cert-link", c.name);
      link.href = c.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.title = "Verify credential";
      head.appendChild(el("h3", null, "")).appendChild(link);
    } else {
      head.appendChild(el("h3", null, c.name));
    }
    head.appendChild(el("span", "timeline-meta", c.date));
    item.appendChild(head);
    item.appendChild(el("p", "detail", c.issuer));
    certificationsList.appendChild(item);
  });

  // ---------- Leadership ----------
  const leadershipList = document.getElementById("leadershipList");
  d.leadership.forEach((l) => {
    const item = reveal(el("div", "timeline-item"));
    item.style.setProperty("--item-color", SECTION_COLORS.leadership);
    const head = el("div", "timeline-head");
    head.appendChild(el("h3", null, l.role));
    head.appendChild(el("span", "timeline-meta", l.date));
    item.appendChild(head);
    item.appendChild(el("p", "detail", l.detail));
    leadershipList.appendChild(item);
  });

  // ---------- Projects + filters + search ----------
  const projectGrid = document.getElementById("projectGrid");
  const filterBar = document.getElementById("filterBar");
  const projectSearch = document.getElementById("projectSearch");
  const projectEmpty = document.getElementById("projectEmpty");

  const allTags = ["All", ...new Set(d.projects.flatMap((p) => p.tags))];
  let activeTag = "All";
  let searchTerm = "";

  function matchesSearch(p, term) {
    if (!term) return true;
    const haystack = [p.title, p.description, ...p.stack, ...p.tags].join(" ").toLowerCase();
    return haystack.includes(term);
  }

  function renderProjects() {
    projectGrid.innerHTML = "";
    let visibleCount = 0;
    d.projects.forEach((p) => {
      const card = reveal(el("div", "project-card"));
      const color = cardColorFor(p.tags);
      if (color) card.style.setProperty("--card-color", color);
      const tagMatch = activeTag === "All" || p.tags.includes(activeTag);
      const searchMatch = matchesSearch(p, searchTerm);
      if (!tagMatch || !searchMatch) {
        card.classList.add("hidden");
      } else {
        visibleCount++;
      }

      const head = el("div", "project-card-head");
      head.appendChild(el("h3", null, p.title));
      card.appendChild(head);
      card.appendChild(el("p", "project-date", p.date));

      const tagRow = el("div", "project-tags");
      p.tags.forEach((t) => {
        const tagEl = el("span", "tag", t);
        if (TAG_COLORS[t]) tagEl.style.setProperty("--tag-color", TAG_COLORS[t]);
        tagRow.appendChild(tagEl);
      });
      card.appendChild(tagRow);

      card.appendChild(el("p", "desc", p.description));

      const stackRow = el("div", "project-stack");
      p.stack.forEach((s) => stackRow.appendChild(el("span", "chip", s)));
      card.appendChild(stackRow);

      const link = el("a", "gh-link", "View on GitHub &rarr;");
      link.href = p.github;
      link.target = "_blank";
      link.rel = "noopener";
      card.appendChild(link);

      // spotlight + subtle tilt on mouse move
      card.addEventListener("mousemove", (ev) => {
        const rect = card.getBoundingClientRect();
        const x = ((ev.clientX - rect.left) / rect.width) * 100;
        const y = ((ev.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
        const rx = ((y - 50) / 50) * -4;
        const ry = ((x - 50) / 50) * 4;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

      projectGrid.appendChild(card);
    });
    projectEmpty.hidden = visibleCount !== 0;
    observeReveals();
  }

  let indicator;
  function positionIndicator(btn) {
    if (!indicator) return;
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
    const tag = btn.textContent;
    indicator.style.setProperty("--filter-color", TAG_COLORS[tag] || "var(--accent)");
  }

  allTags.forEach((tag) => {
    const btn = el("button", "filter-btn", tag);
    if (tag === activeTag) btn.classList.add("active");
    btn.addEventListener("click", () => {
      activeTag = tag;
      [...filterBar.querySelectorAll(".filter-btn")].forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      positionIndicator(btn);
      renderProjects();
    });
    filterBar.appendChild(btn);
  });

  indicator = el("div", "filter-indicator");
  filterBar.appendChild(indicator);

  let searchDebounce;
  projectSearch.addEventListener("input", (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderProjects();
    }, 120);
  });

  renderProjects();
  requestAnimationFrame(() => {
    const activeBtn = filterBar.querySelector(".filter-btn.active");
    if (activeBtn) positionIndicator(activeBtn);
  });
  window.addEventListener("resize", () => {
    const activeBtn = filterBar.querySelector(".filter-btn.active");
    if (activeBtn) positionIndicator(activeBtn);
  });

  // ---------- Contact ----------
  const contactGrid = document.getElementById("contactGrid");
  const contactItems = [
    { label: "Email", value: d.profile.email, href: `mailto:${d.profile.email}` },
    { label: "USC Email", value: d.profile.secondaryEmail, href: `mailto:${d.profile.secondaryEmail}` },
    { label: "Phone", value: d.profile.phone, href: `tel:${d.profile.phone.replace(/[^\d+]/g, "")}` },
    { label: "GitHub", value: "jayminsheladia", href: d.profile.links.github },
    { label: "LinkedIn", value: "jayminsheladia", href: d.profile.links.linkedin },
    { label: "LeetCode", value: "Jayminsheladia", href: d.profile.links.leetcode },
    { label: "Location", value: d.profile.location, href: null },
  ];
  contactItems.forEach((c) => {
    const card = reveal(el(c.href ? "a" : "div", "contact-card"));
    if (CONTACT_COLORS[c.label]) card.style.setProperty("--card-color", CONTACT_COLORS[c.label]);
    if (c.href) {
      card.href = c.href;
      if (c.href.startsWith("http")) {
        card.target = "_blank";
        card.rel = "noopener";
      }
    }
    card.appendChild(el("span", "label", c.label));
    card.appendChild(el("span", "value", c.value));

    if (c.label === "Email" || c.label === "USC Email" || c.label === "Phone") {
      const copyBtn = el(
        "button",
        "copy-btn",
        '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z"/></svg>'
      );
      copyBtn.type = "button";
      copyBtn.title = `Copy ${c.label.toLowerCase()}`;
      copyBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        copyText(c.value);
      });
      card.appendChild(copyBtn);
    }

    contactGrid.appendChild(card);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  observeReveals();

  // ---------- Scrollspy ----------
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find((a) => a.getAttribute("href") === `#${entry.target.id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  // ---------- Nav scrolled state, progress bar, back-to-top ----------
  const mainNav = document.getElementById("mainNav");
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${pct}%`;

      mainNav.classList.toggle("scrolled", scrollTop > 8);
      backToTop.classList.toggle("show", scrollTop > 500);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------- Command palette ----------
  const cmdkOverlay = document.getElementById("cmdkOverlay");
  const cmdkInput = document.getElementById("cmdkInput");
  const cmdkList = document.getElementById("cmdkList");
  const cmdkTrigger = document.getElementById("cmdkTrigger");

  const commands = [
    ...navLinks.map((a) => ({
      title: `Go to ${a.textContent}`,
      hint: "Section",
      action: () => document.querySelector(a.getAttribute("href")).scrollIntoView({ behavior: "smooth" }),
    })),
    { title: "Open GitHub", hint: "External", action: () => window.open(d.profile.links.github, "_blank", "noopener") },
    { title: "Open LinkedIn", hint: "External", action: () => window.open(d.profile.links.linkedin, "_blank", "noopener") },
    { title: "Open LeetCode", hint: "External", action: () => window.open(d.profile.links.leetcode, "_blank", "noopener") },
    { title: "Download Résumé", hint: "PDF", action: () => window.open(d.profile.resume, "_blank", "noopener") },
    { title: "Copy Email Address", hint: d.profile.email, action: () => copyText(d.profile.email) },
    { title: "Copy USC Email Address", hint: d.profile.secondaryEmail, action: () => copyText(d.profile.secondaryEmail) },
    { title: "Copy Phone Number", hint: d.profile.phone, action: () => copyText(d.profile.phone) },
    {
      title: "Toggle Theme",
      hint: "Dark / Light",
      action: () => document.getElementById("themeToggle").click(),
    },
  ];

  let cmdkActiveIndex = 0;
  let cmdkFiltered = commands;

  function renderCmdk() {
    cmdkList.innerHTML = "";
    if (cmdkFiltered.length === 0) {
      cmdkList.appendChild(el("div", "cmdk-empty", "No matching commands."));
      return;
    }
    cmdkFiltered.forEach((cmd, i) => {
      const item = el("div", "cmdk-item" + (i === cmdkActiveIndex ? " active" : ""));
      item.appendChild(el("span", null, cmd.title));
      item.appendChild(el("span", "cmdk-item-hint", cmd.hint || ""));
      item.addEventListener("click", () => runCommand(cmd));
      item.addEventListener("mouseenter", () => {
        cmdkActiveIndex = i;
        cmdkList.querySelectorAll(".cmdk-item").forEach((n, idx) => n.classList.toggle("active", idx === i));
      });
      cmdkList.appendChild(item);
    });
  }

  function runCommand(cmd) {
    closeCmdk();
    cmd.action();
  }

  function openCmdk() {
    cmdkOverlay.hidden = false;
    cmdkInput.value = "";
    cmdkFiltered = commands;
    cmdkActiveIndex = 0;
    renderCmdk();
    setTimeout(() => cmdkInput.focus(), 0);
  }
  function closeCmdk() {
    cmdkOverlay.hidden = true;
  }

  cmdkTrigger.addEventListener("click", openCmdk);
  cmdkOverlay.addEventListener("click", (e) => {
    if (e.target === cmdkOverlay) closeCmdk();
  });

  cmdkInput.addEventListener("input", () => {
    const term = cmdkInput.value.trim().toLowerCase();
    cmdkFiltered = commands.filter((c) => c.title.toLowerCase().includes(term));
    cmdkActiveIndex = 0;
    renderCmdk();
  });

  cmdkInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      cmdkActiveIndex = Math.min(cmdkActiveIndex + 1, cmdkFiltered.length - 1);
      renderCmdk();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      cmdkActiveIndex = Math.max(cmdkActiveIndex - 1, 0);
      renderCmdk();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (cmdkFiltered[cmdkActiveIndex]) runCommand(cmdkFiltered[cmdkActiveIndex]);
    } else if (e.key === "Escape") {
      closeCmdk();
    }
  });

  document.addEventListener("keydown", (e) => {
    const isK = e.key === "k" || e.key === "K";
    if ((e.metaKey || e.ctrlKey) && isK) {
      e.preventDefault();
      cmdkOverlay.hidden ? openCmdk() : closeCmdk();
    } else if (e.key === "Escape" && !cmdkOverlay.hidden) {
      closeCmdk();
    }
  });
})();
