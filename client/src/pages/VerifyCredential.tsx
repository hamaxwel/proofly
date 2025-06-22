
import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const VerifyCredential = () => {
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'success' | 'failed' | 'invalid'>('idle');
  const [credentialData, setCredentialData] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVerificationState('verifying');
      
      // Simulate verification process
      setTimeout(() => {
        const isValid = Math.random() > 0.3; // 70% chance of valid credential
        setVerificationState(isValid ? 'success' : 'invalid');
        
        if (isValid) {
          setCredentialData({
            type: 'University Diploma',
            issuer: 'Massachusetts Institute of Technology',
            holder: 'John Doe',
            issueDate: '2023-05-15',
            credentialId: 'MIT-2023-CS-001234',
            signature: 'Valid',
            blockchain: 'Verified on Ethereum'
          });
        }
      }, 2000);
    }
  };

  const handleTextVerification = () => {
    setVerificationState('verifying');
    
    setTimeout(() => {
      setVerificationState('success');
      setCredentialData({
        type: 'Professional Certificate',
        issuer: 'Amazon Web Services',
        holder: 'Jane Smith',
        issueDate: '2023-08-20',
        credentialId: 'AWS-SAP-2023-5678',
        signature: 'Valid',
        blockchain: 'Verified on Polygon'
      });
    }, 1500);
  };

  const resetVerification = () => {
    setVerificationState('idle');
    setCredentialData(null);
  };

  const renderVerificationResult = () => {
    switch (verificationState) {
      case 'verifying':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h3 className="text-xl font-semibold text-white">Verifying Credential...</h3>
            <p className="text-white/70">Please wait while we verify the authenticity of this credential.</p>
          </div>
        );

      case 'success':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Credential Verified ✓</h3>
              <p className="text-emerald-400">This credential is authentic and valid</p>
            </div>
            
            {credentialData && (
              <div className="glass rounded-xl p-6 border border-emerald-500/30">
                <h4 className="text-lg font-semibold text-white mb-4">Credential Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Type:</span>
                    <p className="text-white font-medium">{credentialData.type}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Issuer:</span>
                    <p className="text-white font-medium">{credentialData.issuer}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Holder:</span>
                    <p className="text-white font-medium">{credentialData.holder}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Issue Date:</span>
                    <p className="text-white font-medium">{credentialData.issueDate}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Credential ID:</span>
                    <p className="text-white font-medium font-mono text-xs">{credentialData.credentialId}</p>
                  </div>
                  <div>
                    <span className="text-white/60">Blockchain:</span>
                    <p className="text-emerald-400 font-medium">{credentialData.blockchain}</p>
                  </div>
                </div>
              </div>
            )}
            
            <Button
              onClick={resetVerification}
              variant="ghost"
              className="w-full text-white hover:bg-white/10"
            >
              Verify Another Credential
            </Button>
          </div>
        );

      case 'invalid':
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <XCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Verification Failed</h3>
            <p className="text-red-400">This credential could not be verified or may be invalid</p>
            <div className="glass rounded-xl p-6 border border-red-500/30">
              <div className="flex items-center space-x-3 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span>Possible issues:</span>
              </div>
              <ul className="text-white/70 text-sm mt-3 space-y-1">
                <li>• Credential has been revoked</li>
                <li>• Invalid digital signature</li>
                <li>• Issuer not recognized</li>
                <li>• Credential format not supported</li>
              </ul>
            </div>
            <Button
              onClick={resetVerification}
              variant="ghost"
              className="w-full text-white hover:bg-white/10"
            >
              Try Again
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Verify Credential</h1>
          <p className="text-white/70 text-lg">Verify the authenticity of any digital credential</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-white/10">
          {verificationState === 'idle' ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Upload Credential File</h3>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.json,.jwt"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-white font-medium">Click to upload</span>
                      <span className="text-white/70"> or drag and drop</span>
                    </label>
                    <p className="text-white/50 text-sm mt-2">PDF, JSON, or JWT files</p>
                  </div>
                </div>

                {/* Text Input */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Paste Credential Data</h3>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Paste credential JSON or JWT token here..."
                      className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder:text-white/50 resize-none"
                    />
                    <Button
                      onClick={handleTextVerification}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      Verify Credential
                    </Button>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">What can you verify?</h4>
                    <ul className="text-white/70 text-sm space-y-1">
                      <li>• Digital certificates and diplomas</li>
                      <li>• Professional certifications</li>
                      <li>• Government-issued IDs</li>
                      <li>• Any W3C Verifiable Credential</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderVerificationResult()
          )}
        </div>

        {/* Recent Verifications */}
        {verificationState === 'idle' && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Verifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { type: 'University Diploma', issuer: 'Stanford', status: 'verified', time: '2 hours ago' },
                { type: 'AWS Certificate', issuer: 'Amazon', status: 'verified', time: '1 day ago' },
                { type: 'Driver License', issuer: 'CA DMV', status: 'invalid', time: '3 days ago' }
              ].map((item, index) => (
                <div key={index} className="glass rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{item.type}</h4>
                    {item.status === 'verified' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-white/70 text-sm">{item.issuer}</p>
                  <p className="text-white/50 text-xs mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCredential;
