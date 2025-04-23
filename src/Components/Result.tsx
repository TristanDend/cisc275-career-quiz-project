import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import '../CSS/Result.css';
import leafLoad from '../assets/leaf_loading.gif'

export function ResultPage(): React.JSX.Element {
    const [loadResults, setLoadResults] = useState<boolean>(true);

    // creates the loading sequence
    // const loadingHandler = async () => {
    //     await Promise.all([
    //         new Promise(resolveTimer => setTimeout(resolveTimer, 5000)),
    //     ]);
    // }

    // useEffect runs when the component is rendered. Sets loadResults to false after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadResults(false);
        }, 5000); // 5 seconds

        return () => {clearTimeout(timer)}; // cleanup
    }, []);

    return (
        <div>
            <h1 id="resultsPageTitle">Results</h1>
            
            <Popup open={loadResults} closeOnDocumentClick={false}>
                {
                  <div id="ResultsInitialPopup">
                    <p id="ResultsInitialPopupText">Processing Your Answers</p>
                    <img id="loadingImage" src={leafLoad} alt="leaf loading..."/>
                  </div>
                }
            </Popup>
        </div>
    )
}