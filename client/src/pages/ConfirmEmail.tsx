
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';

const ConfirmEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => setIsResending(false), 2000);
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <AuthLayout 
        title="Email confirmed!" 
        subtitle="Your account has been successfully verified"
        showBackButton={false}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          
          <div className="space-y-3">
            <p className="text-white/80">
              Welcome to Haven! Your email has been verified and your account is now active.
            </p>
            <p className="text-white/60 text-sm">
              You can now access all features of your digital identity platform.
            </p>
          </div>

          <Link to="/signin">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Continue to Dashboard
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Confirm your email" 
      subtitle="We've sent a confirmation link to your email address"
      showBackButton={false}
    >
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-purple-400" />
        </div>
        
        <div className="space-y-3">
          <p className="text-white/80">
            Please check your email and click the confirmation link to activate your account.
          </p>
          <p className="text-white/60 text-sm">
            Check your spam folder if you don't see the email.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleResend}
            disabled={isResending}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/5"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend confirmation email'
            )}
          </Button>
          
          {/* Temporary button for demo purposes */}
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Simulate Email Confirmation
          </Button>
        </div>

        <div className="text-center">
          <Link 
            to="/signin" 
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ConfirmEmail;
