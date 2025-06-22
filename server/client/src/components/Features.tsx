
import React from 'react';
import { Shield, Lock, Globe, Zap, Eye, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Decentralized Security",
      description: "Your credentials are stored on blockchain technology, eliminating single points of failure and ensuring maximum security.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Verification",
      description: "Prove your credentials without revealing sensitive information. Share only what's necessary, when it's necessary.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works across borders and institutions. Your digital identity is recognized globally without intermediaries.",
      gradient: "from-cyan-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Verify credentials in seconds, not days. Real-time authentication for faster onboarding and processes.",
      gradient: "from-emerald-500 to-yellow-500"
    },
    {
      icon: Eye,
      title: "Complete Privacy",
      description: "You control who sees what. Granular permissions ensure your privacy is never compromised.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Self-Sovereign Identity",
      description: "No central authority controls your identity. You own your data, credentials, and digital presence completely.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent)] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-purple-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Revolutionary Features
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            The Future of
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Digital Identity
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Haven combines cutting-edge blockchain technology with intuitive design to give you 
            complete control over your digital credentials and identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-strong rounded-2xl p-8 hover-lift hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 group-hover:animate-glow`}>
                  <div className="w-full h-full bg-black/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`absolute inset-0 w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
