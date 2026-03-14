const output = document.getElementById("command-output");
const commandButtons = document.querySelectorAll(".command-buttons button");

const commandResponses = {
  projects: {
    text: "Selected work loaded: Flight Map Project, Normalization / ERDs / DDL, Rogue Lite Game Concept WIP.",
    target: "#projects"
  },
  about: {
    text: "Kasimu Ellis: creative developer focused on data, analytics, web development, design, databases, and technical exploration.",
    target: "#about"
  },
  focus: {
    text: "Current focus loaded: data & analytics, web development, and creative systems.",
    target: "#focus"
  },
  logs: {
    text: "Development logs loaded: version history is visible below in patch-note format.",
    target: "#logs"
  },
  contact: {
    text: "Available channels: GitHub, LinkedIn, and email.",
    target: "#contact"
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

console.log("v0.1.5 loaded.");