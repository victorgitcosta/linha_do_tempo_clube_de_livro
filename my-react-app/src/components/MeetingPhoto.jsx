const MeetingPhoto = ({ image }) => {
    const handleLoad = (e) => {
        const img = e.target;
        if (img.naturalHeight > img.naturalWidth) {
            img.classList.add('portrait');
        } else {
            img.classList.add('landscape');
        }
    };

    return (
        <div className="meeting-photo">
            <img
                src={image}
                alt="Foto do encontro"
                className="meeting-photo-img"
                onLoad={handleLoad}
            />
        </div>
    );
};

export default MeetingPhoto;