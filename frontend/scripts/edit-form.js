const baseUrl = "http://127.0.0.1:8000/api/auth";
const editUrl = baseUrl +  "/edit";
const myInfoUrl = baseUrl + "/me";
const config = {headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}};
axios.get(myInfoUrl, config).then(myData => {

    const user = myData.data;
    const fullName = document.getElementById('full-name');
    const maleGender = document.getElementById('male-gender');
    const femaleGender = document.getElementById('female-gender');
    const age = document.getElementById('age');
    const interestMale = document.getElementById('male-gender-interest');
    const interestFemale = document.getElementById('female-gender-interest');
    const bio = document.getElementById('bio');
    const profilePhoto = document.getElementById('profile-photo');
    const updateBtn = document.getElementById('update-submit-btn');
    const errMessage = document.getElementById('signup-error-msg');

    //assign old values
    fullName.value = user.full_name;
    if(user.gender_id == 1) {
        femaleGender.setAttribute('checked', true);
    }else {
        maleGender.setAttribute('checked', true);
    }
    age.value = user.age;
    const interestedInUrl = baseUrl + "/user_interested_in";
    axios.get(interestedInUrl, config).then(s => {
        let sum = s.data.sum;
        if(sum == 1)
            interestFemale.setAttribute('checked', true);
        else if(sum == 2)
        interestMale.setAttribute('checked', true);
        else if(sum == 3) {
            interestMale.setAttribute('checked', true);
            interestFemale.setAttribute('checked', true);
        }
    });

    bio.value = user.bio;
    document.getElementById('update-img').src = user.profile_picture;

    // update
    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let interestGender = "";
        if(!fullName.value || (!femaleGender.checked && !maleGender.checked) || !age.value || (!interestMale.checked && !interestFemale.checked)) {
            errMessage.textContent = "Required Field";
            errMessage.classList.remove('view-none');
            return;
        }
        if(!nameValidation(fullName.value)) {
            errMessage.textContent = "name is between 5 and 50 chars";
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
        formData.append('gender_id', gender);
        formData.append('full_name', fullName.value);
        formData.append('age', age.value);
        formData.append('bio', biography);
        formData.append('interested', interestGender);
        if(profilePhoto.files['length'] > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const photo = reader.result;
                formData.append('profile_picture', photo);
                axios.post(editUrl, formData, config).then(() => {
                });
            });
            reader.readAsDataURL(profilePhoto.files[0]);
        }else{ 
            axios.post(editUrl, formData, config).then(() => {
            });
        }
    });
    const nameValidation = (name) => {
        const exp = /^[A-Za-z\s]{5,255}$/;
        if(name.length < 5 || name.length > 255) {
            return false;
        }else if(!name.match(exp)) {
            return false;
        }

        return true;
    }
}).catch(() => {
    // no auth no access
    window.location.href = "http://192.168.56.1:5501/frontend/landing_page.html";
});