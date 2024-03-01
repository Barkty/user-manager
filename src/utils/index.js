import bcrypt from "bcrypt";

export const comparePassword = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword)

export const generateHashString = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync());

export const removePropertiesFromObject = (obj, properties) => {
    let data = {}
    properties.forEach((key) => {
        delete obj[key];
    });

    data = { ...data, ...obj }
    
    return data
};