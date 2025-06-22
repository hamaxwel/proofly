
import React, { useState } from 'react';
import { Search, Filter, Download, CheckCircle, Share2, Eye, Plus, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';

const ActivityLog = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activities = [
    {
      id: 1,
      action: 'Credential Added',
      type: 'University Diploma',
      issuer: 'MIT',
      timestamp: '2023-12-10T14:30:00Z',
      status: 'success',
      icon: Plus,
      color: 'emerald'
    },
    {
      id: 2,
      action: 'Credential Shared',
      type: 'AWS Certificate',
      recipient: 'TechCorp Inc.',
      timestamp: '2023-12-10T10:15:00Z',
      status: 'success',
      icon: Share2,
      color: 'blue'
    },
    {
      id: 3,
      action: 'Credential Verified',
      type: 'Driver License',
      verifier: 'Insurance Company',
      timestamp: '2023-12-09T16:45:00Z',
      status: 'success',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      id: 4,
      action: 'Credential Viewed',
      type: 'Health Certificate',
      viewer: 'City Health Dept',
      timestamp: '2023-12-09T12:20:00Z',
      status: 'success',
      icon: Eye,
      color: 'cyan'
    },
    {
      id: 5,
      action: 'Credential Deleted',
      type: 'Old Certificate',
      timestamp: '2023-12-08T09:10:00Z',
      status: 'warning',
      icon: Trash2,
      color: 'red'
    },
    {
      id: 6,
      action: 'Share Link Expired',
      type: 'Professional License',
      timestamp: '2023-12-07T18:30:00Z',
      status: 'info',
      icon: Clock,
      color: 'yellow'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-emerald-400 bg-emerald-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'error': return 'text-red-400 bg-red-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getActionColor = (color: string) => {
    const colors = {
      emerald: 'text-emerald-400',
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      cyan: 'text-cyan-400',
      red: 'text-red-400',
      yellow: 'text-yellow-400'
    };
    return colors[color as keyof typeof colors] || 'text-gray-400';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Less than an hour ago';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.action.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Activity Log</h1>
            <p className="text-white/70">Track all actions performed on your credentials</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white mt-4 sm:mt-0">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="glass rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg p-3 text-white"
              >
                <option value="all">All Activities</option>
                <option value="added">Added</option>
                <option value="shared">Shared</option>
                <option value="verified">Verified</option>
                <option value="viewed">Viewed</option>
                <option value="deleted">Deleted</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-white">{activities.length}</div>
            <div className="text-white/70">Total Activities</div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-emerald-400">
              {activities.filter(a => a.action.includes('Added')).length}
            </div>
            <div className="text-white/70">Credentials Added</div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">
              {activities.filter(a => a.action.includes('Shared')).length}
            </div>
            <div className="text-white/70">Times Shared</div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-purple-400">
              {activities.filter(a => a.action.includes('Verified')).length}
            </div>
            <div className="text-white/70">Verifications</div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="glass rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="p-6 hover:bg-white/5 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r from-${activity.color}-500 to-${activity.color}-600 flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 text-white`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-medium">{activity.action}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    
                    <p className="text-white/70 mb-2">{activity.type}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/50">
                        {activity.issuer && `Issuer: ${activity.issuer}`}
                        {activity.recipient && `Recipient: ${activity.recipient}`}
                        {activity.verifier && `Verifier: ${activity.verifier}`}
                        {activity.viewer && `Viewer: ${activity.viewer}`}
                      </div>
                      <span className="text-white/50">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="p-12 text-center">
              <Clock className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No activities found</h3>
              <p className="text-white/70">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
