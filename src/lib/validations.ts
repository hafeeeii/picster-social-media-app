import { z } from "zod";

export const genericSchema = z.string().min(1,'Required').trim()

export const signUpDataSchema = z.object({
    userName: genericSchema,
    email: genericSchema.email('Email must be valid'),
    password: genericSchema,

})

export type SignUpData = z.infer<typeof signUpDataSchema>


export const signInDataSchema = z.object({
    userName: genericSchema,
    password: genericSchema,

})

export type SignInData = z.infer<typeof signInDataSchema>

