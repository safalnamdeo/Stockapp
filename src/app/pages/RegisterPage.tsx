import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function RegisterPage() {
  const navigate = useNavigate();
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
    // Mock registration
    toast.success("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full flex">
        {/* Left side - Brand & Benefits */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#16A34A] to-[#15803d] p-12 relative overflow-hidden">
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
                <p className="text-green-100 text-sm">Professional Trading Platform</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white mb-8">
                Start Your Trading Journey Today
              </h2>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-lg">Virtual $100,000 starting balance</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-lg">Real-time market data & analytics</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-lg">Practice risk-free trading</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-lg">Advanced portfolio tracking</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-lg">Comprehensive transaction history</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <p className="text-white text-lg italic mb-2">
              "The best platform to learn trading without risking real money."
            </p>
            <p className="text-green-100 text-sm">— Sarah Johnson, Active Trader</p>
          </div>
        </div>

        {/* Right side - Register form */}
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
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>
                  Start trading in minutes with your free account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
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
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
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
                      Confirm Password
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
                    className="w-full h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-base font-medium"
                  >
                    Create account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Already have an account?
                      </span>
                    </div>
                  </div>

                  <Link to="/login">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-11 text-base font-medium"
                    >
                      Sign in
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-muted-foreground px-8">
              By creating an account, you agree to our{" "}
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