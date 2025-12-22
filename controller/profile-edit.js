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

    const newName = nameInput.value.trim();
    const newEmail = emailInput.value.trim();

    // Récupérer tous les utilisateurs
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier si le nouvel email est déjà utilisé par un autre
    const emailExistant = users.find(u => u.email === newEmail && u.email !== user.email);
    if (emailExistant) {
      return alert("Cet email est déjà utilisé !");
    }

    // Mettre à jour l’utilisateur
    user.name = newName;
    user.email = newEmail;

    const index = users.findIndex(u => u.email === user.email || u === user);
    users[index] = user;

    // Sauvegarder dans localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedEmail", newEmail); // si l'email change

    alert("Profil mis à jour ✅");
    window.location.reload();
  });
});
