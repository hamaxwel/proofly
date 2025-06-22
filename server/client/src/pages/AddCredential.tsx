
import React, { useState } from 'react';
import { Upload, FileText, Award, GraduationCap, CreditCard, Plus, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';

const AddCredential = () => {
  const [step, setStep] = useState(1);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'manual' | null>(null);
  const [credentialData, setCredentialData] = useState({
    type: '',
    issuer: '',
    description: '',
    issueDate: '',
    file: null as File | null
  });

  const credentialTypes = [
    { name: 'Academic Diploma', icon: GraduationCap, gradient: 'from-blue-500 to-purple-500' },
    { name: 'Professional Certificate', icon: Award, gradient: 'from-emerald-500 to-blue-500' },
    { name: 'Government ID', icon: CreditCard, gradient: 'from-orange-500 to-red-500' },
    { name: 'Other Document', icon: FileText, gradient: 'from-purple-500 to-pink-500' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCredentialData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = () => {
    // Simulate credential creation
    setStep(4);
    setTimeout(() => {
      // Redirect to credentials page
      window.location.href = '/credentials';
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">How would you like to add your credential?</h2>
              <p className="text-white/70">Choose the method that works best for you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => { setUploadMethod('file'); setStep(2); }}
                className="glass rounded-2xl p-8 hover-lift hover:scale-105 transition-all duration-300 border border-white/10 group"
              >
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Upload File</h3>
                <p className="text-white/70">Upload a digital credential file (PDF, JSON, JWT)</p>
              </button>
              
              <button
                onClick={() => { setUploadMethod('manual'); setStep(2); }}
                className="glass rounded-2xl p-8 hover-lift hover:scale-105 transition-all duration-300 border border-white/10 group"
              >
                <Plus className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-2">Manual Entry</h3>
                <p className="text-white/70">Enter credential details manually</p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Select Credential Type</h2>
              <p className="text-white/70">What type of credential are you adding?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {credentialTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCredentialData(prev => ({ ...prev, type: type.name }));
                    setStep(3);
                  }}
                  className="glass rounded-xl p-6 hover-lift hover:scale-105 transition-all duration-300 border border-white/10 group text-left"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${type.gradient} p-0.5 mb-3 group-hover:animate-glow`}>
                    <div className="w-full h-full bg-black/50 rounded-lg flex items-center justify-center">
                      <type.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {type.name}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Credential Details</h2>
              <p className="text-white/70">
                {uploadMethod === 'file' ? 'Upload your credential file' : 'Enter credential information'}
              </p>
            </div>
            
            <div className="glass rounded-2xl p-8 border border-white/10">
              {uploadMethod === 'file' ? (
                <div className="space-y-6">
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
                    <p className="text-white/50 text-sm mt-2">PDF, JSON, or JWT files only</p>
                  </div>
                  
                  {credentialData.file && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-white">Selected: {credentialData.file.name}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="issuer" className="text-white/90">Issuing Organization</Label>
                    <Input
                      id="issuer"
                      placeholder="e.g., MIT, AWS, California DMV"
                      value={credentialData.issuer}
                      onChange={(e) => setCredentialData(prev => ({ ...prev, issuer: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-white/90">Description</Label>
                    <Input
                      id="description"
                      placeholder="Brief description of the credential"
                      value={credentialData.description}
                      onChange={(e) => setCredentialData(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="issueDate" className="text-white/90">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={credentialData.issueDate}
                      onChange={(e) => setCredentialData(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="text-white hover:bg-white/10 flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={uploadMethod === 'file' ? !credentialData.file : !credentialData.issuer}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white flex-1"
                >
                  Add Credential
                </Button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Credential Added Successfully!</h2>
              <p className="text-white/70">Your credential has been securely stored and is ready to use.</p>
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step >= num
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {step > num ? <CheckCircle className="w-4 h-4" /> : num}
              </div>
            ))}
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default AddCredential;
