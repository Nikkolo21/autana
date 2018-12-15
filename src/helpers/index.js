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