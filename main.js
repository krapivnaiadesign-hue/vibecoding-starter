import "./style.css";

const portfolio = document.querySelector(".portfolio");
const projects = [...document.querySelectorAll(".project")];

function setActiveProject(projectId) {
  if (!portfolio) {
    return;
  }

  const isExpanded = Boolean(projectId);
  portfolio.dataset.mode = isExpanded ? "expanded" : "intro";
  portfolio.dataset.activeProject = projectId || "none";

  projects.forEach((project) => {
    const isActive = project.dataset.project === projectId;
    const control = project.querySelector(".project__control");

    project.classList.toggle("is-active", isActive);
    project.setAttribute("aria-expanded", String(isActive));

    if (control) {
      control.textContent = isActive ? "Collapse" : "Open case";
    }
  });
}

projects.forEach((project) => {
  const control = project.querySelector(".project__control");

  project.addEventListener("click", (event) => {
    if (event.target.closest(".project__control")) {
      return;
    }

    if (!project.classList.contains("is-active")) {
      setActiveProject(project.dataset.project);
    }
  });

  project.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    if (!project.classList.contains("is-active")) {
      event.preventDefault();
      setActiveProject(project.dataset.project);
    }
  });

  control?.addEventListener("click", () => {
    const nextState = project.classList.contains("is-active")
      ? null
      : project.dataset.project;

    setActiveProject(nextState);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setActiveProject(null);
  }
});
