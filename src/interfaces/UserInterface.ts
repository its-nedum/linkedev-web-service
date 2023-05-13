export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    skills: string,
    yearsOfExperience: number,
    bio: string,
    status: number,
}

export interface IAuth {
    email: string,
    password: string,
    status?: number,
}

export interface DataStoredInToken {
    id: string
    email: string
}