export interface user{
    _id?:string;
    nombre?:string;
    apellido?:string;
    email?:string,
    password?:string,
    direccion?:string,
    permisos?:{
        add:boolean,
        put:boolean,
        delete:boolean,
    }
}