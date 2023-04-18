const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const button = document.getElementById("submit");
const registerUrl =
  "https://64244be047401740433818a7.mockapi.io/users-register";

button.addEventListener("click", function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // Fetch user data from register API
  fetch(registerUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Filter user data by email and password
      const user = data.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        // User is authenticated, redirect to homepage
        window.location.href = "/mainpage/mainpage.html";
      } else {
        // User is not authenticated, show error message
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
      }
    })
    .catch((error) => {
      // Handle the error appropriately
      console.error("Error:", error);
    });
});
