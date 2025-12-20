import { auth } from "../model/user.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("nav-btn-login");
  const profileBtn = document.getElementById("nav-btn-profile");
  const logoutBtn = document.getElementById("nav-btn-logout");

  if (auth.isAuthenticated()) {
    if (loginBtn) loginBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "inline";
    if (logoutBtn) logoutBtn.style.display = "inline";
  } else {
    if (loginBtn) loginBtn.style.display = "inline";
    if (profileBtn) profileBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      auth.logout();
      window.location.href = "index.html";
    });
  }
});
// header.js : gestion de la barre de navigation en fonction de l'état de connexion