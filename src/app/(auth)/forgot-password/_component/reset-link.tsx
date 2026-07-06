import CreateOrLogin from '@/components/shared/create-login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MoveLeft } from 'lucide-react'
import React from 'react'
import { ResetSteps } from './forgot-password-flow'

export default function ResetLink({ email, setStep }: { email: string; setStep: React.Dispatch<React.SetStateAction<ResetSteps>> }) {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Card>
            <Button
              className="w-5 ml-5"
              type="button"
              variant="ghost"
              onClick={() => setStep("email")}
            >
              <MoveLeft className="text-gray-800 size-5" />
            </Button>
            <CardHeader>
              <CardTitle className="text-3xl font-inter ">Password Reset Sent</CardTitle>
              <CardDescription className="font-semibold text-gray-800">We have sent a password reset link to: <span className="font-bold text-blue-500">{email}</span>.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="mb-4 text-sm">Please check your inbox and follow the instructions to reset your password.</p>
              <span className="text-muted-foreground text-xs leading-none">If you don’t see the email within a few minutes, check your spam or junk folder.</span>
            </CardContent>

            <CreateOrLogin
            head={"Don't have an account?"}
            link={"/register"}
            tail={"Create yours"}
          />
          </Card>

        </div>

      </div>
    </>
  )
}
