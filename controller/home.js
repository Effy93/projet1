import { agents } from "../model/agents.js";
import { auth } from "../model/user.js";
import { renderAgent } from "../view/agent-renderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  renderAgent(agents[0], user); // Affiche Daïne par défaut

  const buyBtn = document.getElementById("agent-link");
  const purchaseMessage = document.getElementById("purchase-message");
  const tabs = document.querySelectorAll(".agent-tab");

  // Affiche l'agent selon l'index
  function showAgent(index) {
    if (!tabs[index]) return;
    tabs.forEach(t => t.classList.remove("active"));
    tabs[index].classList.add("active");
    renderAgent(agents[index], user);
  }

  // Ajout des événements clic sur les onglets
  tabs.forEach((tab, i) => tab.addEventListener("click", () => showAgent(i)));

  // Gestion du clic sur le bouton Acheter
buyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // PAS CONNECTÉ
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const agentName = buyBtn.dataset.agent;

  if (!user.agents.includes(agentName)) {
    user.agents.push(agentName);
    auth.saveUser(user);

    renderAgent(
      agents.find(a => a.name === agentName),
      user
    );

    purchaseMessage.textContent =
      `Vous avez bien acheté l'agent ${agentName} !`;
    purchaseMessage.style.color = "#4fc3f7";
    purchaseMessage.style.fontWeight = "bold";
  }
});


  // Toujours afficher **Daïne par défaut**, peu importe ce qui est acheté
  showAgent(0);
});
