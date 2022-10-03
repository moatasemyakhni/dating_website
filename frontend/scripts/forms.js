const signupFormCaller = document.getElementById('signup-form-caller');
const loginFormCallers = document.querySelectorAll('.login-form-caller');
const signupSection = document.getElementById('signup-section');
const loginSection = document.getElementById('login-section');


signupFormCaller.addEventListener('click', () => {
    signupSection.classList.toggle('view-hidden');
    loginSection.classList.add('view-hidden');
    loginSection.classList.remove('login-section');
    signupSection.classList.toggle('signup-section');

});

loginFormCallers.forEach(loginFormCaller => {
    loginFormCaller.addEventListener('click', () => {
        loginSection.classList.toggle('view-hidden');
        signupSection.classList.add('view-hidden');
        signupSection.classList.remove('signup-section');
        loginSection.classList.toggle('login-section');
    });
});