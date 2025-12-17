// INSCRIPTION
function register(email, password) {
  localStorage.setItem("user", JSON.stringify({ email, password }));
}

// CONNEXION
function login(email, password) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return false;

  if (email === user.email && password === user.password) {
    localStorage.setItem("isLogged", "true");
    return true;
  }

  return false;
}

// AUTH CHECK
function isAuthenticated() {
  return localStorage.getItem("isLogged") === "true";
}

// LOGOUT
function logout() {
  localStorage.removeItem("isLogged");
}
