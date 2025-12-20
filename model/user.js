export const auth = {
  register(name, email, password) {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    if (data.find(u => u.email === email)) return { success: false, message: "Utilisateur existe déjà" };
    data.push({ name, email, password, agents: [] });
    localStorage.setItem("users", JSON.stringify(data));
    return { success: true };
  },

  login(email, password) {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    const user = data.find(u => u.email === email && u.password === password);
    if (!user) return { success: false, message: "Email ou mot de passe incorrect" };
    localStorage.setItem("loggedEmail", email);
    return { success: true };
  },

  logout() {
    localStorage.removeItem("loggedEmail");
  },

  getUser() {
    const email = localStorage.getItem("loggedEmail");
    const data = JSON.parse(localStorage.getItem("users")) || [];
    return data.find(u => u.email === email);
  },

  saveUser(user) {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    const idx = data.findIndex(u => u.email === user.email);
    if (idx > -1) data[idx] = user;
    localStorage.setItem("users", JSON.stringify(data));
  },

  isAuthenticated() {
    return !!localStorage.getItem("loggedEmail");
  }
};
