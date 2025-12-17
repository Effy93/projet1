const formRegister = document.getElementById("registerForm");
const errorRegister = document.getElementById("error");

if (formRegister) {
  formRegister.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm_email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    // vérifie que les emails correspondent
    if (email !== confirmEmail) {
      errorRegister.textContent = "Les adresses email ne correspondent pas !";
      return;
    }
    // vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      errorRegister.textContent = "Les mots de passe ne correspondent pas !";
      return;
    } 
   
    // récupère l'utilisateur existant
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === email) {
      errorRegister.textContent = "Cet utilisateur existe déjà !";
      return;
    }

    // sinon on enregistre
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Inscription réussie !");
    window.location.href = "login.html";
  });
}
