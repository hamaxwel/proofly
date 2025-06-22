
import React, { useState } from 'react';
import { QrCode, Copy, Clock, Eye, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import CredentialCard from '@/components/CredentialCard';

const ShareCredential = () => {
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [shareSettings, setShareSettings] = useState({
    expiry: '24h',
    viewLimit: 'unlimited',
    requireAuth: false
  });
  const [shareLink, setShareLink] = useState('');
  const [qrCode, setQrCode] = useState('');

  const credentials = [
    {
      id: 1,
      type: "University Diploma",
      issuer: "MIT",
      issueDate: "2023-05-15",
      status: "verified",
      icon: () => <div className="w-6 h-6 bg-blue-500 rounded"></div>,
      gradient: "from-blue-500 to-purple-500",
      description: "Bachelor of Science in Computer Science"
    },
    {
      id: 2,
      type: "Professional Certificate",
      issuer: "AWS",
      issueDate: "2023-08-20",
      status: "verified",
      icon: () => <div className="w-6 h-6 bg-emerald-500 rounded"></div>,
      gradient: "from-emerald-500 to-blue-500",
      description: "AWS Solutions Architect Professional"
    }
  ];

  const generateShareLink = () => {
    const link = `https://haven.app/verify/${selectedCredential.id}?expires=${shareSettings.expiry}`;
    setShareLink(link);
    setQrCode(`QR_CODE_FOR_${selectedCredential.id}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    // Show toast notification
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Share Credential</h1>
          <p className="text-white/70 text-lg">Share your verified credentials securely with others</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credential Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Select Credential to Share</h2>
            <div className="space-y-4">
              {credentials.map((credential) => (
                <div
                  key={credential.id}
                  onClick={() => setSelectedCredential(credential)}
                  className={`glass rounded-xl p-4 border cursor-pointer transition-all duration-300 hover-lift ${
                    selectedCredential?.id === credential.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${credential.gradient} p-0.5`}>
                      <div className="w-full h-full bg-black/50 rounded-lg flex items-center justify-center">
                        <credential.icon />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{credential.type}</h3>
                      <p className="text-white/70 text-sm">{credential.issuer}</p>
                    </div>
                    {selectedCredential?.id === credential.id && (
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Share Settings */}
            {selectedCredential && (
              <div className="glass rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Share Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/90 text-sm mb-2">Expiry Time</label>
                    <select
                      value={shareSettings.expiry}
                      onChange={(e) => setShareSettings(prev => ({ ...prev, expiry: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                    >
                      <option value="1h">1 Hour</option>
                      <option value="24h">24 Hours</option>
                      <option value="7d">7 Days</option>
                      <option value="30d">30 Days</option>
                      <option value="never">Never</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/90 text-sm mb-2">View Limit</label>
                    <select
                      value={shareSettings.viewLimit}
                      onChange={(e) => setShareSettings(prev => ({ ...prev, viewLimit: e.target.value }))}
                      className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
                    >
                      <option value="1">One-time use</option>
                      <option value="5">5 views</option>
                      <option value="unlimited">Unlimited</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requireAuth"
                      checked={shareSettings.requireAuth}
                      onChange={(e) => setShareSettings(prev => ({ ...prev, requireAuth: e.target.checked }))}
                      className="rounded border-white/20"
                    />
                    <label htmlFor="requireAuth" className="text-white/90 text-sm">
                      Require viewer authentication
                    </label>
                  </div>
                </div>

                <Button
                  onClick={generateShareLink}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Share Link
                </Button>
              </div>
            )}
          </div>

          {/* Share Result */}
          <div className="space-y-6">
            {shareLink ? (
              <>
                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">QR Code</h3>
                  <div className="bg-white rounded-xl p-8 text-center">
                    <QrCode className="w-32 h-32 mx-auto text-gray-800" />
                    <p className="text-gray-600 text-sm mt-4">Scan to verify credential</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Share Link</h3>
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white text-sm font-mono break-all">{shareLink}</p>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    className="w-full text-white hover:bg-white/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                <div className="glass rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Share Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Credential:</span>
                      <span className="text-white">{selectedCredential.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Expires:</span>
                      <span className="text-white">{shareSettings.expiry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">View Limit:</span>
                      <span className="text-white">{shareSettings.viewLimit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Authentication:</span>
                      <span className="text-white">{shareSettings.requireAuth ? 'Required' : 'Not Required'}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass rounded-xl p-8 border border-white/10 text-center">
                <Share2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Share</h3>
                <p className="text-white/70">Select a credential and configure your share settings to generate a secure link.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCredential;
