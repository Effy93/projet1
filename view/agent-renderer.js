export function renderAgent(agent, user) {
  const buyBtn = document.getElementById("agent-link");
  const purchaseMessage = document.getElementById("purchase-message");
  const agentImg = document.getElementById("agent-img");
  const agentName = document.getElementById("agent-name");
  const agentDesc = document.getElementById("agent-desc");
  const agentCard = document.getElementById("agent-card");

  if (!agentImg || !agentName || !agentDesc || !agentCard || !buyBtn) return;

  agentImg.src = agent.img;
  agentImg.alt = agent.name;
  agentName.textContent = agent.name;
  agentDesc.textContent = agent.desc;
  agentCard.style.borderTop = `5px solid ${agent.color}`;

  buyBtn.dataset.agent = agent.name;
  buyBtn.style.backgroundColor = agent.color;
  purchaseMessage.textContent = "";

  // Pas connecté
  if (!user) {
    buyBtn.textContent = "Se connecter pour acheter";
    buyBtn.disabled = false;
    buyBtn.href = "login.html";
    buyBtn.removeAttribute("data-agent"); // empêche l'achat
    return;
  }

  // Connecté
  buyBtn.href = "#";
  buyBtn.dataset.agent = agent.name;

  if  (user.agents.includes(agent.name)) {
    buyBtn.textContent = "Possédé ✔";
    buyBtn.disabled = true;
  } else {
  buyBtn.textContent = "Acheter";
  buyBtn.disabled = false;
  }

}
// agent-renderer.js : fonction pour afficher les détails d'un agent IA dans l'interface utilisateur