
import React, { useState } from 'react';
import { Eye, Share2, Download, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Credential {
  id: number;
  type: string;
  issuer: string;
  issueDate: string;
  status: string;
  icon: React.ComponentType<any>;
  gradient: string;
  description: string;
}

interface CredentialCardProps {
  credential: Credential;
  animationDelay?: number;
}

const CredentialCard = ({ credential, animationDelay = 0 }: CredentialCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-emerald-400 bg-emerald-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div
      className="group glass rounded-2xl p-6 hover-lift hover:scale-105 transition-all duration-300 border border-white/10 relative"
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${credential.gradient} p-0.5 group-hover:animate-glow`}>
          <div className="w-full h-full bg-black/50 rounded-xl flex items-center justify-center">
            <credential.icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(credential.status)}`}>
          {credential.status}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
        {credential.type}
      </h3>
      <p className="text-white/70 text-sm mb-2">{credential.description}</p>
      <div className="flex justify-between text-sm text-white/50 mb-4">
        <span>Issued by {credential.issuer}</span>
        <span>{new Date(credential.issueDate).toLocaleDateString()}</span>
      </div>

      {/* Actions */}
      <div className={`flex space-x-2 transition-all duration-300 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 flex-1">
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 flex-1">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
          <Download className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/20">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CredentialCard;
