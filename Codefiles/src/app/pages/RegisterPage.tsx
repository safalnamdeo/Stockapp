import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { TrendingUp, CheckCircle2, ArrowRight, Shield, LineChart, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Mock registration - store user info
    register(formData.name, formData.email, formData.password);
    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="w-full flex">
        {/* Left side - Brand & Benefits */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#16A34A] via-[#15803d] to-[#166534] p-16 relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          
          <div className="relative z-10">
            {/* Logo & Brand */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white tracking-tight">EquityEdge</h1>
                  <p className="text-green-100 text-sm mt-0.5">Intelligent Trading Platform</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                Start Your Trading Journey Today
              </h2>
              <p className="text-green-50 text-lg leading-relaxed max-w-md">
                Join thousands of traders mastering the markets with our comprehensive simulation platform.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">$100,000 Virtual Portfolio</h3>
                  <p className="text-green-100 text-sm leading-relaxed">Practice trading with substantial virtual capital</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">Real-Time Market Data</h3>
                  <p className="text-green-100 text-sm leading-relaxed">Access live prices and professional analytics</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">Risk-Free Learning</h3>
                  <p className="text-green-100 text-sm leading-relaxed">Master strategies without financial risk</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 group-hover:bg-white/20 transition-all">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="pt-1">
                  <h3 className="text-white font-semibold text-base mb-1">Instant Execution</h3>
                  <p className="text-green-100 text-sm leading-relaxed">Lightning-fast trade processing and confirmations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Testimonial */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-white text-lg leading-relaxed mb-3">
              "EquityEdge transformed how I approach trading. The platform is intuitive and the analytics are exceptional."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                SJ
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Sarah Johnson</p>
                <p className="text-green-100 text-xs">Portfolio Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Register form */}
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

            {/* Register Card */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
                <p className="text-muted-foreground">
                  Start trading in minutes with your free account
                </p>
              </div>

              <Card className="border shadow-sm">
                <CardContent className="pt-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        className="h-11"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-base font-semibold shadow-sm"
                    >
                      Create account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Sign in section */}
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <Link to="/login" className="block">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 text-base font-semibold"
                  >
                    Sign in instead
                  </Button>
                </Link>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
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