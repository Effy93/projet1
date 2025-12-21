import { agents } from "../model/agents.js";
import { auth } from "../model/user.js";
import { renderAgent } from "../view/agent-renderer.js";
import { setupLogout } from "./logout.js";

// Attend que le DOM soit chargé et redirige vers la page de connexion si l'utilisateur n'est pas authentifié
document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  if (!user || !auth.isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  // Gérer l'affichage du profil utilisateur et des agents IA
  // Récupère les éléments du DOM
  const userNameEl = document.getElementById("userName");
  const userEmailEl = document.getElementById("userEmail");
  const sidebar = document.querySelector(".ia-container .sidebar");
  const agentCardContainer = document.querySelector(".agent-info");
  const logoutBtn = document.getElementById("nav-btn-logout");

  // Affiche les éléments utilisateur
  if (userNameEl) userNameEl.textContent = `Bienvenue, ${user.name}!`;
  if (userEmailEl) userEmailEl.textContent = `Email : ${user.email};`;

  if (logoutBtn) {
    logoutBtn.style.display = "inline";
    setupLogout(logoutBtn);
  }

  if (!user.agents || user.agents.length === 0) {
    agentCardContainer.innerHTML = "<p>Vous n'avez aucune IA pour le moment </p>";
    return;
  }

  // Création des onglets dynamiques
  // .find => méthode JS, agentObj = objet agent dans le tableau agents
  // agentObj.name = le nom de l'agent dans CE TABLEAU (tableau pour affichage) 
  // agentName est le nom de(s) l'agent que l'utilisateur possède
  user.agents.forEach((agentName, index) => {
    const agentObj = agents.find(agentObj => agentObj.name === agentName);
    if (!agentObj) return;

    const btn = document.createElement("button");
    btn.className = "agent-tab";
    btn.dataset.agent = index;
    btn.textContent = agentObj.name;
    sidebar.appendChild(btn);

    // Active le premier onglet au chargement
    if (index === 0) {
      btn.classList.add("active");
    }

    // Clique sur l'onglet
    btn.addEventListener("click", () => {
      // Supprime l'active de tous les boutons
      const allTabs = sidebar.querySelectorAll(".agent-tab");
      allTabs.forEach(tab => tab.classList.remove("active"));

      // Active celui cliqué
      btn.classList.add("active");

      // Affiche la carte correspondante
      renderAgent(agentObj, user);
    });
  });

  // Affiche la première IA au chargement
  renderAgent(agents.find(agentObj => agentObj.name === user.agents[0]), user);
});
