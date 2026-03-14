const output = document.getElementById("command-output");
const commandButtons = document.querySelectorAll(".command-buttons button");
const detailButtons = document.querySelectorAll(".detail-button");
const logFilters = document.querySelectorAll(".log-filter");
const logEntries = document.querySelectorAll(".log-entry");
const logToggles = document.querySelectorAll(".log-toggle");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const commandForm = document.getElementById("command-form");
const commandInput = document.getElementById("command-input");
const projectFilters = document.querySelectorAll(".project-filter");
const projectItems = document.querySelectorAll(".project-item");
const copyEmailButton = document.getElementById("copy-email-button");
const backToTopButton = document.getElementById("back-to-top");

const detailTitle = document.getElementById("detail-title");
const detailSummary = document.getElementById("detail-summary");
const detailStack = document.getElementById("detail-stack");
const detailPoints = document.getElementById("detail-points");
const detailPanel = document.getElementById("project-detail-panel");
const detailStatus = document.getElementById("detail-status");
const detailCategory = document.getElementById("detail-category");

const commandResponses = {
  projects: {
    text: "Selected work loaded: featured Flight Map Project, database systems work, and Rogue Lite concept design.",
    target: "#projects"
  },
  about: {
    text: "Profile loaded: creative developer focused on analytics, web development, design, and technical exploration.",
    target: "#about"
  },
  focus: {
    text: "Current focus loaded: data & analytics, web development, and creative systems.",
    target: "#focus"
  },
  stats: {
    text: "Quick stats loaded: project areas, sections, roles, and portfolio identity.",
    target: "#stats"
  },
  logs: {
    text: "Development logs loaded: filter, expand, or collapse entries below.",
    target: "#logs"
  },
  contact: {
    text: "Available channels: GitHub, LinkedIn, and email.",
    target: "#contact"
  },
  home: {
    text: "Homepage hero loaded.",
    target: "#hero"
  }
};

const projectDetails = {
  "flight-map": {
    title: "Flight Map Project",
    summary: "Interactive mapping build focused on live data visualization, interface design, and responsive display.",
    stack: "HTML / CSS / JavaScript / Leaflet / API Data",
    status: "ACTIVE",
    category: "WEB / DATA",
    points: [
      "Built around live or refreshed data visualization",
      "Combines mapping tools with front-end interface logic",
      "Represents technical and presentation-focused development"
    ]
  },
  "db-design": {
    title: "Normalization, ERDs and DDL",
    summary: "Database design project centered on structure, schema thinking, and relational organization.",
    stack: "Database Design / ERD / SQL / DDL",
    status: "ARCHIVE",
    category: "DATABASE",
    points: [
      "Focuses on normalized relational structure",
      "Uses entity relationship planning and schema creation",
      "Represents database and systems design skills"
    ]
  },
  "rogue-lite": {
    title: "Rogue Lite Game Concept WIP",
    summary: "Concept-driven project exploring mechanics, progression, and worldbuilding through iterative design.",
    stack: "Game Design / Systems / Worldbuilding",
    status: "WIP",
    category: "CREATIVE SYSTEMS",
    points: [
      "Explores progression and gameplay structure",
      "Focuses on concept building and system design",
      "Represents creative and technical thinking together"
    ]
  }
};

let typingTimerId = null;

function typeOutput(text) {
  if (!output) return;
  if (typingTimerId) clearInterval(typingTimerId);

  output.textContent = "";
  let index = 0;

  typingTimerId = setInterval(() => {
    output.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      clearInterval(typingTimerId);
      typingTimerId = null;
    }
  }, 18);
}

function navigateTo(target) {
  const targetSection = document.querySelector(target);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (siteNav && window.innerWidth <= 700) {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
}

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;
    const response = commandResponses[command];

    if (!response) {
      typeOutput("Command not recognized.");
      return;
    }

    typeOutput(response.text);
    navigateTo(response.target);
  });
});

if (commandForm && commandInput) {
  commandForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = commandInput.value.trim().toLowerCase();

    if (!value) {
      typeOutput("Enter a command.");
      return;
    }

    if (commandResponses[value]) {
      typeOutput(commandResponses[value].text);
      navigateTo(commandResponses[value].target);
    } else if (value === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      typeOutput("Returned to top of interface.");
    } else {
      typeOutput(`Unknown command: ${value}`);
    }

    commandInput.value = "";
  });
}

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    if (!project) return;

    detailTitle.textContent = project.title;
    detailSummary.textContent = project.summary;
    detailStack.textContent = project.stack;
    detailStatus.textContent = project.status;
    detailCategory.textContent = project.category;
    detailPoints.innerHTML = "";

    project.points.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      detailPoints.appendChild(li);
    });

    detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    typeOutput(`Detail panel loaded: ${project.title}.`);
  });
});

projectFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.projectFilter;

    projectFilters.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectItems.forEach((item) => {
      const type = item.dataset.projectType;
      const shouldShow = filter === "all" || filter === type;
      item.style.display = shouldShow ? "block" : "none";
    });

    typeOutput(
      filter === "all"
        ? "Showing all project types."
        : `Showing ${filter} projects.`
    );
  });
});

logFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    logFilters.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    logEntries.forEach((entry) => {
      const type = entry.dataset.type;
      const shouldShow = filter === "all" || filter === type;
      entry.style.display = shouldShow ? "block" : "none";
    });

    typeOutput(
      filter === "all"
        ? "Showing all development logs."
        : `Showing ${filter} development logs.`
    );
  });
});

logToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const entry = button.closest(".log-entry");
    const body = entry?.querySelector(".log-entry-body");
    if (!body) return;

    const isHidden = body.classList.toggle("collapsed");
    button.textContent = isHidden ? "Expand" : "Collapse";
  });
});

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = "kasis.ellisjr@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      typeOutput("Email copied to clipboard.");
      copyEmailButton.textContent = "Copied";
      setTimeout(() => {
        copyEmailButton.textContent = "Copy Email";
      }, 1200);
    } catch {
      typeOutput("Unable to copy email.");
    }
  });
}

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("visible", window.scrollY > 500);
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    typeOutput("Returned to top of interface.");
  });
}

typeOutput("Awaiting input...");
console.log("v0.1.9 loaded.");