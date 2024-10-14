'use client'

// import { signUp } from './actions'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignInData, signInDataSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from './actions'
import CustomButton from '@/components/CustomButton'

const SignInForm = () => {

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

 

  const form = useForm({
    mode:'onChange',
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: zodResolver(signInDataSchema)
  })
  const {formState: { errors }, handleSubmit } = form

  const onSubmit = async (data:SignInData) => {
    startTransition(async () => {
      const {error} = await signIn(data)
      if (!error) router.push('/')
    })
  }

  return (
   <Card  className="w-[350px]">
    <CardHeader>
      <CardTitle>
        Sign In
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
        <CustomButton isPending={isPending} onClick={handleSubmit(onSubmit)} type="submit" disabled={!form?.formState?.isValid || !errors || isPending}> 
          Submit
          </CustomButton>
      </CardFooter>
   </Card>
  )
}

export default SignInForm