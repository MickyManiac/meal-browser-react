import React, {useEffect, useState, memo} from 'react';
import './PreviewCarousel.css';
import PreviewBox from "./PreviewBox";

function PreviewCarousel({ carouselItems, fnUseSelectedItemIndex }) {
    const maxNrPositions = 3;
    // copy property carouselItems into state variable items
    // change items on carousel rotation while keeping carouselItems unchanged
    // use memo to avoid that carousel re-renders due to state changes in parent page/component
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
    function rotateLeft() {
        if (offset <= 0) { setOffset (offset - 1 + items.length); }
        else { setOffset(offset - 1); }
        const item = items[items.length - 1];
        for (let i=(items.length - 1); i > 0; i--) {
            items[i] = items[i-1];
        }
        items[0] = item;
    }
    function rotateRight() {
        if (offset >= items.length-1) { setOffset (offset + 1 - items.length); }
        else { setOffset(offset + 1); }
        const item = items[0];
        for (let i=0; i < items.length - 1; i++) {
            items[i] = items[i+1];
        }
        items[items.length-1] = item;
    }
    useEffect(() => {
        // clone the carouselItems property, so it will remain unchanged
        setItems(Array.from(carouselItems));
    }, []);
    useEffect(() => {
        if (selectedItemIndex > -1) {
            fnUseSelectedItemIndex(selectedItemIndex);
        }
    }, [selectedItemIndex]);
    // temporary
    useEffect(() => {
        console.log(items);
    }, [offset]);
    return(
        <>
            { offset }
            { items.length > 0 &&
                <div className="preview-box-container">
                    { items.length > maxNrPositions &&
                        <button className="arrow" type="button" onClick={rotateLeft}><div className="arrowsign">&lt;</div></button>
                    }
                    { items.slice(0, maxNrPositions).map((data, index) => (
                        <PreviewBox
                            previewData={data}
                            itemIndex={(index + offset) % items.length}
                            fnUseItemIndex={setSelectedItemIndex}
                        />
                    ))}
                    { items.length > maxNrPositions &&
                        <button className="arrow" type="button" onClick={rotateRight}><div className="arrowsign">&gt;</div></button>
                    }
                </div>
            }
            { selectedItemIndex }
        </>
    );
}

export default memo(PreviewCarousel);