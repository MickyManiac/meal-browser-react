import React, { useState } from 'react';
import './PreviewCarousel.css';
import PreviewBox from "./PreviewBox";

function PreviewCarousel({ carouselItems }) {
    const [ offset, setOffset ] = useState(0);
    const maxNrPositions = 3;
    function rotateLeft() {
        if (offset <= 0) { setOffset (offset - 1 + carouselItems.length); }
        else { setOffset(offset - 1); }
        const item = carouselItems[carouselItems.length - 1];
        for (let i=(carouselItems.length - 1); i > 0; i--) {
            carouselItems[i] = carouselItems[i-1];
        }
        carouselItems[0] = item;
    }
    function rotateRight() {
        if (offset >= carouselItems.length-1) { setOffset (offset + 1 - carouselItems.length); }
        else { setOffset(offset + 1); }
        const item = carouselItems[0];
        for (let i=0; i < carouselItems.length - 1; i++) {
            carouselItems[i] = carouselItems[i+1];
        }
        carouselItems[carouselItems.length-1] = item;
    }
    return(
        <>
            { offset }
            { carouselItems.length > 0 &&
                <div className="preview-box-container">
                    { carouselItems.length > maxNrPositions &&
                        <button className="arrow" type="button" onClick={rotateLeft}><div className="arrowsign">&lt;</div></button>
                    }
                    { carouselItems.slice(0, maxNrPositions).map((data) => (
                        <PreviewBox previewData={data}/>
                    ))}
                    { carouselItems.length > maxNrPositions &&
                        <button className="arrow" type="button" onClick={rotateRight}><div className="arrowsign">&gt;</div></button>
                    }
                </div>
            }
        </>
    );
}

export default PreviewCarousel;