const baseUrl = "http://127.0.0.1:8000/api/auth";

// get block list api
const getBlockUrl = baseUrl + "/get_blocked";

axios.get().then(myData => {
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
        interestBtn.setAttribute('id', `interested-in-${id}`);
        interestBtn.textContent = "Interested";

        divPost.appendChild(imgWrapper);
        divPost.appendChild(postTextContainer);
        divPost.appendChild(interestBtn);


        landingMain.appendChild(divPost);
    }
}).catch(() => {
    window.location.href = "http://192.168.56.1:5501/frontend/";
});