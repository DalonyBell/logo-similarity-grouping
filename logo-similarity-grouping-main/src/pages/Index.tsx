
import React, { useState } from 'react';
import Header from '../components/Header';
import LogoExtractor from '../components/LogoExtractor';
import LogoGrid from '../components/LogoGrid';
import { Logo, LogoGroup, ProcessStatus } from '../types';
import { groupLogosBySimilarity } from '../utils/similarity';

const Index = () => {
  const [logoGroups, setLogoGroups] = useState<LogoGroup[]>([]);
  const [status, setStatus] = useState<ProcessStatus>({ state: 'idle' });
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.5);
  
  const handleExtractComplete = (logoUrlsJson: string[]) => {
    setStatus({ state: 'processing', message: 'Analyzing logo similarities...', progress: 0 });
    
    // Parse logo JSON data
    const logos: Logo[] = logoUrlsJson.map(jsonStr => JSON.parse(jsonStr));
    
    // Processing happens with a slight delay to show the animation
    setTimeout(() => {
      try {
        // Group logos by similarity
        const groups = groupLogosBySimilarity(logos, similarityThreshold);
        setLogoGroups(groups);
        setStatus({ 
          state: 'success', 
          message: `Successfully analyzed ${logos.length} logos and found ${groups.length} groups.` 
        });
      } catch (error) {
        console.error('Error grouping logos:', error);
        setStatus({ 
          state: 'error', 
          message: 'Failed to analyze logo similarities.' 
        });
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-down">
            <h1 className="text-4xl font-bold mb-4">Logo Similarity Analysis</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Extract and analyze logos from websites to identify visual similarities and group them 
              based on their appearance and branding elements.
            </p>
          </div>
          
          <div className="mb-12">
            <LogoExtractor 
              onExtractComplete={handleExtractComplete} 
              setStatus={setStatus}
              status={status}
            />
          </div>
          
          {status.state === 'processing' && (
            <div className="glass-card p-8 text-center animate-fade-in">
              <div className="loader mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Analyzing Logo Similarities</h3>
              <p className="text-muted-foreground">
                Comparing visual features and grouping similar logos...
              </p>
            </div>
          )}
          
          {status.state === 'success' && (
            <div className="flex flex-col space-y-2 mb-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">Grouped Results</h2>
                
                <div className="flex items-center space-x-4">
                  <label htmlFor="threshold" className="text-sm text-muted-foreground">
                    Similarity Threshold: {Math.round(similarityThreshold * 100)}%
                  </label>
                  <input
                    id="threshold"
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.1"
                    value={similarityThreshold}
                    onChange={(e) => {
                      const newThreshold = parseFloat(e.target.value);
                      setSimilarityThreshold(newThreshold);
                      
                      // Regroup with new threshold
                      if (logoGroups.length > 0) {
                        // Get all logos from all groups
                        const allLogos = logoGroups.flatMap(group => group.logos);
                        // Regroup with new threshold
                        const newGroups = groupLogosBySimilarity(allLogos, newThreshold);
                        setLogoGroups(newGroups);
                      }
                    }}
                    className="w-32 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6">
                Logos are grouped based on visual similarity with a threshold of {Math.round(similarityThreshold * 100)}%
              </p>
            </div>
          )}
          
          <LogoGrid groups={logoGroups} />
          
          {status.state === 'error' && (
            <div className="glass-card p-8 text-center text-destructive animate-fade-in">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-destructive"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
              <h3 className="text-xl font-medium mb-2">Processing Error</h3>
              <p className="text-muted-foreground">
                {status.message || 'An error occurred during processing. Please try again.'}
              </p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t border-border bg-secondary/30">
        <div className="container flex flex-col md:flex-row justify-between items-center px-4">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 Logo Similarity Analysis Tool
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
