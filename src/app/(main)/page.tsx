import { PostEditor } from '@/components/posts/editor/PostEditor'
import SidebarLeft from '@/components/sidebar/SidebarLeft'
import React from 'react'


const Home = () => {
  return (
    <div className='flex justify-between w-full h-screen'>
      <div className='bg-foreground h-full flex-none w-[20vw]'>
        <SidebarLeft/>
      </div>
      <div className='w-full grow flex flex-col items-center py-8 '>
        <div>
        <PostEditor/>
        </div>

        <div>
          feed
        </div>
      </div>
      <div className='bg-green-100 flex-none w-[20vw]'>
        3
      </div>
    </div>
  )
}

export default Home