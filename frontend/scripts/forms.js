// call the forms
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

// take forms info
const formsBaseUrl = baseUrl + "/auth";

// signup info
const fullName = document.getElementById('male-gender');
const femaleGender = document.getElementById('female-gender');
const age = document.getElementById('age');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const passwordRepeat = document.getElementById('password-repeat');
const country = document.getElementById('country-selector');
const city = document.getElementById('city-selector');
const interestMale = document.getElementById('male-gender-interest');
const interestFemale = document.getElementById('female-gender-interest');
const bio = document.getElementById('bio');
const profilePhoto = document.getElementById('profile-photo');
const signupBtn = document.getElementById('signup-submit-btn');
