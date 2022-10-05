
const baseUrl = "http://127.0.0.1:8000/api/auth";
const getFavorite = baseUrl + "/user_interest_list";
const userInfoUrl = baseUrl+"/me";
const favoriteMain = document.getElementById('favorite-main');
const navbarProfile = document.getElementById('navbar-profile');
const config = {headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}};
// get user info from token
axios.get(userInfoUrl, config).then(resp => {
    // change profile picture to his profile picture
    navbarProfile.style.backgroundImage = `url('${resp.data.profile_picture}')`;
    // get user lon and lat to measure the distance later with other users
    const lonLat = resp.data.location.split('@')[1];
    const myLon = parseFloat(lonLat.split(',')[0]);
    const myLat = parseFloat(lonLat.split(',')[1]);

    // get the favorite users of user
    axios.get(getFavorite , config).then(data => {
        const allUsers = [];
        data.data.forEach(element => {
            const arr = element.location.split('@')[1];
            const lon = parseFloat(arr.split(',')[0]);
            const lat = parseFloat(arr.split(',')[1]);
            const distance = getDistance(myLon, myLat, lon, lat);
            allUsers.push({"id": element.id, "profile_picture": element.profile_picture, "full_name": element.full_name, "age": element.age, "bio": element.bio, "distance": distance});
        });
        allUsers.sort((a, b) => a.distance - b.distance);
        allUsers.forEach(user => createPost(user.id, user.profile_picture, user.full_name, user.age, user.bio, user.distance));
        //go to chat api
        const getMessageUrl = baseUrl + "/get_chat";
        // block api
        const blockUrl = baseUrl + "/block";
        allUsers.forEach(user => {
            const blockBtn = document.getElementById(`block-${user.id}`);
            const chatBtn = document.getElementById(`chat-with-${user.id}`);
            const formData = new FormData();
            formData.append('blocked_id', user.id);
            chatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                favSection.classList.add('view-none');
                privateSection.classList.remove('view-none');
                const dataForm = new FormData();
                dataForm.append('receiver_id', chatBtn.id.split('-')[2]);

                axios.post(getMessageUrl, dataForm, config).then(ds => console.log(ds));
            });

            blockBtn.addEventListener('click', (e) => {
                e.preventDefault();
                axios.post(blockUrl, formData, config).then(() => {
                    const posts = document.querySelectorAll('.post');
                    posts.forEach(post => {
                        // blocked cannot be shown again
                        if(post.lastChild.lastChild.id == `block-${user.id}`) {
                            post.classList.add('view-none');
                        }
                    });
                });
            });
        });
    });


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
        interestBtn.setAttribute('class', 'btn btn-hero btn-interest chats');
        interestBtn.setAttribute('id', `chat-with-${id}`);
        interestBtn.textContent = "Chat";

        const blockBtn = document.createElement('button');
        blockBtn.setAttribute('class', 'btn btn-hero btn-interest');
        blockBtn.setAttribute('id', `block-${id}`);
        blockBtn.textContent = "blocked";

        const btnWrapper = document.createElement('div');
        btnWrapper.setAttribute('class', 'btn-wrapper');

        btnWrapper.appendChild(interestBtn);
        btnWrapper.appendChild(blockBtn);
        divPost.appendChild(imgWrapper);
        divPost.appendChild(postTextContainer);
        divPost.appendChild(btnWrapper);


        favoriteMain.appendChild(divPost);
    }
}).catch(() => {
    window.location.href = "http://192.168.56.1:5501/frontend/";
});