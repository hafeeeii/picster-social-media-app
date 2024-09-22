'use server'

import { lucia } from "@/auth"
import prisma from "@/lib/db"
import { SignInData } from "@/lib/validations"
import { verify } from "@node-rs/argon2"
import { cookies } from "next/headers"

export const signIn = async (formData: SignInData): Promise<{ error: string }> => {
    try {
        const { userName, password } = formData

        const existingUser = await prisma.user.findFirst({
            where: {
                userName: {
                    equals: userName,
                    mode: 'insensitive'
                }
            }
        })

        if (!existingUser) {
            return {error: "Incorrect username or password"}
        }

        const validPassword = await verify(existingUser.password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            return {error: "Incorrect username or password"}
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        
        return {error: ""}

    } catch (error) {
        console.log(error, 'Sign in error')
        return { error: 'Something went wrong!' }
    }
}