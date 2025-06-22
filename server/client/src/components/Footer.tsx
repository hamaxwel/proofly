
import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="p-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">Haven</span>
          </div>
          
          <div className="flex items-center space-x-6 text-white/70 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-white/60 text-sm">
          © 2024 Haven. All rights reserved. Own your digital identity.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
