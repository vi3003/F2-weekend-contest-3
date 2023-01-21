document.querySelector("form").addEventListener("submit", SignupForm);
const nameRegex = /^[\w]{2,}.*\S[A-Za-z]$/;
const emailRgex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&])/;
var userDetails = JSON.parse(localStorage.getItem("Signupdetails")) || [];
function SignupForm(e) {
  e.preventDefault();
  document.getElementById("Email").textContent = "";
  document.getElementById("Password").textContent = "";
  document.getElementById("Confirm").textContent = "";
  document.getElementById("Confirm_err").textContent = "";
  let name = document.querySelector("#name").value;
  let emailID = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let confirmpassword = document.querySelector("#confirm_password").value;
  if (
    name.length >= 2 &&
    nameRegex.test(name) &&
    emailRgex.test(emailID) &&
    passwordRegex.test(password) &&
    password != name &&
    password != emailID &&
    password == confirmpassword
  ) {
    let isUserExists = false;
    for (let i = 0; i < userDetails.length; i++) {
      if (userDetails[i].email == emailID) {
        document.getElementById("userExists").textContent =
          "Email ID already exists! Please ";
        document.getElementById("userExists").style.color = "red";
        let loginLink = document.createElement("a");
        loginLink.setAttribute("href", "./loginPage.html");
        loginLink.textContent = "Login";
        document.getElementById("userExists").append(loginLink);
        isUserExists = true;
        break;
      }
    }
    if (isUserExists == false) {
      var signupobj = {
        id: userDetails.length + 1,
        username: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        confirmpassword: document.querySelector("#confirmpassword").value,
      };
      userDetails.push(signupobj);
      localStorage.setItem("Signupdetails", JSON.stringify(userDetails));
      document.querySelector("form").reset();
      window.location.href = "./loginPage.html";
    }
  } else {
    if (!nameRegex.test(name)) {
      document.getElementById("Email").textContent =
        "Name should contain atleast 2 letters";
      document.getElementById("Email").style.color = "red";
    } else if (!emailRgex.test(emailID)) {
      document.getElementById("Password").textContent =
        "Please include @ symbol followed by domain name";
      document.getElementById("Password").style.color = "red";
    } else if (!pwdRegex.test(password) || password == name || password == emailID) {
      document.getElementById("Password").textContent =
        "Passwords should have at least 1 capital letter, 1 small, 1 number and 1 special characters,and password cannot be the same as name or email";
      document.getElementById("Password").style.color = "red";
    } else if (password != confirmpassword) {
      document.getElementById("Confirm").textContent =
        "Password doesn't match with confirmed password";
      document.getElementById("Confirm").style.color = "red";
    }
  }
}