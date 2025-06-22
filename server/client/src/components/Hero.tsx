
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, Sparkles, Lock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(147,51,234,0.1),rgba(59,130,246,0.1),rgba(147,51,234,0.1))] animate-spin" style={{animationDuration: '20s'}}></div>
      </div>
      
      {/* Floating credential cards in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-40 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 transform rotate-12 animate-float" style={{animationDelay: '0s'}}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/80 text-sm font-medium">MIT Degree</span>
            </div>
            <div className="text-white/60 text-xs">Computer Science</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-xs">Verified ✓</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-40 right-20 w-64 h-40 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 transform -rotate-6 animate-float" style={{animationDelay: '2s'}}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/80 text-sm font-medium">Professional License</span>
            </div>
            <div className="text-white/60 text-xs">State Board • 2024</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-xs">Active ✓</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-20 w-64 h-40 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 transform rotate-3 animate-float" style={{animationDelay: '4s'}}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/80 text-sm font-medium">Health Record</span>
            </div>
            <div className="text-white/60 text-xs">Encrypted • Secure ✓</div>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-400 text-xs">Secure ✓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-purple-300" />
            The Future of Digital Identity
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Own Your
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Digital Identity
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Store, verify, and share your credentials with complete privacy. 
            <br className="hidden md:block" />
            No central authority. No data breaches. Just you, in control.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-lg px-8 py-4 h-auto rounded-xl"
              >
                Create Your Digital ID
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm text-lg px-8 py-4 h-auto rounded-xl"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Decentralized</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Self-Sovereign</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">Privacy-First</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
