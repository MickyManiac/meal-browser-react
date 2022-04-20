import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTitle from "../components/PageTitle";
import PreviewBox from "../components/PreviewBox";
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
        fetchBulkData();
    }, []);
    return(
        <>
            <PageTitle text="Populaire recepten" />
            <>
                { error &&
                    <div><h1>Er is iets misgegaan met het ophalen van de data.</h1></div>
                }
                { loading &&
                    <div><h1>Data ophalen...</h1></div>
                }
                { Object.keys(bulkData).length > 0 && !error && !loading &&
                    <>
                        <div>Er zijn in totaal {bulkData.length} populaire recepten.</div>
                        Hier komen de previews.
                        <div  class="preview-box">
                            <div><b>{bulkData[0].id}</b></div>
                            <div><b>{bulkData[0].title}</b></div>
                            <div><img alt={bulkData[0].title} src={bulkData[0].image} /></div>
                            <div><a href={bulkData[0].sourceUrl} target="_blank" rel="noreferrer" > {bulkData[0].sourceUrl}</a></div>
                            <div><b>Bereidingstijd:</b> {bulkData[0].readyInMinutes} minuten</div>
                        <div><b>&#128077; / Aantal likes:</b> {bulkData[0].aggregateLikes}</div></div>
                    </>
                }
                { Object.keys(testData).length > 0 &&
                    <>
                        <div>TEST DATA</div>
                        <PreviewBox previewData={testData[0]}/>
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