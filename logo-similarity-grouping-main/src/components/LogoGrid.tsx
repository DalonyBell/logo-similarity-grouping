
import React from 'react';
import { LogoGroup as LogoGroupType } from '../types';
import LogoGroup from './LogoGroup';

interface LogoGridProps {
  groups: LogoGroupType[];
}

const LogoGrid: React.FC<LogoGridProps> = ({ groups }) => {
  if (groups.length === 0) return null;
  
  return (
    <div className="space-y-8 animate-slide-up pb-16">
      <div className="glass-card p-6">
        <h2 className="text-xl font-medium mb-4">Results Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Groups</div>
            <div className="text-3xl font-medium">{groups.length}</div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total Logos</div>
            <div className="text-3xl font-medium">
              {groups.reduce((acc, group) => acc + group.logos.length, 0)}
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Similarity Match</div>
            <div className="text-3xl font-medium">
              {Math.round(groups.reduce((acc, group) => 
                acc + group.similarityThreshold, 0) / groups.length * 100)}%
            </div>
          </div>
        </div>
      </div>
      
      {groups.map(group => (
        <LogoGroup key={group.id} group={group} />
      ))}
    </div>
  );
};

export default LogoGrid;
