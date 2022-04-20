import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MostPopularPage() {
    const [temp1, setTemp1] = useState(true);
    const [temp2, setTemp2] = useState(true);
    return(
        <>
            <header>
                <h1 className="page-title">Populaire recepten</h1>
            </header>
            { temp1 &&
                <div>Hier komt conditioneel de receptencarousel.</div>
            }
            { temp2 &&
                <div>En hier komt conditioneel een geselecteerd recept in meer detail.</div>
            }
        </>
    );
}

export default MostPopularPage;