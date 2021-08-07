export interface loginResponse{
    usuario:{
        _id:string,
        nombre:string,
        email:string,
    },
    jwtToken:string
}