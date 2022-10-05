const favSection = document.getElementById('favorite-main');
const privateSection = document.getElementById('private-chat-section');
const dmPageCaller = document.getElementById('dm-caller');
const msgs = document.querySelector('.messages');
dmPageCaller.addEventListener('click', () => {
    privateSection.classList.add('view-none');
    favSection.classList.remove('view-none');
});

const createChatMessage = (id, img, fullName, timeDiff, content) => {
    const messageDiv = document.createElement('div');
    messageDiv.setAttribute('class', 'message');
        const headerMessageDiv = document.createElement('div');
        headerMessageDiv.setAttribute('class', 'header-message');
            const imgMessage = document.createElement('div');
            imgMessage.setAttribute('class', `img-message img-header-${id}`);
            imgMessage.style.backgroundImage = `url("${img}")`;

            const name = document.createElement('p');
            name.textContent = fullName;

            const sinceWhenMessageSent = document.createElement('p');
            sinceWhenMessageSent.setAttribute('class', 'small');
            sinceWhenMessageSent.textContent = timeDiff;
        headerMessageDiv.appendChild(imgMessage);
        headerMessageDiv.appendChild(name);
        headerMessageDiv.appendChild(sinceWhenMessageSent);

        const bodyMessageDiv = document.createElement('div');
        bodyMessageDiv.setAttribute('class', 'body-message');
            const bodyContent = document.createElement('p');
            bodyContent.textContent = content;
        bodyMessageDiv.appendChild(bodyContent);
    
    messageDiv.appendChild(headerMessageDiv);
    messageDiv.appendChild(bodyMessageDiv);

    msgs.appendChild(messageDiv);

}
