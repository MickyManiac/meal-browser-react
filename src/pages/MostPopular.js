import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from "../components/PageTitle";
import PreviewBox from "../components/PreviewBox";
import PreviewCarousel from "../components/PreviewCarousel";
// temp, remove later
import noimagefound from "../assets/NoImageFound.GIF";

function MostPopularPage() {
    const [temp2, setTemp2] = useState(true);
    const [bulkData, setBulkData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    // temp let, make const later
    let query = `https://api.spoonacular.com/recipes/informationBulk?ids=715562,715419,715521,715495,715560,776505,715538,716429&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // remove later
    query = `https://api.spoonacular.com/recipes/informationBulk?ids=715562&apiKey=ada1ef8535a14d7695ff0ba52516335a`;
    // temp testData, remove later
    const testData = [
        {id: "411022", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411023", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411024", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411025", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
        {id: "411026", title: "Eenvoudig recept", image: noimagefound, readyInMinutes: 30, aggregateLikes: 12303, sourceUrl: "https://www.bestaat.niet.yx"},
    ];
    useEffect(() => {
        async function fetchBulkData() {
            setError(false);
            setLoading(true);
            try {
                const result = await axios.get({query});
                console.log(result.data);
                setBulkData(result.data);
            } catch (error) {
                console.error(error);
                setError(true);
            }
            setLoading(false);
        };
        // Temporary disable the effect in order to avoid that the API key's quota is exceeded very fast.
        // Quota is 150 points per day for a free subscription.
        // Calling this endpoint requires 1 point for the first recipe and 0.5 points for every additional
        // recipe returned, i.e. 4.5 points for 8 recipes each time, i.e. quota exceeded after 34 requests.
        // fetchBulkData();
    }, []);
    return(
        <>
            <PageTitle text="Populaire recepten" />
            <>
                { error &&
                    <div className="status-message">Er is iets misgegaan met het ophalen van de data.</div>
                }
                { loading &&
                    <div className="status-message">Data ophalen...</div>
                }
                { Object.keys(bulkData).length > 0 && !error && !loading &&
                    <>
                        <div>Er zijn in totaal {bulkData.length} populaire recepten.</div>
                        Hier komen de previews.
                        <PreviewBox previewData={bulkData[0]}/>
                        <div  className="preview-box">
                            <div><b>{bulkData[0].id}</b></div>
                            <div><b>{bulkData[0].title}</b></div>
                            <div><img alt={bulkData[0].title} src={bulkData[0].image} /></div>
                            <div><a href={bulkData[0].sourceUrl} target="_blank" rel="noreferrer" > {bulkData[0].sourceUrl}</a></div>
                            <div><b>Bereidingstijd:</b> {bulkData[0].readyInMinutes} minuten</div>
                        <div><b>&#128077; / Aantal likes:</b> {bulkData[0].aggregateLikes}</div></div>
                    </>
                }
                { testData.length > 0 &&
                    <>
                        <div>GEBRUIK VOOR NU TEST DATA</div>
                        <PreviewCarousel carouselItems={testData}/>
                    </>
                }
            </>
            { temp2 &&
                <div>Hier komt conditioneel een geselecteerd recept in meer detail.</div>
            }
        </>
    );
}

export default MostPopularPage;