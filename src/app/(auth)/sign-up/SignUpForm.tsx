'use client'

import { signUp } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { SignUpData, signUpDataSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'

const SignUpForm = () => {

  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const { toast } = useToast()

 

  const form = useForm({
    mode:'onChange',
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpDataSchema)
  })
  const {formState: { errors }, handleSubmit } = form

  const onSubmit = async (data:SignUpData) => {
    startTransition(async () => {
      const {error} = await signUp(data)
      if (!error) router.push('/')
       if (error) {
        toast({
          title: "Sign-up Error",
          description: error,
        })
       }
    })
  }

  console.log(errors,'thjsi si ')
  return (
   <Card  className="w-[350px]">
    <CardHeader>
      <CardTitle>
        Sign Up
      </CardTitle>
    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form
        className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
               <FormMessage>
               {errors?.userName?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage>
              {errors?.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
             <FormMessage>
             {errors?.password?.message}
             </FormMessage>
            </FormItem>
          )}
        />
      </form>
    </Form>
    </CardContent>
        <CardFooter className="flex justify-between">
        <Button  onClick={handleSubmit(onSubmit)} type="submit" disabled={!form?.formState?.isValid || !errors || isPending}> 
          Submit
          </Button>
      </CardFooter>
   </Card>
  )
}

export default SignUpForm