document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", e => {

    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelector('input[type="password"]');

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    fetch("user.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("No se pudo cargar user.json");
        }
        return res.json();
      })
      .then(users => {
        const user = users.find(
          u => u.email === email && u.password === password
        );

        if (user) {
          console.log("Login correcto:", user);
          window.location.href = "main.html"; 
        } else {
          alert("Email o contraseña incorrectos");
        }
      })
      .catch(err => {
        console.error("Error en login:", err);
        alert("Error cargando usuarios");
      });
  });
});