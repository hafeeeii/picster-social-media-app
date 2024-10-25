import { PostEditor } from '@/components/posts/editor/PostEditor'
import Post from '@/components/posts/post/Post'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import { PostWithUserT } from '@/types/post'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const Home = async () => {
  const posts: PostWithUserT[] = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          email: true,
          createdAt: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })


  return (
    <div className='flex justify-between w-full h-screen '>

      <Separator orientation='vertical' />
      <div className='w-full flex flex-col items-center py-8 gap-10 max-h-[100vh] overflow-y-scroll'>
        <div>
          <Tabs defaultValue="FOR_YOU" className='w-full space-y-10' >
            <TabsList className='w-full flex gap-10 bg-transparent'>
              <TabsTrigger value="FOR_YOU">For You</TabsTrigger>
              <TabsTrigger value="FOLLOWING">Following</TabsTrigger>
            </TabsList>
            <PostEditor />
            <TabsContent value="FOR_YOU">
              <div>
                {posts?.map((post, index) => (
                  <div key={index}>
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="FOLLOWING">       <ThemeToggle /></TabsContent>
          </Tabs>
        </div>
      </div>
      <Separator orientation='vertical' />
    </div>
  )
}

export default Home

