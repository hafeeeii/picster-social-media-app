import { validateRequest } from "@/auth"
import prisma from "@/lib/db"
import { LikeInfoT } from "@/types/post"


export async function GET(
    request: Request,
    { params }: { params: Promise<{ postId: string }> }
) {

    try {

        const postId = (await params).postId
        const { user: loggedInUser } = await validateRequest()

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: {
                likes: {
                    where: {
                        userId: loggedInUser.id
                    },
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        })

        if (!post) {
            return Response.json({ error: "Post not fount" }, { status: 404 })
        }

        const data: LikeInfoT = {
            isLikedByUser: !!post.likes.length,
            likes: post._count.likes,
        }

        console.log(data, 'this is data')

        return Response.json(data)


    } catch (error) {
        console.log(error, 'error occured')
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ postId: string }> }
) {
    try {

        const postId = (await params).postId
        const { user: loggedInUser } = await validateRequest()

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 })
        }

        const post = await prisma.post.findUnique({
            where: { id: postId },
            select: {
                userId: true
            }
        })

        if (!post) {
            return Response.json({ error: "Post not fount" }, { status: 404 })
        }

        await prisma.like.upsert({
            where: {
                postId_userId: {
                    userId: loggedInUser.id,
                    postId,
                }
            },
            create: {
                userId: loggedInUser.id,
                postId,
            },
            update: {}
        })


        return new Response()

    } catch (error) {
        console.log(error, 'error occured')
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ postId: string }> }
) {
    const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const postId = (await params).postId

        await prisma.like.deleteMany({
            where: {
                // delete this combination
                postId,
                userId: loggedInUser.id
            },
        })

        return new Response()

    } catch (error) {
        console.log(error, 'error occured')
    }

}