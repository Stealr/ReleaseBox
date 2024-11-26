import React, { useState } from "react";
import "./sorts.css";

const SortButtons = () => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const cancelSort = () => {
        setSortField(null)
        setSortOrder(null)
    }

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <div className="sort-buttons">
            {["Name", "Rating", "Date", "Old"].map((field) => (
                <button
                    key={field}
                    className={`sort-button ${sortField === field ? `active-${sortOrder}` : ""
                        }`}
                    onClick={() => handleSort(field)}
                >
                    {sortField === field ? (
                        sortOrder === "asc" ? (
                            <span>▲ {field}</span>
                        ) : (
                            <span>▼ {field}</span>
                        )
                    ) : (
                        <span>{field}</span>
                    )}
                </button>
            ))}
            <button className="btn-cancel" onClick={cancelSort}>Cancel</button>
        </div>
    );
};

export default SortButtons;
