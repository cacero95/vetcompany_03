export interface User{
    
    apellido?:string;
    email?:string;
    password?:string;
    name?:string;
    telefono?:number;
    direccion?:string;
    type:string;
    nMascotas?:number;
    mascotas?:Mascota[]; 
}
export interface Mascota{
    pet_name?:string;
    raza?:string;
    edad?:number;
    url?:string;
}

export interface Veterinaria {

    email?:string;
    password?:string;
    direccion?:string;
    name?:string;
    telefono?:number;
    url?:string;
    users?:User[];
    services?:string[];
    type:string;
    
}