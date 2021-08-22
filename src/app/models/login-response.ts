export interface loginResponse{
    usuario:{
        _id:string,
        nombre:string,
        email:string,
        tipo:string,
    },
    jwtToken:string
}