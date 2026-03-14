const output = document.getElementById("command-output");
const commandButtons = document.querySelectorAll(".command-buttons button");
const detailButtons = document.querySelectorAll(".detail-button");
const logFilters = document.querySelectorAll(".log-filter");
const logEntries = document.querySelectorAll(".log-entry");

const detailTitle = document.getElementById("detail-title");
const detailSummary = document.getElementById("detail-summary");
const detailStack = document.getElementById("detail-stack");
const detailPoints = document.getElementById("detail-points");
const detailPanel = document.getElementById("project-detail-panel");

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
    text: "Development logs loaded: filter by major or structure updates.",
    target: "#logs"
  },
  contact: {
    text: "Available channels: GitHub, LinkedIn, and email.",
    target: "#contact"
  }
};

const projectDetails = {
  "flight-map": {
    title: "Flight Map Project",
    summary: "Interactive mapping build focused on live data visualization, interface design, and responsive display.",
    stack: "HTML / CSS / JavaScript / Leaflet / API Data",
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
    points: [
      "Explores progression and gameplay structure",
      "Focuses on concept building and system design",
      "Represents creative and technical thinking together"
    ]
  }
};

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;
    const response = commandResponses[command];

    if (!response) {
      output.textContent = "Command not recognized.";
      return;
    }

    output.textContent = response.text;

    const targetSection = document.querySelector(response.target);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectDetails[button.dataset.project];
    if (!project) return;

    detailTitle.textContent = project.title;
    detailSummary.textContent = project.summary;
    detailStack.textContent = project.stack;
    detailPoints.innerHTML = "";

    project.points.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      detailPoints.appendChild(li);
    });

    detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    output.textContent = `Detail panel loaded: ${project.title}.`;
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

    output.textContent =
      filter === "all"
        ? "Showing all development logs."
        : `Showing ${filter} development logs.`;
  });
});

console.log("v0.1.7 loaded.");