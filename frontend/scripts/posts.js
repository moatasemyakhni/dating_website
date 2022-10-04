const landingMain = document.getElementById('landing-main');

const createPost = (id, name, age, loc, distance) => {
    const divPost = document.createElement('div');
    divPost.setAttribute('class', 'post');

    const imgWrapper = document.createElement('div');
    imgWrapper.setAttribute('class', 'post-img');
    imgWrapper.setAttribute('id', `post-img-${id}`);
    
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
}