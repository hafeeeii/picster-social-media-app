import Tooltip from '@/components/Tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartNoAxesCombined, Heart, MessageCircle, Repeat2 } from 'lucide-react'
import React from 'react'
import Moment from 'moment';
import { PostWithUserT } from '@/types/post'

type Props = {
  post: PostWithUserT
}


const Post = (props:Props) => {
  const {post} = props

  const actionButtons = [
    {icon:<Heart size={17} />, tooltipContent:'Like' },
    {icon:<MessageCircle size={17} />, tooltipContent:'comment' },
    {icon:<Repeat2 size={17} />, tooltipContent: 'Repost' },
    {icon:<ChartNoAxesCombined size={17} />, tooltipContent: 'View'},
  ]
  return (
    <Card className='max-w-xl mb-6'>
      <CardHeader className='flex flex-row items-center gap-3 min-w-[600px] '>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>
          {post.user?.userName}
        </CardTitle>
        <CardDescription>
          @{post.user?.userName} . {Moment(post.createdAt).fromNow()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
       {post.content}
        </p>
      </CardContent>
      <CardFooter className='text-sm text-muted-foreground flex justify-between pr-20'>
        {actionButtons.map((val,index) => (
        <Tooltip content={val.tooltipContent} key={index}>
          <div className='cursor-pointer hover:text-primary' >
          {val.icon}
          </div>
        </Tooltip>
        ))}

      </CardFooter>
    </Card>
  )
}

export default Post