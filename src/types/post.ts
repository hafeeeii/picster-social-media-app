import { Prisma } from "@prisma/client"

export type PostWithUserT = Prisma.PostGetPayload<{
    include: {
        user: {
            select: {
                id: true,
                userName: true,
                email: true,
                createdAt: true,
            }
        },
        likes:true,
        _count:{
            select: {
                likes:true
            }
        }

    }
}>

export type LikeInfoT = {
    likes: number;
    isLikedByUser: boolean;
  }
