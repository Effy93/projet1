import { auth } from "../model/user.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = auth.getUser();
  if (!user) return;

  const editBtn = document.getElementById("editProfileBtn");
  const form = document.getElementById("editProfileForm");
  const nameInput = document.getElementById("editName");
  const emailInput = document.getElementById("editEmail");

  if (!editBtn || !form) return;

  // Pré-remplir le formulaire
  nameInput.value = user.name;
  emailInput.value = user.email;

  // Afficher / cacher le formulaire
  editBtn.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  // Soumission du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    user.name = nameInput.value.trim();
    user.email = emailInput.value.trim();

    auth.saveUser(user);

    alert("Profil mis à jour ✅");
    window.location.reload();
  });
});
