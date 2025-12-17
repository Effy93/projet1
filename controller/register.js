const formRegister = document.getElementById("registerForm");
const errorRegister = document.getElementById("error");

if (formRegister) {
  formRegister.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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
