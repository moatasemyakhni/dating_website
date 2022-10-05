const logoutUrl = "http://127.0.0.1:8000/api/auth/logout";
const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    axios.get(logoutUrl, config).then((data) => {
        localStorage.removeItem('userToken');
        window.location.href = "http://192.168.56.1:5501/frontend/";
    }).catch(() => {
        window.location.href = "http://192.168.56.1:5501/frontend/";
    });
})