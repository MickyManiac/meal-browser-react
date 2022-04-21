import React from 'react';
import './PreviewBox.css';

function PreviewBox({ previewData, itemIndex, fnUseItemIndex }) {
    return(
        <div className="preview-box" onClick={() => fnUseItemIndex(itemIndex)}>
            <div className="upper-part">
                <div className="recipe-id">{previewData.id} (index: {itemIndex})</div>
                <div className="recipe-name">{previewData.title}</div>
            </div>
            <div className="lower-part">
                <div className="image-box"><img className="icon" alt={previewData.title} src={previewData.image}/></div>
                <div className="preparation-time">Bereidingstijd: {previewData.readyInMinutes} minuten</div>
                <div className="popularity">{previewData.aggregateLikes} likes</div>
            </div>
        </div>
    );
}

export default PreviewBox;