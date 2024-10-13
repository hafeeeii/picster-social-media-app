import { PostEditor } from '@/components/posts/editor/PostEditor'
import Post from '@/components/posts/post/Post'
import SidebarLeft from '@/components/sidebar/SidebarLeft'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import React from 'react'


const Home = async () => {
  const posts = await prisma.post.findMany()
  return (
    <div className='flex justify-between w-full h-screen '>
      <div className='h-full flex-none w-[20vw]'>
        <SidebarLeft />
      </div>
      <Separator orientation='vertical' />
      <div className='w-full grow flex flex-col items-center py-8 gap-10'>
        <div>
          <PostEditor />
        </div>
        <div>
          {posts?.map((post, index) => (
            <div key={index}>
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
      <Separator orientation='vertical' />
      <div className=' flex-none w-[20vw]'>
        3
      </div>
    </div>
  )
}

export default Home