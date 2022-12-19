let apiUrl

if (process.env.NODE_ENV === 'development') {
    apiUrl = `http://localhost:3000`
    // apiUrl = `https://2keepintouch.com`
    // apiUrl = `https://postal-card.herokuapp.com`
}
else {
    apiUrl = `https://2keepintouch.com`
    // apiUrl = `https://cors-anywhere786.herokuapp.com/https://postal-card.herokuapp.com`
}

export default apiUrl