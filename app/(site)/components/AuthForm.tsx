'use client';

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from '../components/inputs/Input';
import Button from "../../components/Button";
import AuthSocialButton from './AuthSocialButton';
import { BsFacebook, BsGithub, BsGoogle} from 'react-icons/bs' 
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

type Variant = 'Login' | 'Register';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('Login');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])
  
  const toggleVariant = useCallback(() => {
    if(variant === 'Login') {
      setVariant('Register');
    } else {
      setVariant('Login');
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email:'',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if(variant === 'Register') {
      axios.post('/api/register', data)
      .then(() => {
        signIn('credentials', data); 
        toast.success('Account registered successfully!')
      })
      .catch(() => {
        toast.error('Something went wrong') 
      })
      .finally(() => setIsLoading(false))
    }
    if(variant === 'Login') {
      signIn('credentials', {
        ...data,
        redirect: false
      }).then((callback) => {
        if(callback?.error) {
          toast.error('Invalid credentials')
        }

        if(callback?.ok && !callback?.error) {
          toast.success('Account login successfully');
          router.push('/users')
        }
      }).finally(() => {
        setIsLoading(false)
      })
    }
  } 
  
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false
    }).then((callback) => {
      if(callback?.error) {
        toast.error('Invalid credentials')
      }
      if(callback?.ok && !callback?.error) {
        toast.error('Account login successfully')
      }
    }).finally(() => setIsLoading(false)
    );
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'Register' && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              type="text"
            />
          )}
           <Input 
             id="email" 
             label="Email" 
             register={register} 
             errors={errors} 
             type="text"/>
             <Input 
             id="password" 
             label="Password" 
             register={register} 
             errors={errors} 
             type="password"/>
             <div>
              <Button
                disabled={isLoading}
                fullWidth
                type="submit"
              > 
              {variant === 'Login'? 'Sign in' :'Register'}
              </Button>
             </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500"/>     
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton 
              icon={BsGithub} 
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton 
              icon={BsGoogle} 
              onClick={() => socialAction('google')}
            />
            <AuthSocialButton 
              icon={BsFacebook}
              onClick={() => socialAction('facebook')}
            />
          </div>
        </div>
        <div className="flex mt-6 px-2 gap-2 justify-center text-sm text-gray-500">
          <div>
            {variant === 'Login' ? 'New to messenger?': 'Already have an account?'}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer"
            >
            {variant === "Login" ? 'Create an account': 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AuthForm;