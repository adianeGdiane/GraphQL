export function LogoutHandle() {
    localStorage.removeItem('token')
    location.reload()
}