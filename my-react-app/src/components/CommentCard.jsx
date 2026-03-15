const CommentCard = ({author, date, text}) => {
    return (
        <div className="comment-card">
            <p className="comment-text">"{text}"</p>
            <span className="comment-author">{author}</span>
        </div>
    );
};

export default CommentCard;