const RightColumn = ({ data }) => {
    // Преобразуем строку в массив URL
    const screenshots = data.short_screenshots
        .split(', ') // Разделяем строку по ", "
        .map(url => url.trim()); // Убираем лишние пробелы


    return (
        <div className="right-column">
            {(screenshots.length > 0 && screenshots[0] != 'No data') && (
                <div className="gallary">
                    <p>Gallary</p>
                    <div className="gridImages">
                        {/* Галерея из трех скриншотов */}
                        {screenshots.slice(1, 4).map((screenshot, index) => (
                            <img
                                key={index}
                                src={screenshot}
                                alt={`Screenshot ${index + 1}`}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        ))}
                    </div>
                    <div className="btn-gallary">
                        <button>Gallary</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightColumn;
