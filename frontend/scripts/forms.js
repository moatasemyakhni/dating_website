const signupFormCaller = document.getElementById('signup-form-caller');
const signupSection = document.getElementById('signup-section');
const loginSection = document.getElementById('login-section');
signupFormCaller.addEventListener('click', () => {
    signupSection.classList.toggle('view-hidden');
    loginSection.classList.add('view-hidden');
    signupSection.classList.toggle('signup-section');

});