'use server'

import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { createPostSchema, CreatePostT } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitPost(formData:CreatePostT) {

    const {user} = await validateRequest()
    if (!user) throw new Error('not authenticated')

        const {content} = createPostSchema.parse(formData)

        const newPost = prisma.post.create({
            data:{
                content,
                userId:user.id,
            }
        })

        revalidatePath('/')
        return newPost
      
}