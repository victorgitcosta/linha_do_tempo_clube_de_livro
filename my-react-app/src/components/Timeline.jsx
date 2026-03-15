import React, { useState, useEffect } from 'react';
import { timelineData } from '../data/TimelineData';
import './Timeline.css';
import { commentsData } from "../data/CommentsData";
import CommentCard from "./CommentCard";

const Timeline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemWidth = 200;
    const [showHint, setShowHint] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const goToIndex = (index) => {
        if (index >= 0 && index < timelineData.length) {
            setCurrentIndex(index);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') goToIndex(currentIndex + 1);
            if (e.key === 'ArrowLeft') goToIndex(currentIndex - 1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    const currentItem = timelineData[currentIndex];
    const bookComments = commentsData.filter(c => c.book === currentItem.title);
    const isEven = currentIndex % 2 === 0;

    const bookBlock = (
        <div className="book-center">
            {currentItem.image && (
                <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="book-cover"
                />
            )}
            <h1>{currentItem.title}</h1>
            <p>{currentItem.desc}</p>
        </div>
    );

    const commentsBlock = (
        <div className="comments-column">
            {bookComments.map(comment => (
                <CommentCard key={comment.id} {...comment} />
            ))}
        </div>
    );

    return (
        <div className="timeline-wrapper">

            {/* 1. Content Display */}
            <div className="content-section">
                {isEven ? bookBlock : commentsBlock}
                {isEven ? commentsBlock : bookBlock}
            </div>

            {/* 2. Navigation Slider — always at bottom */}
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
            {showHint && (
                <div className="keyboard-hint" onClick={()=> setShowHint(false)}>
                    <span>Use também as teclas direcionais</span>
                    <kbd>←</kbd>
                    <kbd>→</kbd>
                    <span>para navegar a linha do tempo</span>
                    <button className="hint-close">✕</button>
                </div>      
            )}
        </div>
    );
};

export default Timeline;