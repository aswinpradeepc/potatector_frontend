import React, {useState} from 'react';

const FileUpload = () => {
    const [result, setResult] = useState(null);
    const [showForm, setShowForm] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', event.target.file.files[0]);

        try {
            const response = await fetch('http://127.0.0.1:8000/predict/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setResult(data);
            setShowForm(false); // Hide the form after getting the result
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handlePredictAgain = () => {
        setResult(null); // Reset the result
        setShowForm(true); // Show the form again
    };

    return (
        <div className="container center" style={{backgroundColor: '#90D26D'}}>
            {showForm && (
                <div className="file-upload">
                    <form id="inputForm" onSubmit={handleSubmit}>
                        <div className="content">
                            <div className="content__grid">
                                <div className="col-12-m8" id="fileSelectionContainer">
                                    <h2>Upload image to Detect</h2>
                                    <label className="input__label" htmlFor="file">Select JPEG File</label>
                                    <div className="flex">
                                        <input type="file" id="file" name="file" accept="image/jpeg"
                                               className="input input--left flex-1"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="bttn__primary">Detect</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {result && (
                <div className="result-container">
                    <h2>Result:</h2>
                    <div className="result-table">
                        <div className="result-row">
                            <div className="result-label">Class:</div>
                            <div className="result-text">{result.class}</div>
                        </div>
                        <div className="result-row">
                            <div className="result-label">Confidence:</div>
                            <div className="result-text">{result.confidence.toFixed(2)}%</div>
                        </div>
                        <div className="result-row">
                            <div className="result-label">Name:</div>
                            <div className="result-text">{result.name}</div>
                        </div>
                        <div className="result-row">
                            <div className="result-label">Causes:</div>
                            <div className="result-text">{result.causes}</div>
                        </div>
                        <div className="result-row">
                            <div className="result-label">Symptoms:</div>
                            <div className="result-text">{result.symptoms}</div>
                        </div>
                        <div className="result-row">
                            <div className="result-label">Treatment:</div>
                            <div className="result-text">{result.treatment}</div>
                        </div>
                    </div>
                    <button className="bttn__primary" onClick={handlePredictAgain}>Predict Again</button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
