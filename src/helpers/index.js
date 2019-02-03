export const _isOnline = () => {
    return navigator.online
}

export const validateEmail = (email) => {
    const REG_EXP = /\S+@\S+\.\S+/;
    return REG_EXP.test(email);
}

export const validatePassword = (pwd) => {
    return !!pwd;
    //const REG_EXP = /[!@#$%^&*(),.?":{}|<>]/;
    //return REG_EXP.test(pwd);
}

export const timeStampToDate = (timestamp) => {
    const DATE = new Date(timestamp);
    return {
        withOutHour: DATE.getDate() + "/" + (DATE.getMonth() + 1) + "/" + DATE.getFullYear(),
        withHour: DATE.getDate() + "/" + (DATE.getMonth() + 1) + "/" + DATE.getFullYear() + " " + DATE.getHours() + ":" + (DATE.getMinutes() < 10 ? "0" : "") + DATE.getMinutes()
    };
}

export const elsMinCarByRes = () => {
    const clientWidth = document.body.clientWidth;
    return clientWidth > 768 ? 4 : (clientWidth < 520 ? 2 : 3);
} //elements in mini caroussel by resolution