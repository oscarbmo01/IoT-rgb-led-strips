const querystring = window.location.search
const params = new URLSearchParams(querystring)
console.log(params.get('data'));