
import React from 'react';
import { UserPlus, Shield, Share, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Create Your Digital Identity",
      description: "Sign up and create your decentralized digital identity in minutes. Your DID is generated securely on the blockchain.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Shield,
      step: "02", 
      title: "Add Your Credentials",
      description: "Upload and store your certificates, licenses, and documents. Each credential is encrypted and digitally signed.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Share,
      step: "03",
      title: "Share Securely",
      description: "Generate secure, time-limited sharing links. Control exactly what information is shared with whom.",
      color: "from-cyan-500 to-emerald-500"
    },
    {
      icon: CheckCircle,
      step: "04",
      title: "Instant Verification",
      description: "Recipients can verify your credentials instantly without compromising your privacy or requiring third parties.",
      color: "from-emerald-500 to-yellow-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-emerald-300 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How Haven
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Getting started with your self-sovereign digital identity is simple. 
            Follow these four steps to take control of your credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-6 group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 group-hover:scale-110 transition-all duration-300`}>
                    <div className="w-full h-full bg-black/70 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300`}></div>
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual representation */}
          <div className="relative">
            <div className="glass-strong rounded-3xl p-8 h-[600px] flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Central hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-16 left-16 w-20 h-20 glass rounded-xl flex items-center justify-center animate-float" style={{animationDelay: '0s'}}>
                  <UserPlus className="w-8 h-8 text-purple-300" />
                </div>
                
                <div className="absolute top-16 right-16 w-20 h-20 glass rounded-xl flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
                  <Share className="w-8 h-8 text-blue-300" />
                </div>
                
                <div className="absolute bottom-16 left-16 w-20 h-20 glass rounded-xl flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
                  <CheckCircle className="w-8 h-8 text-emerald-300" />
                </div>
                
                <div className="absolute bottom-16 right-16 w-20 h-20 glass rounded-xl flex items-center justify-center animate-float" style={{animationDelay: '3s'}}>
                  <Shield className="w-8 h-8 text-cyan-300" />
                </div>
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" />
                  </line>
                  <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </line>
                  <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </line>
                  <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                  </line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
