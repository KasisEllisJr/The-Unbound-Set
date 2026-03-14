const output = document.getElementById("command-output");
const commandButtons = document.querySelectorAll(".command-buttons button");

const commandResponses = {
  projects: "Opening projects section...",
  about: "Loading profile and background...",
  logs: "Accessing development logs...",
  contact: "Displaying contact channels..."
};

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.command;
    output.textContent = commandResponses[command] || "Command not recognized.";
  });
});

console.log("v0.1.3 loaded.");