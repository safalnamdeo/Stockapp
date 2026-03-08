import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { TrendingUp, Shield, LineChart, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - store user info
    login(email, password);
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-full flex">
        {/* Left side - Brand & Information */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#2563EB] via-[#1e40af] to-[#1e3a8a] p-16 relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          
          <div className="relative z-10">
            {/* Logo & Brand */}
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white tracking-tight">EquityEdge</h1>
                  <p className="text-blue-100 text-sm mt-0.5">Intelligent Trading Platform</p>
                </div>
              </div>
              <p className="text-blue-50 text-lg leading-relaxed max-w-md">
                Trade smarter with advanced analytics, real-time insights, and institutional-grade tools.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">Enterprise Security</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Multi-layer encryption and biometric authentication</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">Real-Time Analytics</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Advanced charting tools and market intelligence</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">Expert Community</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">Connect with professional traders worldwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Metrics */}
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-white mb-1">$4.2B+</p>
                <p className="text-blue-100 text-sm">Assets Under Management</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">125K+</p>
                <p className="text-blue-100 text-sm">Active Traders</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1">99.99%</p>
                <p className="text-blue-100 text-sm">Platform Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">EquityEdge</h1>
                <p className="text-muted-foreground text-sm">Intelligent Trading Platform</p>
              </div>
            </div>

            {/* Login Card */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                <p className="text-muted-foreground">
                  Sign in to your account to continue trading
                </p>
              </div>

              <Card className="border shadow-sm">
                <CardContent className="pt-6">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
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
                          className="text-xs text-[#2563EB] hover:text-[#1d4ed8] font-medium transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-base font-semibold shadow-sm"
                    >
                      Sign in
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Sign up section */}
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Don't have an account?
                    </span>
                  </div>
                </div>

                <Link to="/register" className="block">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 text-base font-semibold"
                  >
                    Create your account
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>SSL Encrypted Connection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Two-Factor Authentication Available</span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link to="#" className="underline hover:text-foreground transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}