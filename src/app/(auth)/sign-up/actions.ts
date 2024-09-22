'use server'

import { lucia } from "@/auth";
import prisma from "@/lib/db";
import { SignUpData, signUpDataSchema } from "@/lib/validations"
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia"
import { cookies } from "next/headers";

export const signUp = async (formData: SignUpData):
    Promise<{ error: string }> => {
    try {
        const { userName, email, password } = signUpDataSchema.parse(formData)

        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        const existingEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            }
        })

        const existingUserName = await prisma.user.findFirst({
            where: {
                userName: {
                    equals: userName,
                    mode: 'insensitive'
                }
            }
        })


        if (existingEmail) {
            return {
                error: 'Email already taken!'
            }
        }

        if (existingUserName) {
            return {
                error: 'User name already taken!'
            }
        }



        const userId = generateIdFromEntropySize(10);

        await prisma.user.create({
            data: {
                id: userId,
                userName,
                email,
                password: passwordHash,
            }
        })

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        
        return { error: '' }; 
    }
    catch (error) {
        console.log(error,'Something went wrong')
        return {
            error: 'Something went wrong. Please try again!'
        }
    }

}