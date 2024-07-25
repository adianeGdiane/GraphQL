import { fetchUserData } from "./home.js";
import { fetchLogin } from "./login.js";
import { LogoutHandle } from "./logout.js";
import { homeHtml, loginHtml } from "./templates.js";
export const container = document.getElementById('container')
export const logout = document.getElementById('logout')
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

export let routes = {
    "/": loginHtml,
    "/home": homeHtml,
}

// update the path into url and fetch html corresponding contains in the div
export const handleLocation = async () => {
    const path = window.location.pathname;
    let route = routes[path]
    if (!route) {
        console.log('errrorr');
        return
    }
    if ((path == '/')) {
        container.innerHTML = route
        fetchLogin()
    }
    const html = route;
    document.getElementById("container").innerHTML = html
};
//window.onpopstate = handleLocation;
window.route = route;
handleLocation();

window.onload = () => {
    const token = localStorage.getItem('token');
    if (token) {
        fetchUserData(token);
    } else {
        fetchLogin()
    }
};

logout.addEventListener('click', ()=>{
    LogoutHandle()
})