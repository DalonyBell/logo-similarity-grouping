
import React from 'react';
import { LogoGroup as LogoGroupType } from '../types';
import LogoCard from './LogoCard';
import { Badge } from './ui/badge';

interface LogoGroupProps {
  group: LogoGroupType;
}

const LogoGroup: React.FC<LogoGroupProps> = ({ group }) => {
  if (group.logos.length === 0) return null;
  
  // Color variations for different groups
  const colorClasses = [
    'from-purple-100 to-indigo-100 border-purple-200',
    'from-pink-100 to-rose-100 border-pink-200',
    'from-blue-100 to-cyan-100 border-blue-200',
    'from-emerald-100 to-teal-100 border-emerald-200',
    'from-amber-100 to-yellow-100 border-amber-200',
  ];
  
  // Select a color based on group id
  const colorIndex = parseInt(group.id.replace(/[^0-9]/g, '0')) % colorClasses.length;
  const colorClass = colorClasses[colorIndex];
  
  const similarityPercentage = Math.round(group.similarityThreshold * 100);
  
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${colorClass} p-0.5 shadow-lg transition-all duration-300 animate-fade-in`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="bg-primary/90 hover:bg-primary text-white px-3 py-1">
              Group {group.id}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {group.logos.length} {group.logos.length === 1 ? 'logo' : 'logos'}
            </span>
          </div>
          
          <div className="flex items-center text-xs">
            <span className="text-muted-foreground">Similarity threshold:</span>
            <div className="ml-2 flex items-center">
              <Badge variant="secondary" className="font-medium">
                {similarityPercentage}%
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {group.logos.map(logo => (
            <LogoCard key={logo.id} logo={logo} isGrouped />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoGroup;
