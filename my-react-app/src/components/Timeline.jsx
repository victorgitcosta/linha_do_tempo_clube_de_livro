import React, { useState, useEffect } from 'react';
import { timelineData } from '../data/TimelineData';
import './Timeline.css';

const Timeline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemWidth = 200; // Must match CSS --item-width

    const goToIndex = (index) => {
        if (index >= 0 && index < timelineData.length) {
            setCurrentIndex(index);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') goToIndex(currentIndex + 1);
            if (e.key === 'ArrowLeft') goToIndex(currentIndex - 1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    return (
        <div className="timeline-container">
            {/* 1. Content Display (Top Half) */}
            <div className="content-section">
                
                {/* Book Cover Image */}
                {timelineData[currentIndex].image && (
                    <img 
                        src={timelineData[currentIndex].image} 
                        alt={timelineData[currentIndex].title} 
                        className="book-cover" 
                    />
                )}

                <h1>{timelineData[currentIndex].title}</h1>
                <p>{timelineData[currentIndex].desc}</p>
            </div>

            {/* 2. Navigation Slider (Bottom Half) */}
            <div className="timenav-container">
                <div 
                    className="timenav-slider" 
                    style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
                >
                    {timelineData.map((item, index) => (
                        <div 
                            key={index} 
                            className={`nav-item ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => goToIndex(index)}
                        >
                            <span>{item.month}</span>
                            <div className="dot"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;