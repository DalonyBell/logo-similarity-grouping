
import React, { useState } from 'react';
import { Logo } from '../types';

interface LogoCardProps {
  logo: Logo;
  isGrouped?: boolean;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo, isGrouped = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  
  const handleImageError = () => {
    setHasError(true);
  };
  
  // Format the domain from the URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch (error) {
      return url;
    }
  };
  
  return (
    <div 
      className={`
        overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 
        border border-border rounded-xl shadow-soft hover:shadow-md
        ${isGrouped ? 'h-40' : 'h-60'}
      `}
    >
      <div className="relative w-full h-3/5 bg-secondary/50 flex items-center justify-center overflow-hidden">
        {!isImageLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 animate-pulse">
            <svg
              className="w-8 h-8 text-muted"
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
              <rect width="18" height="10" x="3" y="7" rx="2" />
              <path d="M7 7V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3" />
              <path d="M7 13h.01" />
              <path d="M17 13h.01" />
              <rect width="6" height="1" x="9" y="11.5" rx=".5" />
            </svg>
          </div>
        )}
        
        {hasError ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
            <svg
              className="w-8 h-8 mb-2"
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
            <span className="text-xs text-center">Logo unavailable</span>
          </div>
        ) : (
          <img
            src={logo.imageUrl}
            alt={`Logo for ${getDomain(logo.websiteUrl)}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`
              max-w-full max-h-full object-contain p-4
              transition-opacity duration-500
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="truncate text-sm font-medium">
          {getDomain(logo.websiteUrl)}
        </div>
        
        <div className="flex items-center mt-2 text-xs text-muted-foreground">
          <svg
            className="w-3.5 h-3.5 mr-1"
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
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <a 
            href={logo.websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="truncate hover:text-foreground transition-colors"
          >
            {logo.websiteUrl}
          </a>
        </div>
        
        {logo.similarityScore !== undefined && (
          <div className="mt-2">
            <div className="text-xs text-muted-foreground flex items-center">
              <span className="mr-2">Similarity:</span>
              <div className="w-24 bg-secondary rounded-full h-1.5">
                <div 
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${logo.similarityScore * 100}%` }}
                />
              </div>
              <span className="ml-2">{Math.round(logo.similarityScore * 100)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoCard;
