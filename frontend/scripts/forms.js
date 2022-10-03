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
const signUpUrl = formsBaseUrl + "/register";
const fullName = document.getElementById('full-name');
const maleGender = document.getElementById('male-gender');
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
const errMessage = document.getElementById('error-msg');

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let interestGender = "";
    if(!fullName.value || (!femaleGender.checked && !maleGender.checked) || !age.value || !signupEmail.value || !signupPassword.value || !passwordRepeat.value || country.value==="noCountry" || city.value==="noCity" || (!interestMale.checked && !interestFemale.checked)) {
        errMessage.textContent = "Required Field";
        errMessage.classList.remove('view-none');
        return;
    }

    if(!nameValidation(fullName.value)) {
        errMessage.textContent = "name is between 5 and 50 chars";
        errMessage.classList.remove('view-none');
        return;
    }

    if(!emailValidation(signupEmail.value)) {
        errMessage.textContent = "email format is not valid";
        errMessage.classList.remove('view-none');
        return;
    }

    if(!passwordValidation(signupPassword.value)) {
        errMessage.textContent = "Password is at least 6 chars";
        errMessage.classList.remove('view-none');
        return;
    }
    if(signupPassword.value !== passwordRepeat.value) {
        errMessage.textContent = "Passwords don't match";
        errMessage.classList.remove('view-none');
        return;
    }
    let biography;
    if(!bio.value) {
        biography = null;
    }else {
        biography = bio.value;
    }
    let gender;
    if(maleGender.checked) {
        gender = maleGender.value;
    }else {
        gender = femaleGender.value;
    }
    if(interestMale.checked)
        interestGender += interestMale.value;
    if(interestFemale.checked)
        interestGender += interestFemale.value;
    
    const formData = new FormData();
    formData.append('email', signupEmail.value);
    const checkEmail = baseUrl + "/check_email";
    axios.post(checkEmail, formData).then(resp => {
        if(!resp.data.available) {
            errMessage.textContent = "Email is taken";
            errMessage.classList.remove('view-none');
            return
        }
        
        errMessage.classList.add('view-none');
        formData.append('gender_id', gender);
        formData.append('full_name', fullName.value);
        formData.append('age', age.value);
        formData.append('location', citySelector.value);
        formData.append('bio', biography);
        formData.append('interested', interestGender);
    
        if(!profilePhoto.files['length'] <= 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const photo = reader.result;
                formData.append('profile_picture', photo);
    
                axios.post(signUpUrl, formData).then(response => {
                    const data = response.data;
                    localStorage.setItem('userToken', data.token.original.access_token);
                })
            });
            reader.readAsDataURL(profilePhoto.files[0]);
        }else {
            formData.append('profile_picture', null);
    
            axios.post(signUpUrl, formData).then(response => {
                const data = response.data;
                console.log(data.token.original.access_token);
                localStorage.setItem('userToken', data.token.access_token);
            });
        }
    });
    
});

const nameValidation = (name) => {
    const exp = /^[A-Za-z\s]{5,255}$/
    if(name.length < 5 || name.length > 255) {
        return false
    }else if(!name.match(exp)) {
        return false
    }

    return true
}

const emailValidation = (email) => {
    const exp = /^(\w([\.-]?\w)*)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!email.match(exp)) {
        return false
    }

    return true
}

const passwordValidation = (password) => {
    if(password.length < 6) {
        return false
    }

    return true
}
