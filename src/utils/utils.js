// oggetto errori 
const errorObj = {
    errorEmail: false,
    errorPassword: false,
    errorPasswordConfirm: false,
    errorName: false,
    errorSurname: false,
    errorDateOfBirth: false,
    errorPolicy: false,
}
// funzione controllo mail 
function checkMail(mail) {

    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(mail)
}

function checkPassword(password) {
    let regex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&+=]).*$/;
    return regex.test(password)
}

let jobs = [
    '',
    'Web developer',
    'Recruiter',
    'Frontend developer',
    'Backend developer',
    'Ux Designer',
    'Manager',
    'Boss',
    'altro',
]

export {checkMail, checkPassword, jobs,errorObj }