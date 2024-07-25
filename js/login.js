import { fetchUserData } from "./home.js"
import { logout } from "./index.js"

export function fetchLogin() {
    const login = document.getElementById('login')
    logout.style.display = 'none'
    login.addEventListener('click', () => {
        retrieveUserLogin()
    })

}

export function retrieveUserLogin() {
    const errorLogin = document.getElementById('errorLogin')
    errorLogin.style.color = "#c0392b"
    const UsernameOrMail = document.getElementById('Username')
    const PassWord = document.getElementById('Password')

    if (UsernameOrMail.value == '') {
        errorLogin.textContent = "Please enter Username or mail"
        return
    }
    if (PassWord.value == '') {
        errorLogin.textContent = "Please enter Password"
        return
    }

    GetUserToken(UsernameOrMail.value, PassWord.value)

    UsernameOrMail.value = ''
    PassWord.value = ''
}

async function encodeCredentials(usernameOrEmail, password) {
    return btoa(`${usernameOrEmail}:${password}`);
}
async function GetUserToken(UsernameOrEmail, Password) {
    let UserInfoEncode = await encodeCredentials(`${UsernameOrEmail}:${Password}`)
    console.log(`${UsernameOrEmail}:${Password}`);
    console.log(UserInfoEncode);

    try {
        const response = await fetch('https://learn.zone01dakar.sn/api/auth/signin', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${UserInfoEncode}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('invalid Credentials')
        }
          
        const data = await response.json();
        localStorage.setItem('token' ,data)
        console.log(data);
        fetchUserData(data)
    } catch (error) {
        errorLogin.textContent = error.message
        return
    }

    
}
