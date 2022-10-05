const favSection = document.getElementById('favorite-main');
const privateSection = document.getElementById('private-chat-section');
const dmPageCaller = document.getElementById('dm-caller');
const getMessageUrl = baseUrl + "/get_chat";

const chats = document.querySelectorAll('.chats');

chats.forEach(chat => {
    chat.addEventListener('click', () => {
        const receiverID = chat.id.split('-')[-1];
        favSection.classList.add('view-none');
        privateSection.classList.remove('view-none');

        const dataForm = new FormData();
        dataForm.append('receiver_id', receiverID);

        axios.post(getMessageUrl, dataForm, config).then(data => console.log(data));
    });
});


dmPageCaller.addEventListener('click', () => {
    privateSection.classList.add('view-none');
    favSection.classList.remove('view-none');
});