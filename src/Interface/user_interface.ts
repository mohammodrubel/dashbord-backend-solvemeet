
export type T_user = {
    email: string;
    password: string;
    role: 'Admin' | 'User' | 'Modarator'; 
    isDeleted: boolean;
};

