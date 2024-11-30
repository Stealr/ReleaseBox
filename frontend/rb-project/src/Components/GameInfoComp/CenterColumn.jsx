const CenterColumn = ({ data }) => (
    <div className="center-column">
        <h2>{data.name}</h2>
        <div className="info">
            {["Platform", "Genres", "Developers", "Publishers", "Released", "Game mode"].map((field) => (
                <div className="block" key={field}>
                    <p className="info-header">{field}:</p>
                    <p className="info-text">{data[field.toLowerCase()] || "N/A"}</p>
                </div>
            ))}
        </div>
    </div>
);

export default CenterColumn