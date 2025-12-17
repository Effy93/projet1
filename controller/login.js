const formLogin = document.getElementById("loginForm");
const errorLogin = document.getElementById("error");

if (formLogin) {
  formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      errorLogin.textContent = "Aucun utilisateur inscrit !";
      return;
    }

    if (email === user.email && password === user.password) {
      alert("Connexion réussie !");
      window.location.href = "profile.html";
    } else {
      errorLogin.textContent = "Email ou mot de passe incorrect";
    }
  });
}
