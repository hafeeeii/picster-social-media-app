"use client"

import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { CreatePostT } from "@/lib/validations"
import { submitPost } from "./actions"
import { useTransition } from "react"
import { toast } from "@/hooks/use-toast"
import CustomButton from "@/components/CustomButton"



export function PostEditor() {

  const [isPending, startTransition] = useTransition()

  const form = useForm<CreatePostT>({
    // resolver: zodResolver(CreatePostT),
  })

  function onSubmit(data: CreatePostT) {
   startTransition(async () => {
    await submitPost(data)
    toast({
      title:'Posted Successfully'
    })

   })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[600px] space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <CustomButton disabled={isPending} isPending={isPending}>
            Post
          </CustomButton>
        </div>
      </form>
    </Form>
  )
}
