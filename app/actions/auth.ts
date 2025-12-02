'use server'

import { z } from 'zod'
import {
  verifyPassword,
  createSession,
  createUser,
  deleteSession,
} from '@/lib/auth'
import { getUserByEmail } from '@/lib/dal'
import { mockDelay } from '@/lib/utils'
import { redirect } from 'next/navigation'

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignInData = z.infer<typeof SignInSchema>
export type SignUpData = z.infer<typeof SignUpSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export const signIn = async (formData: FormData): Promise<ActionResponse> => {
  try {
    // Add a small delay to simulate network latency
    await mockDelay(700)

    // Extract data from form
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    // Validate with Zod
    const validationResult = SignInSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Find user by email
    const user = await getUserByEmail(data.email)
    if (!user) {
      return {
        success: false,
        message: 'Invalid Email or Password',
        errors: {
          email: ['Invalid email or password'],
        },
      }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, user.password)
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          password: ['Invalid email or password'],
        },
      }
    }

    await createSession(user.id)
    return {
      success: true,
      message: 'Signed in Successfully',
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: 'Something bad Happened',
      message: 'Something bad happened',
    }
  }
}

export const signup = async (formData: FormData) => {
  try {
    // extract data from form
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    // validate with zod
    const validationResult = SignUpSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation Failed ',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // check if user already exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return {
        success: false,
        message: 'Already have an account with existing email',
        errors: ['Account already exist with this email'],
      }
    }

    // create user
    const user = await createUser(data.email, data.password)
    if (!user) {
      return {
        success: false,
        message: 'User does not exist',
        errors: ['User does not exist'],
      }
    }

    // create session
    await createSession(user.id)
    return {
      success: true,
      message: 'Account created successfully',
    }
  } catch (error) {
    console.error('Sign up error:', error)
    return {
      success: false,
      message: 'An error occurred while creating your account',
      error: 'Failed to create account',
    }
  }
}

export async function signOut(): Promise<void> {
  try {
    await mockDelay(300)
    await deleteSession()
  } catch (error) {
    console.error('Sign out error:', error)
    throw new Error('Failed to sign out')
  } finally {
    redirect('/signin')
  }
}


