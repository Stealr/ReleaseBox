const RightColumn = ({ data }) => (
    <div className="right-column">
        <div className="gallary">
            <p>Gallary</p>
            <div className="gridImages">
                {/* Здесь будет отображение галереи */}
            </div>
            <div className="btn-gallary">
                <button>Gallary</button>
            </div>
        </div>
        <div className="stores">
            <p>Stores:</p>
            {/* Отобразите доступные магазины */}
        </div>
    </div>
);

export default RightColumn