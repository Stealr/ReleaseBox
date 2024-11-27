import React, { useState } from "react";
import "./sorts.css";

const SortButtons = ({ fetchSortedData, fetchData }) => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const cancelSort = () => {
        setSortField(null)
        setSortOrder(null)
        fetchData()
    }

    const handleSort = (field) => {
        if (sortField === field) {
            const newOrder = sortOrder === "asc" ? "desc" : "asc";
            setSortOrder(newOrder);
            fetchSortedData(field, newOrder);
        } else {
            setSortField(field);
            setSortOrder("asc");
            fetchSortedData(field, "asc");
        }
    };

    return (
        <div className="sort-buttons">
            {["Popularity", "Metacritic", "Name", "Date"].map((field) => (
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
