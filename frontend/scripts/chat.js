const favSection = document.getElementById('favorite-main');
const privateSection = document.getElementById('private-chat-section');
const dmPageCaller = document.getElementById('dm-caller');

dmPageCaller.addEventListener('click', () => {
    privateSection.classList.add('view-none');
    favSection.classList.remove('view-none');
});