
export  type T_Error_Sources = {
    path: string | number 
    message:string
}[]

export type T_Error_Responce = {
    statusCode:number ;
    message:string;
    errorSource:T_Error_Sources
}

export const userRole = {
    admin:'Admin',
    user:'User',
    momdarator:'Modarator',
} as const

export type T_user_role = keyof typeof userRole
