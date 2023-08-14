export const validateString = (val) => {
    if(val == ' ' || val == undefined)
    {
        return false
    }
    else{

        if(val.length > 2)
        {
            return true;
        }
        else{
            return false
        }
    }

}

export const validateEmail = (val) => {
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (emailPattern.test(val));
}

export const validateAge = (val) => {

    if(!Number.isNaN(val))
    {
        if (val > 1 && val < 200){
            return true;
        }
        else{
            return false
        }
    }
    else{
        return false;
    }
    
}

export const validatePassword = (val) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter,
    // one number and one special character:
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (passwordPattern.test(val));
}