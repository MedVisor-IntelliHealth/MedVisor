import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { useMedplum, SignInForm } from "@medplum/react";



export default function LoginPage() {
  const navigate = useNavigate();
  const medplum = useMedplum();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    try {
      await medplum.startLogin({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-medical-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          {/* Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            <path d="M16 8h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6" />
            <path d="M16 17.1v.9h.9" />
            <path d="m14 17.1-1.3-1.3" />
            <path d="M5 11h5" />
            <path d="M8 8v6" />
          </svg>
          MedVisor
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "MedVisor has revolutionized how I manage patient care and medication recommendations. It's an essential
              tool for modern healthcare professionals."
            </p>
            <footer className="text-sm">Dr. Sarah Johnson</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:p-8">
        <form onSubmit={handleSubmit} className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sign In</CardTitle>
              <CardDescription>Access your MedVisor physician portal</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Remember me
                </label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Sign In</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
