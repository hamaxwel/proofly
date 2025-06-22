
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Plus, Eye, Share2, CheckCircle, Activity, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  const userDID = "did:haven:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
  
  const quickActions = [
    {
      title: "Add Credential",
      description: "Upload or create a new credential",
      icon: Plus,
      href: "/add-credential",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      title: "My Credentials",
      description: "View and manage your credentials",
      icon: Eye,
      href: "/credentials",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Share Identity",
      description: "Generate QR code to share",
      icon: Share2,
      href: "/share",
      gradient: "from-cyan-500 to-emerald-500"
    },
    {
      title: "Verify Credential",
      description: "Verify someone else's credential",
      icon: CheckCircle,
      href: "/verify",
      gradient: "from-emerald-500 to-yellow-500"
    }
  ];

  const recentActivity = [
    { action: "Credential Added", type: "University Diploma", time: "2 hours ago" },
    { action: "Identity Shared", type: "Employer Verification", time: "1 day ago" },
    { action: "Credential Verified", type: "Driver's License", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fade-in">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
                <p className="text-white/70">Your digital identity is secure and ready to use.</p>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4 mb-6">
              <p className="text-white/60 text-sm mb-1">Your Digital Identity (DID)</p>
              <p className="text-white font-mono text-sm break-all">{userDID}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-lg text-sm">
                ✓ Identity Verified
              </div>
              <div className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg text-sm">
                3 Active Credentials
              </div>
              <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg text-sm">
                5 Verifications This Month
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group glass rounded-2xl p-6 hover-lift hover:scale-105 transition-all duration-300 border border-white/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} p-0.5 mb-4 group-hover:animate-glow`}>
                  <div className="w-full h-full bg-black/50 rounded-xl flex items-center justify-center">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
              <Link to="/activity" className="text-purple-300 hover:text-purple-200 transition-colors">
                <Activity className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.action}</p>
                    <p className="text-white/60 text-sm">{item.type}</p>
                  </div>
                  <span className="text-white/50 text-sm">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Account Settings</h3>
              <Link to="/settings" className="text-purple-300 hover:text-purple-200 transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-4">
              <Link to="/settings" className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-white group-hover:text-purple-300 transition-colors">Security Settings</span>
              </Link>
              <Link to="/settings" className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-white group-hover:text-blue-300 transition-colors">Profile Settings</span>
              </Link>
              <Link to="/activity" className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span className="text-white group-hover:text-emerald-300 transition-colors">View Full Activity Log</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
