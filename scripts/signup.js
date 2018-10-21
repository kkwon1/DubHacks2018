function trySignUp() {
    var username =  document.getElementById("username_input").value;
    var email =  document.getElementById("email_input").value;
    var password = document.getElementById("password_input").value;
    var confirm = document.getElementById("confirm_password_input").value;

    if (!checkValidField(username)) {
        return;
    } 
    if (!checkValidField(email)) {
        return;
    } 
    if (!checkValidField(password)) {
        return;
    } 
    if (!checkValidField(confirm)) {
        return;
    } 

    if (password !== confirm) {
        alert("Passwords do not match");
        return;
    }


}

function checkValidField(field) {
    if (field.trim() === "") {
        alert("You cannot have empty fields");
        return false;
    }
    return true
}