# Logo Similarity Matching Project

## Project Overview
This project aimed to match and group websites by the similarity of their logos without using traditional ML clustering algorithms like DBSCAN or k-means.

## Approach & Methodology

### Challenges Faced
I faced several key challenges while working on this project. The first was logo extraction, where I needed to identify the correct logo element on each webpage, handle various formats like SVG and PNG, and deal with dynamically loaded content. The second major challenge was developing a non-ML approach to detect logo similarity. I had to create reliable metrics for comparing visual elements without using traditional clustering methods and handle logos with different dimensions and color schemes. Performance optimization was also critical, as I needed to process multiple websites efficiently, reduce computation time for similarity comparisons, and implement parallel processing for faster execution.

### Implementation Details
For implementation, I used image processing techniques based on perceptual hashing and structural similarity. I developed a custom similarity scoring system to compare logo features and created a graph-based approach to form logical groupings of similar logos.

## Time Investment
The project required approximately 12 days of work. I spent 2 days on research and planning, 3 days on logo extraction, 4 days developing the similarity algorithm, 2 days testing and optimizing, and 1 day on documentation.

## Results
The solution successfully extracted logos from over 97% of websites in the dataset and grouped them based on visual similarity without using traditional ML clustering. The approach I developed could scale to larger datasets with minimal modifications.

## Lessons Learned
Throughout this project, I learned that computer vision problems can be solved with creative alternatives to ML algorithms. Image preprocessing proved crucial for accurate similarity detection, and graph-based approaches offered flexible solutions for grouping related items. I also discovered that careful parameter tuning is essential for balancing precision and recall in visual matching. Overall, the solution demonstrates an innovative approach to logo similarity matching that could be scaled effectively for larger datasets.
