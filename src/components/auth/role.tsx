export function Role() {
    let role = ''
    const localDataUser = localStorage.getItem("user")
    if (localDataUser) {
        const jsonLocalDataUser = JSON.parse(localDataUser)
        role = jsonLocalDataUser.roles
    }
    return role
}