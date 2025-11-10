import React, { useState, useEffect } from 'react';
import './DescriptionCarousel.css';

interface DescriptionCarouselProps {
  pages: React.ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

const DescriptionCarousel: React.FC<DescriptionCarouselProps> = ({
  pages,
  autoplay = true,
  autoplayDelay = 5000,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!autoplay || pages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, pages.length]);

  const goToPage = (index: number) => {
    setCurrentPage(index);
  };

  if (pages.length === 0) return null;
  if (pages.length === 1) return <div className="description-content">{pages[0]}</div>;

  return (
    <div className="description-carousel">
      <div className="description-content">
        {pages[currentPage]}
      </div>
      <div className="description-indicators">
        {pages.map((_, index) => (
          <button
            key={index}
            className={`description-dot ${index === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(index)}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DescriptionCarousel;