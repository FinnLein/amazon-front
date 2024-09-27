import { TUser } from "@/types/user.type"

export interface ITokens { 
    accessToken: string 
    refreshToken: string
}

export interface IEmailPassword {
	email: string
	password: string
}


export interface IAuthResponse extends ITokens {
    user: TUser,
}

