
import React, { useState } from 'react';
import { ProcessStatus } from '../types';
import { extractLogosFromUrls } from '../utils/logoExtractor';
import { toast } from '../components/ui/use-toast';

interface LogoExtractorProps {
  onExtractComplete: (logoUrls: string[]) => void;
  setStatus: (status: ProcessStatus) => void;
  status: ProcessStatus;
}

const LogoExtractor: React.FC<LogoExtractorProps> = ({ 
  onExtractComplete, 
  setStatus,
  status 
}) => {
  const [urls, setUrls] = useState<string>('');
  const [urlList, setUrlList] = useState<string[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrls(e.target.value);
    
    // Parse URLs as they're typed
    const parsedUrls = e.target.value
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    setUrlList(parsedUrls);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (urlList.length === 0) {
      toast({
        title: "No URLs provided",
        description: "Please enter at least one website URL",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setStatus({ state: 'extracting', message: 'Extracting logos...', progress: 0 });
      
      // Simulate logo extraction for demo purposes
      // In a real app, this would actually fetch logos from the websites
      const logoUrls = await extractLogosFromUrls(urlList, (progress) => {
        setStatus({ 
          state: 'extracting', 
          message: `Extracting logos (${Math.round(progress * 100)}%)...`, 
          progress 
        });
      });
      
      onExtractComplete(logoUrls);
      
    } catch (error) {
      console.error('Error extracting logos:', error);
      setStatus({ 
        state: 'error', 
        message: 'Failed to extract logos. Please try again.' 
      });
      
      toast({
        title: "Extraction failed",
        description: "Failed to extract logos from the provided URLs.",
        variant: "destructive",
      });
    }
  };
  
  const isProcessing = status.state === 'extracting' || status.state === 'processing';
  
  // Sample websites for the placeholder
  const placeholderText = `https://apple.com
https://google.com
https://microsoft.com
https://amazon.com
https://facebook.com`;
  
  return (
    <div className="w-full max-w-2xl mx-auto glass-card p-8 animate-scale-in">
      <h2 className="text-2xl font-medium mb-2">Website Logo Extractor</h2>
      <p className="text-muted-foreground mb-6">
        Enter website URLs (one per line) to extract and analyze their logos.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="urls" className="text-sm font-medium">
            Website URLs
          </label>
          <textarea
            id="urls"
            value={urls}
            onChange={handleInputChange}
            disabled={isProcessing}
            placeholder={placeholderText}
            className="w-full min-h-32 p-4 bg-secondary/50 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 resize-y"
            rows={6}
          />
          <p className="text-sm text-muted-foreground">
            {urlList.length} {urlList.length === 1 ? 'URL' : 'URLs'} detected
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex-1">
            {status.progress !== undefined && status.progress > 0 && status.progress < 1 && (
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-300 ease-out"
                  style={{ width: `${status.progress * 100}%` }}
                />
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isProcessing || urlList.length === 0}
            className="btn px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 rounded-lg ml-4 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isProcessing ? (
              <span className="flex items-center">
                <span className="loader mr-2"></span>
                Processing...
              </span>
            ) : (
              'Extract Logos'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogoExtractor;
