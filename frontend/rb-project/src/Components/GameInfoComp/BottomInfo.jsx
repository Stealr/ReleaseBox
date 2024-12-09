import React, { useState, useEffect } from 'react';

const BottomInfo = ({ data, isExpanded, toggleDescription }) => (
    <div className="bottom-info">
        <div className="description">
            <p className="info-header">Description:</p>
            <p>
                {isExpanded ? data.description : data.description.slice(0, data.description.length / 2) + '...'}
                <button onClick={toggleDescription}>
                    {isExpanded ? "Show Less" : "Show More"}
                </button>
            </p>
        </div>
        {data.system_requirements.PC && (
            <div className="system">
                <p className="info-header">System requirements for PC:</p>
                <div className="min-rec">
                    {data.system_requirements.PC.minimum && (
                        <p className="block">
                            {data.system_requirements.PC.minimum.split(/\r?\n/).map((line, index) => (
                                <React.Fragment key={index}>
                                    <div className='line'>{line}</div>
                                </React.Fragment>
                            ))}
                        </p>
                    )}
                    {data.system_requirements.PC.recommended && (
                        <p className="block">
                            {data.system_requirements.PC.recommended.split(/\r?\n/).map((line, index) => (
                                <React.Fragment key={index}>
                                    <div className='line'>{line}</div>
                                </React.Fragment>
                            ))}
                        </p>
                    )}
                </div>
            </div>
        )}

    </div>
);

export default BottomInfo