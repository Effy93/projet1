import { auth } from "../model/user.js";

export function renderAgent(agent, user) {
  const buyBtn = document.getElementById("agent-link");
  const purchaseMessage = document.getElementById("purchase-message");
  const agentImg = document.getElementById("agent-img");
  const agentName = document.getElementById("agent-name");
  const agentDesc = document.getElementById("agent-desc");
  const agentCard = document.getElementById("agent-card");

  if (agentImg) {
    agentImg.src = agent.img;
    agentImg.alt = agent.name;
  }

  if (agentName) agentName.textContent = agent.name;
  if (agentDesc) agentDesc.textContent = agent.desc;
  if (agentCard) agentCard.style.borderTop = `5px solid ${agent.color}`;
  if (purchaseMessage) purchaseMessage.textContent = "";

  if (buyBtn) {
    buyBtn.dataset.agent = agent.name;
    buyBtn.style.backgroundColor = agent.color;

    // Pas connecté
    if (!auth.isAuthenticated()) {
      buyBtn.textContent = "Se connecter pour découvrir l’IA";
      buyBtn.disabled = false;
      buyBtn.href = "login.html";
      buyBtn.removeAttribute("data-agent"); // empêche l'achat
      return;
    }

    // Connecté
    buyBtn.href = "#";
    buyBtn.dataset.agent = agent.name;

    if (user.agents.includes(agent.name)) {
      buyBtn.textContent = "Possédé ";
      buyBtn.appendChild(document.createTextNode("✔"));
      buyBtn.disabled = true;
    } else {
      buyBtn.textContent = "Acheter";
      buyBtn.disabled = false;
    }
  }
}
