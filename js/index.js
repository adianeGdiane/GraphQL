import { fetchUserData } from "./home.js";
import { fetchLogin } from "./login.js";
import { LogoutHandle } from "./logout.js";
import { homeHtml, loginHtml } from "./templates.js";
export const container = document.getElementById('container')
export const logout = document.getElementById('logout')

container.innerHTML = loginHtml

fetchLogin()

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