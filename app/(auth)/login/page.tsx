import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="flex justify-center">
          <div className="h-10 w-10 rounded-full bg-primary"></div>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
