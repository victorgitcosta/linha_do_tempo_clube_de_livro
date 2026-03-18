import React, { useState, useEffect, useRef } from 'react';
import { timelineData } from '../data/TimelineData';
import './Timeline.css';
import { commentsData } from "../data/CommentsData";
import CommentCard from "./CommentCard";
import MeetingPhoto from './MeetingPhoto';
import { meetingsData } from "../data/MeetingsData";

const Timeline = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHint, setShowHint] = useState(true);
    const navRef = useRef(null);
    const touchStartX = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll active nav item into center when index changes
    useEffect(() => {
        if (navRef.current) {
            const activeItem = navRef.current.querySelector('.nav-item.active');
            if (activeItem) {
                activeItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [currentIndex]);

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

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) goToIndex(currentIndex + 1);
        if (diff < -50) goToIndex(currentIndex - 1);
        touchStartX.current = null;
    };

    const currentItem = timelineData[currentIndex];
    const bookComments = commentsData.filter(c => c.book === currentItem.title);
    const isEven = currentIndex % 2 === 0;
    const currentMeeting = meetingsData[currentIndex];

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
            {currentMeeting?.image && (
                <MeetingPhoto image={currentMeeting.image} />
            )}
        </div>
    );

    return (
        <div className="timeline-wrapper" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

            {/* 1. Content Display */}
            <div className="content-section">

                <div className={`col-primary ${isEven ? 'order-book' : 'order-comments'}`}>
                    {isEven ? bookBlock : commentsBlock}
                </div>

                <div className={`col-secondary ${isEven ? 'order-comments' : 'order-book'}`}>
                    {isEven ? commentsBlock : bookBlock}
                </div>

            </div>

            {/* 2. Navigation Slider */}
            <div className="timenav-container" ref={navRef}>
                <div className="timenav-slider">
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
                <div className="keyboard-hint" onClick={() => setShowHint(false)}>
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