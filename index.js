const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("passwordError");
const submitBtn = document.getElementById("submitbutton");

const registerUrl =
  "https://64244be047401740433818a7.mockapi.io/users-register";

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const nameRegex = /^[A-Z][a-z]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

  let hasError = false;

  if (!nameRegex.test(nameInput.value)) {
    nameError.style.display = "block";
    nameInput.classList.add("error");
    hasError = true;
  } else {
    nameError.style.display = "none";
    nameInput.classList.remove("error");
  }

  if (!emailRegex.test(emailInput.value)) {
    emailError.style.display = "block";
    emailInput.classList.add("error");
    hasError = true;
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("error");
  }

  if (!passwordRegex.test(passwordInput.value)) {
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    hasError = true;
  } else {
    passwordError.style.display = "none";
    passwordInput.classList.remove("error");
  }

  if (!hasError) {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const userData = { name, email, password };

    fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Do something with the response data, such as displaying a success message
        console.log(data);
        window.location.href = "/login/login.html";
      })
      .catch((error) => {
        // Handle the error appropriately
        console.error("Error:", error);
      });
  }
});

nameInput.addEventListener("input", function (e) {
  const nameRegex = /^[A-Z][a-z]*$/;
  if (!nameRegex.test(e.target.value)) {
    nameError.style.display = "block";
    nameInput.classList.add("error");
  } else {
    nameError.style.display = "none";
    nameInput.classList.remove("error");
  }
});

emailInput.addEventListener("input", function (e) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(e.target.value)) {
    emailError.style.display = "block";
    emailInput.classList.add("error");
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("error");
  }
});

passwordInput.addEventListener("input", function (e) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  passwordError.textContent = "";
  passwordError.style.display = "none";
  if (!passwordRegex.test(e.target.value)) {
    passwordError.textContent =
      "password should be 8 characters, 1 uppercase, and 1 numeric.";
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
  } else {
    passwordError.style.display = "none";
    passwordInput.classList.remove("error");
  }
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const nameRegex = /^[A-Z][a-z]$/;
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  const passwordRegex = /^(?=.[A-Z])(?=.[a-z])(?=.\d).{8,}$/;

  let hasError = false;

  if (!nameRegex.test(name)) {
    nameError.style.display = "block";
    nameInput.classList.add("error");
    hasError = true;
  } else {
    nameError.style.display = "none";
    nameInput.classList.remove("error");
  }

  if (!emailRegex.test(email)) {
    emailError.style.display = "block";
    emailInput.classList.add("error");
    hasError = true;
  } else {
    emailError.style.display = "none";
    emailInput.classList.remove("error");
  }

  if (!passwordRegex.test(password)) {
    passwordError.style.display = "block";
    passwordInput.classList.add("error");
    hasError = true;
  } else {
    passwordError.style.display = "none";
    passwordInput.classList.remove("error");
  }

  if (!hasError) {
    const userData = { name, email, password };
    fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location = "/login/login.html"; // redirect to sign-in page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
