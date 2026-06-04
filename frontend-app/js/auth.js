// ajusta dinamicamente a API_URL dependendo do ambiente localhost ou produção
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : window.location.origin.replace("-80.", "-3000.");

const signin = document.getElementById("signin");
const signup = document.getElementById("signup");

// Alternar entre telas
document.getElementById("goSignup").addEventListener("click", () => {
  signin.classList.add("hidden");
  signup.classList.remove("hidden");
});

document.getElementById("goSignin").addEventListener("click", () => {
  signup.classList.add("hidden");
  signin.classList.remove("hidden");
});

// SIGN IN
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  try {
    const response = await fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      localStorage.setItem("accessToken", data.accessToken);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Email ou senha inválidos.");
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor.");
  }
});

// SIGN UP
document.getElementById("registerBtn").addEventListener("click", async () => {
  const nome = document.getElementById("registerNome").value;
  const email = document.getElementById("registerEmail").value;
  const senha = document.getElementById("registerSenha").value;
  const confirmarSenha = document.getElementById(
    "registerConfirmarSenha",
  ).value;

  try {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        email,
        senha,
        confirmarSenha,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Conta criada com sucesso!");

      signup.classList.add("hidden");
      signin.classList.remove("hidden");
    } else {
      if (Array.isArray(data.message)) {
        alert(data.message.join("\n"));
      } else {
        alert(data.message || "Erro ao criar conta.");
      }
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar.");
  }
});
