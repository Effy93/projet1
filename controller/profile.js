import { agents } from "../model/agents.js";
import { auth } from "../model/user.js";
import { renderAgent } from "../view/agent-renderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  if (!user || !auth.isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  const userNameEl = document.getElementById("userName");
  const userEmailEl = document.getElementById("userEmail");
  const sidebar = document.querySelector(".ia-container .sidebar");
  const agentCardContainer = document.querySelector(".agent-info");
  const logoutBtn = document.getElementById("nav-btn-logout");

  if (userNameEl) userNameEl.textContent = `Bienvenue, ${user.name}!`;
  if (userEmailEl) userEmailEl.textContent = user.email;

  if (logoutBtn) {
    logoutBtn.style.display = "inline";
    logoutBtn.addEventListener("click", () => {
      auth.logout();
      window.location.href = "index.html";
    });
  }

  if (!user.agents || user.agents.length === 0) {
    agentCardContainer.innerHTML = "<p>Vous n'avez aucune IA pour le moment 😢</p>";
    return;
  }

  // Création des onglets dynamiques
  user.agents.forEach((agentName, index) => {
    const agent = agents.find(a => a.name === agentName);
    if (!agent) return;

    const btn = document.createElement("button");
    btn.className = "agent-tab";
    btn.dataset.agent = index;
    btn.textContent = agent.name;
    sidebar.appendChild(btn);

    btn.addEventListener("click", () => renderAgent(agent, user));
  });

  renderAgent(agents.find(a => a.name === user.agents[0]), user);
});
