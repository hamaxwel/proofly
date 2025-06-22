
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Share2, Download, Trash2, Award, GraduationCap, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import CredentialCard from '@/components/CredentialCard';

const Credentials = () => {
  const [credentials] = useState([
    {
      id: 1,
      type: "University Diploma",
      issuer: "MIT",
      issueDate: "2023-05-15",
      status: "verified",
      icon: GraduationCap,
      gradient: "from-blue-500 to-purple-500",
      description: "Bachelor of Science in Computer Science"
    },
    {
      id: 2,
      type: "Professional Certificate",
      issuer: "AWS",
      issueDate: "2023-08-20",
      status: "verified",
      icon: Award,
      gradient: "from-emerald-500 to-blue-500",
      description: "AWS Solutions Architect Professional"
    },
    {
      id: 3,
      type: "Driver's License",
      issuer: "CA DMV",
      issueDate: "2022-03-10",
      status: "verified",
      icon: CreditCard,
      gradient: "from-orange-500 to-red-500",
      description: "Class C Driver's License"
    },
    {
      id: 4,
      type: "Health Certificate",
      issuer: "City Health Dept",
      issueDate: "2023-11-01",
      status: "pending",
      icon: FileText,
      gradient: "from-green-500 to-emerald-500",
      description: "COVID-19 Vaccination Certificate"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Credentials</h1>
            <p className="text-white/70">Manage and share your verified credentials securely</p>
          </div>
          <Link to="/add-credential">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Credential
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-white">{credentials.length}</div>
            <div className="text-white/70">Total Credentials</div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-emerald-400">{credentials.filter(c => c.status === 'verified').length}</div>
            <div className="text-white/70">Verified</div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">{credentials.filter(c => c.status === 'pending').length}</div>
            <div className="text-white/70">Pending</div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-purple-400">12</div>
            <div className="text-white/70">Times Shared</div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((credential, index) => (
            <CredentialCard
              key={credential.id}
              credential={credential}
              animationDelay={index * 100}
            />
          ))}
        </div>

        {/* Empty State */}
        {credentials.length === 0 && (
          <div className="glass rounded-2xl p-12 border border-white/10 text-center">
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No credentials yet</h3>
            <p className="text-white/70 mb-6">Add your first credential to get started with Haven</p>
            <Link to="/add-credential">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Credential
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Credentials;
