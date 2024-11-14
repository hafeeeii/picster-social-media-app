'use client'
import { LikeInfoT } from '@/types/post';
import { QueryKey, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import ky from 'ky';
import { Heart } from 'lucide-react';
import clsx from 'clsx';

type Props = {
    postId: string;
    initialState: LikeInfoT
}

const LikeButton = (props:Props) => {
    const {postId, initialState} = props

    const queryClient = useQueryClient()
    const queryKey:QueryKey = ['like-info', postId]

    const {data} = useQuery({
        queryKey,
        queryFn:() => ky.get(`/api/posts/${postId}/likes`).json<LikeInfoT>(),
        initialData:initialState,
        staleTime:Infinity
    })

    const {mutate} = useMutation({
      mutationFn:() => 
        initialState?.isLikedByUser ? ky.delete(`/api/posts/${postId}/likes`) : ky.post(`/api/posts/${postId}/likes`),
      onMutate: async () => {
        await queryClient.cancelQueries({queryKey})
        const previousData = queryClient.getQueryData<LikeInfoT>(queryKey)
        queryClient.setQueryData<LikeInfoT>(queryKey, () => {
          return {
            isLikedByUser: !previousData?.isLikedByUser,
            likes: (previousData?.likes || 0) + (previousData?.isLikedByUser ? -1 : 1)
          }
        })
        return {previousData}
      },
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(queryKey, context?.previousData)
        console.log(err)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey })
      },
    })

  return (
   <button  className='flex items-center gap-2' onClick={() => mutate()}>
          <Heart
        className={clsx(
          "size-5",
          data.isLikedByUser && "fill-red-500 text-red-500",
        )}
      />
     <span>
      {data.likes}
     </span>
   </button>
  )
}

export default LikeButton