import { getGraphData } from "./graphs.js";
import { container, logout } from "./index.js";
import { fetchLogin } from "./login.js";
import { homeHtml, loginHtml } from "./templates.js";
import { queryUser } from "./userQuery.js";

export async function fetchUserData(token) {
  try {
    const response = await fetch('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: queryUser })
    });
  
    if (!response.ok) {
      throw new Error('error fetching Data...')
    }
  
    const result = await response.json();
    console.log(result);
    displayData(result.data)
  } catch (error) {
      localStorage.removeItem('token')
      container.innerHTML = loginHtml
      const errorLogin = document.getElementById('errorLogin')
      errorLogin.textContent = 'Sorry Something Wrong Happened:('
      fetchLogin()
  }

}

function displayData(user) {
  logout.style.display = 'flex'
  container.innerHTML = homeHtml
  const data = user.user[0]
  const userName = document.getElementById('userName')
  const FullName = document.getElementById('FullName')
  const level = document.getElementById('level')
  const lEarn = document.getElementById('lastEarn')

  userName.textContent = data.login
  FullName.textContent = `Full name : ${data.firstName} ${data.lastName}`
  lEarn.textContent = `Last Earn ${user.transaction_xp[0].amount}B`
  level.textContent = `level ${data.events[0].level}`

  getGraphData(user)
}
