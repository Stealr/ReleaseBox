const LeftColumn = ({ data }) => (
    <div className="left-column">
        <div className="coverImage">
            <img src={data.imageBackground} alt="Cover" />
        </div>
        <div className="ratingGame">
            <div className="ratings">
                <p>Rating</p>
                <div className="box-rating">
                    <p>{data.rating}</p>
                </div>
            </div>
            <div className="ratings">
                <p>Metacritic</p>
                <div className="box-metacritic">
                    <p>{data.metacritic || "N/A"}</p>
                </div>
            </div>
        </div>
    </div>
);

export default LeftColumn