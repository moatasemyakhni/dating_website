const baseUrl = "http://127.0.0.1:8000/api/auth";
const userInfoUrl = baseUrl+"/me";
const config = {headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}};
// get block list api
const getBlockUrl = baseUrl + "/get_blocked";
const removeBlockUrl = baseUrl + "/remove_block";
axios.get(userInfoUrl, config).then(myData => {
    const myInfo = myData.data;
    const lonLat = myInfo.location.split('@')[1];
    const myLon = parseFloat(lonLat.split(',')[0]);
    const myLat = parseFloat(lonLat.split(',')[1]);
    const landingMain = document.getElementById('landing-main');

    axios.get(getBlockUrl, config).then(resp => {
        const d = resp.data;
        const allUsers = [];
        Object.values(d).forEach(user => {
            const arr = user.location.split('@')[1];
            const lon = parseFloat(arr.split(',')[0]);
            const lat = parseFloat(arr.split(',')[1]);
            const distance = getDistance(myLon, myLat, lon, lat);
            allUsers.push({"id": user.id, "profile_picture": user.profile_picture, "full_name": user.full_name, "age": user.age, "bio": user.bio, "distance": distance});
        });
        allUsers.forEach(user => createPost(user.id, user.profile_picture, user.full_name, user.age, user.bio, user.distance));
        allUsers.forEach(user => {
            const interestedBtn = document.getElementById(`unblock-${user.id}`);
            interestedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const dataForm = new FormData();
                dataForm.append('blocked_id', user.id);
                axios.post(removeBlockUrl, dataForm, config);
                const posts = document.querySelectorAll('.post');
                posts.forEach(post => {
                    if(post.lastChild.id == `unblock-${user.id}`) {
                        post.classList.add('view-none');
                    }
                });

            });
        });
        
    })

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // km
        const dLat = toRad(lat2-lat1);
        const dLon = toRad(lon2-lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);
    
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c;
        return d.toFixed(2);
    }

    const toRad = (value) => {
        return value * Math.PI / 180;
    }

    const createPost = (id, img, name, age, bio, distance) => {
        const divPost = document.createElement('div');
        divPost.setAttribute('class', 'post');

        const imgWrapper = document.createElement('div');
        imgWrapper.setAttribute('class', 'post-img');
        imgWrapper.setAttribute('id', `post-img-${id}`);
        imgWrapper.style.backgroundImage = `url(${img})`;
        
        const postTextContainer = document.createElement('div');
        postTextContainer.setAttribute('class', 'post-text-container');
            const textContent1 = document.createElement('div');
            textContent1.setAttribute('class', 'text-content');
                const namePar = document.createElement('p');
                namePar.textContent = "Name: ";
                    const actName = document.createElement('span');
                    actName.setAttribute('id', `name-${id}`);
                    actName.textContent = name;
                namePar.appendChild(actName);

                const agePar = document.createElement('p');
                agePar.textContent = "Age: ";
                    const actAge = document.createElement('span');
                    actAge.setAttribute('id', `age-${id}`);
                    actAge.textContent = age;
                agePar.appendChild(actAge);
            textContent1.appendChild(namePar);
            textContent1.appendChild(agePar);

            const textContent2 = document.createElement('div');
            textContent2.setAttribute('class', 'text-content');
                const bioPar = document.createElement('p');
                bioPar.textContent = "Bio: ";
                    const actBio = document.createElement('span');
                    actBio.setAttribute('id', `bio-${id}`);
                    actBio.textContent = bio;
                bioPar.appendChild(actBio);

                const distPar = document.createElement('p');
                distPar.textContent = "Distance: ";
                    const actDistance = document.createElement('span');
                    actDistance.setAttribute('id', `distance-${id}`);
                    actDistance.textContent = distance + " Km";
                distPar.appendChild(actDistance);
            textContent2.appendChild(bioPar);
            textContent2.appendChild(distPar);
        
        postTextContainer.appendChild(textContent1);
        postTextContainer.appendChild(textContent2);
        
        const interestBtn = document.createElement('button');
        interestBtn.setAttribute('class', 'btn btn-hero btn-interest');
        interestBtn.setAttribute('id', `unblock-${id}`);
        interestBtn.textContent = "Unblock";

        divPost.appendChild(imgWrapper);
        divPost.appendChild(postTextContainer);
        divPost.appendChild(interestBtn);


        landingMain.appendChild(divPost);
    }
}).catch(() => {
    window.location.href = "http://192.168.56.1:5501/frontend/";
});