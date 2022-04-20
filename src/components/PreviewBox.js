import React from 'react';
import './PreviewBox.css';

function PreviewBox({ previewData }) {
    return(
        <>
            <div className="preview-box" key={previewData.id+"_"+previewData.title}>
                <div className="recipeid">{previewData.id}</div>
                <div className="recipe-name">{previewData.title}</div>
                <div className="image-box"><img className="icon" alt={previewData.title} src={previewData.image}/></div>
                <div className="preparation-time">Bereidingstijd: {previewData.readyInMinutes} minuten</div>
                <div className="popularity">{previewData.aggregateLikes} likes</div>
                <div><a href={previewData.sourceUrl} target="_blank">{previewData.sourceUrl}</a></div>
            </div>
        </>
    );
}

export default PreviewBox;