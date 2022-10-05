const logoutUrl = baseUrl +  "/auth/logout";
const logoutBtn = document.getElementById('logout-btn');
const config = {headers: {'Authorization': `Bearer ${localStorage.getItem('userToken')}`}};

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    axios.get(logoutUrl, config).then((data) => {
        localStorage.removeItem('userToken');
        window.location.href = "http://192.168.56.1:5501/frontend/";
    }).catch(() => {
        window.location.href = "http://192.168.56.1:5501/frontend/";
    });
});