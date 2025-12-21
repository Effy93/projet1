import { auth } from "../model/user.js";

export function setupLogout(logoutBtn) {
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (!confirmLogout) return;

    auth.logout();
    window.location.href = "index.html";
  });
}
