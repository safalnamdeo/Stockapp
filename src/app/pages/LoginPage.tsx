import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { TrendingUp, Shield, Zap, BarChart3, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full flex">
        {/* Left side - Brand & Features */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#2563EB] to-[#1e40af] p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Apex Capital</h1>
                <p className="text-blue-100 text-sm">Professional Trading Platform</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-6 mt-16">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Secure Trading</h3>
                  <p className="text-blue-100 text-sm">Bank-level security with real-time data encryption</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Lightning Fast</h3>
                  <p className="text-blue-100 text-sm">Execute trades instantly with our advanced platform</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Advanced Analytics</h3>
                  <p className="text-blue-100 text-sm">Real-time market insights and performance tracking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">$2.4B+</p>
              <p className="text-blue-100 text-xs mt-1">Trading Volume</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-blue-100 text-xs mt-1">Active Users</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-blue-100 text-xs mt-1">Uptime</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Apex Capital</h1>
                <p className="text-muted-foreground text-sm">Professional Trading Platform</p>
              </div>
            </div>

            <Card className="border-2 shadow-xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link 
                        to="#" 
                        className="text-xs text-[#2563EB] hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-base font-medium"
                  >
                    Sign in
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        New to Apex Capital?
                      </span>
                    </div>
                  </div>

                  <Link to="/register">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-11 text-base font-medium"
                    >
                      Create an account
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground px-8">
              By signing in, you agree to our{" "}
              <Link to="#" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}