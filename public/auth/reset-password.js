// will lead me
const urlParams = new URLSearchParams(window.location.search);

const token = urlParams.get("token");
document.getElementById("token").value = token;

document
  .getElementById("reset-password-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById("new-password").value; //locate text field new password and taking user input(get the new paswd the user wrote)
    const messageElement = document.getElementById("message");

    try {
      const response = await fetch(
        `http://localhost:3000/v1/auth/reset-password`,
        {
          //send a request for password reset ans see if it's actually reset the password
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, passwordResetToken: token }),
        }
      );

      if (response.ok) {
        messageElement.textContent =
          "Password reset successfully. You can now login with your new password.";
        messageElement.style.color = "green";
      } else {
        const errorData = await response.json();
        messageElement.textContent =
          errorData.message || "An error occurred. Please try again.";
        messageElement.style.color = "red";
      }
    } catch (error) {
      messageElement.textContent = "An error occurred. Please try again.";
      messageElement.style.color = "red";
    }
  });
