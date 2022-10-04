const baseUrl = "http://127.0.0.1:8000/api";
const landingMain = document.getElementById('landing-main');

const getAllUrl = baseUrl + "/hey";
axios.get(getAllUrl).then(resp => {
    const d = resp.data;
    console.log(d);
    d.forEach(user => {
        createPost(user.id, 'http://localhost/9-sefactory/dating_web/dating_website/backend/storage/app/images/userJohn3_1664723095.jpeg', user.full_name, user.age, user.location, 4);
    });

});


const createPost = (id, img, name, age, loc, distance) => {
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
            const locPar = document.createElement('p');
            locPar.textContent = "Location: ";
                const actLocation = document.createElement('span');
                actLocation.setAttribute('id', `location-${id}`);
                actLocation.textContent = loc;
            locPar.appendChild(actLocation);

            const distPar = document.createElement('p');
            distPar.textContent = "Distance: ";
                const actDistance = document.createElement('span');
                actDistance.setAttribute('id', `distance-${id}`);
                actDistance.textContent = distance;
            distPar.appendChild(actDistance);
        textContent2.appendChild(locPar);
        textContent2.appendChild(distPar);
    
    postTextContainer.appendChild(textContent1);
    postTextContainer.appendChild(textContent2);

    divPost.appendChild(imgWrapper);
    divPost.appendChild(postTextContainer);

    landingMain.appendChild(divPost);
}