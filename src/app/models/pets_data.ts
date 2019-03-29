export interface Tips {
    titulo:string;
    short:string;
    descripcion:string;
  }
  export interface pets_data {
    titulo:string;
    short?:string;
    descripcion?:string;
    clases?:Clases
  }
  export interface Clases{
    descripcion1?:string;
    descripcion2?:string;
    descripcion3?:string;
    descripcion5?:string;
    descripcion6?:string;
  }