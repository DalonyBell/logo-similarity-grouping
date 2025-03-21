
import { Logo, LogoGroup } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Similarity calculation would ideally be done with image processing libraries
// For this demo, we'll simulate similarity with a simple algorithm

// Function to simulate similarity between two logos
const calculateSimilarity = (logo1: Logo, logo2: Logo): number => {
  // In a real implementation, this would use computer vision techniques to compare logos
  // For this demo, we'll use a simple domain-based similarity
  
  try {
    const domain1 = new URL(logo1.websiteUrl).hostname.replace('www.', '');
    const domain2 = new URL(logo2.websiteUrl).hostname.replace('www.', '');
    
    // If first-level domains match (e.g., example.com and sub.example.com)
    const domain1Parts = domain1.split('.');
    const domain2Parts = domain2.split('.');
    
    // Get TLD and domain name
    const domain1Main = domain1Parts.slice(-2).join('.');
    const domain2Main = domain2Parts.slice(-2).join('.');
    
    if (domain1Main === domain2Main) {
      // If exact domains match, high similarity
      if (domain1 === domain2) {
        return 0.95;
      }
      // If main domain matches but subdomains differ
      return 0.7;
    }
    
    // Check for common words in domains
    const words1 = domain1.split(/[\.\-]/);
    const words2 = domain2.split(/[\.\-]/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    if (commonWords.length > 0) {
      return 0.3 + (commonWords.length * 0.2);
    }
    
    // Random similarity for demo purposes
    // In a real app, this would be based on image features
    return Math.random() * 0.3;
  } catch {
    return 0;
  }
};

// Function to group logos by similarity
export const groupLogosBySimilarity = (logos: Logo[], threshold = 0.5): LogoGroup[] => {
  const groups: LogoGroup[] = [];
  const processedLogos = new Set<string>();
  
  // Create a copy of logos with ID if not present
  const logosWithId = logos.map(logo => ({
    ...logo,
    id: logo.id || uuidv4()
  }));
  
  for (const logo of logosWithId) {
    // Skip if already processed
    if (processedLogos.has(logo.id)) continue;
    
    const group: Logo[] = [logo];
    processedLogos.add(logo.id);
    
    // Find similar logos
    for (const otherLogo of logosWithId) {
      if (logo.id === otherLogo.id || processedLogos.has(otherLogo.id)) continue;
      
      const similarity = calculateSimilarity(logo, otherLogo);
      
      if (similarity >= threshold) {
        group.push({
          ...otherLogo,
          similarityScore: similarity
        });
        processedLogos.add(otherLogo.id);
      }
    }
    
    // Only create a group if there are similar logos or single logos
    if (group.length > 0) {
      groups.push({
        id: uuidv4().substring(0, 4),
        logos: group,
        similarityThreshold: threshold
      });
    }
  }
  
  return groups;
};
