
//interfaces
export interface IBook {
    id?:     number;
    nombre: string;
    autor:  string;
    salida: string;
}

export interface ILoan{
    id?: number;
    fecha_inicio: string;
    fecha_entrega: string;
    estado: boolean;
    usuario_id: number;
    libro_id: number;
}

export interface IRegister{
    id? : number;
    nombre: string;
    clave: string;
    permisos: Permisos;
    
}

export interface IResponse {
    isExitoso: boolean;
    resultado?: IBook[] | IBook  | ILoan[] | ILoan ;
    token?: string;
    mensaje: string;
  }

export interface ILogin{
    nombre: string;
    clave: string;
}

//tipo

export type Permisos = "admin";