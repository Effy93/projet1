document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  const sidebar = document.querySelector(".ia-container .sidebar");
  const agentCardContainer = document.querySelector(".agent-info");
  
  if (!user.agents || user.agents.length === 0) {
    agentCardContainer.innerHTML = "<p>Vous n'avez aucune IA pour le moment </p>";
    return;
  }

  // Créer boutons pour chaque IA possédée
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

  // Afficher la première IA par défaut
  renderAgent(agents.find(a => a.name === user.agents[0]), user);
});
