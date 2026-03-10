import React from 'react';
import './SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer"></div>
      <div className="skeleton-body">
        <div className="skeleton-line shimmer"></div>
        <div className="skeleton-line short shimmer"></div>
        <div className="skeleton-price shimmer"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
