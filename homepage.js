const output = document.getElementById("command-output");
const commandButtons = document.querySelectorAll(".command-buttons button");

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
  logs: {
    text: "Development logs loaded: milestone history is visible below in patch-note format.",
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

console.log("v0.1.6 loaded.");