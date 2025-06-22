
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from '@/components/AuthLayout';

const TwoFactorAuth = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleComplete = (value: string) => {
    setCode(value);
    if (value.length === 6) {
      // Auto-submit when code is complete
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <AuthLayout 
      title="Two-Factor Authentication" 
      subtitle="Enter the 6-digit code from your authenticator app"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              onComplete={handleComplete}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-white/5 border-white/20 text-white" />
                <InputOTPSlot index={1} className="bg-white/5 border-white/20 text-white" />
                <InputOTPSlot index={2} className="bg-white/5 border-white/20 text-white" />
                <InputOTPSlot index={3} className="bg-white/5 border-white/20 text-white" />
                <InputOTPSlot index={4} className="bg-white/5 border-white/20 text-white" />
                <InputOTPSlot index={5} className="bg-white/5 border-white/20 text-white" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <p className="text-center text-white/60 text-sm">
            Open your authenticator app and enter the 6-digit code
          </p>
        </div>

        <Button
          type="submit"
          disabled={isLoading || code.length !== 6}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white h-12 text-lg font-semibold"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </Button>

        <div className="text-center space-y-3">
          <button
            type="button"
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            Didn't receive a code? Resend
          </button>
          
          <div>
            <Link 
              to="/signin" 
              className="text-white/70 hover:text-white transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default TwoFactorAuth;
