
import React, { useState } from 'react';
import { Shield, User, Key, Download, Trash2, Moon, Sun, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'privacy', name: 'Privacy', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName" className="text-white/90">Display Name</Label>
                  <Input
                    id="displayName"
                    defaultValue="John Doe"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/90">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-white/90">Bio</Label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="w-full h-24 bg-white/5 border border-white/20 rounded-lg p-3 text-white placeholder:text-white/50 resize-none"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Digital Identity</h3>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Your DID</p>
                <p className="text-white font-mono text-sm break-all">did:haven:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Password & Authentication</h3>
              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                  Change Password
                </Button>
                <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Key Management</h3>
              <div className="space-y-4">
                <div className="glass rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Primary Key</span>
                    <span className="text-emerald-400 text-sm">Active</span>
                  </div>
                  <p className="text-white/70 text-sm font-mono">0x742d35Cc...8A2C1b</p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <Key className="w-4 h-4 mr-2" />
                      Rotate Key
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Backup & Recovery</h3>
              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download Backup
                </Button>
                <p className="text-white/70 text-sm">
                  Download an encrypted backup of your identity and credentials. Store this securely offline.
                </p>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Data Sharing Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                  <div>
                    <h4 className="text-white font-medium">Analytics</h4>
                    <p className="text-white/70 text-sm">Help improve Haven with anonymous usage data</p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-12 h-6 bg-purple-500 rounded-full relative transition-colors"
                  >
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                  <div>
                    <h4 className="text-white font-medium">Public Profile</h4>
                    <p className="text-white/70 text-sm">Allow others to find your public credentials</p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="w-12 h-6 bg-gray-500 rounded-full relative transition-colors"
                  >
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Data Retention</h3>
              <div className="glass rounded-lg p-4 border border-white/10">
                <p className="text-white/70 text-sm mb-4">
                  Control how long your data is stored on Haven's systems. Your credentials are stored on the blockchain permanently.
                </p>
                <select className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white">
                  <option>Delete inactive data after 1 year</option>
                  <option>Delete inactive data after 2 years</option>
                  <option>Never delete my data</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { name: 'Credential Verifications', desc: 'When someone verifies your credentials' },
                  { name: 'Security Alerts', desc: 'Important security notifications' },
                  { name: 'Product Updates', desc: 'New features and improvements' },
                  { name: 'Share Requests', desc: 'When someone requests your credentials' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 glass rounded-lg border border-white/10">
                    <div>
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-white/70 text-sm">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => {}}
                      className="w-12 h-6 bg-purple-500 rounded-full relative transition-colors"
                    >
                      <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
          <p className="text-white/70">Manage your account and privacy preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8 border border-white/10">
              {renderTabContent()}
              
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass rounded-2xl p-8 border border-red-500/20 mt-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Trash2 className="w-5 h-5 mr-2 text-red-400" />
                Danger Zone
              </h3>
              <p className="text-white/70 mb-4">
                Once you delete your account, there is no going back. Your credentials on the blockchain will remain, but your Haven account will be permanently deleted.
              </p>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
