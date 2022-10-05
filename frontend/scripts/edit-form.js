const editUrl = baseUrl +  "/auth/edit";
const myInfoUrl = baseUrl + "/auth/me";
const config = {headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}};
axios.get(myInfoUrl, config).then(myData => {

    console.log(myData.data);
    const fullName = document.getElementById('full-name');
    const maleGender = document.getElementById('male-gender');
    const femaleGender = document.getElementById('female-gender');
    const age = document.getElementById('age');
    const country = document.getElementById('country-selector');
    const city = document.getElementById('city-selector');
    const interestMale = document.getElementById('male-gender-interest');
    const interestFemale = document.getElementById('female-gender-interest');
    const bio = document.getElementById('bio');
    const profilePhoto = document.getElementById('profile-photo');
    const signupBtn = document.getElementById('signup-submit-btn');
    const errMessage = document.getElementById('signup-error-msg');

    e.preventDefault();
    let interestGender = "";
    if(!fullName.value || (!femaleGender.checked && !maleGender.checked) || !age.value || !signupEmail.value || !signupPassword.value || !passwordRepeat.value || country.value==="noCountry" || city.value==="noCity" || (!interestMale.checked && !interestFemale.checked)) {
        errMessage.textContent = "Required Field";
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

    const nameValidation = (name) => {
        const exp = /^[A-Za-z\s]{5,255}$/
        if(name.length < 5 || name.length > 255) {
            return false
        }else if(!name.match(exp)) {
            return false
        }

        return true
    }
});