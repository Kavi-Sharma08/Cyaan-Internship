import validator from "validator"
const validateData = (req)=>{
    const {email , password} = req;
    
    if(!validator.isEmail(email)){
        throw new Error ("Enter valid email");
    }
    if(!validator.isStrongPassword){
        throw new Error("Enter strong Password");
    }
    return true;

}

export {
    validateData
}