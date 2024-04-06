import React, { useState } from 'react';

const FileUpload = () => {
    const [result, setResult] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [emailSent, setEmailSent] = useState(false); // Add a new state for email sent status

    // Function to send email
    const sendEmail = async () => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;

        const url = 'https://auth.radr.in/auth/send_email';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (result && result.class) {
            const data = {
                'email': user ? user.email : '',
                'subject': 'Potato Disease Detection Result',
                'message': `
                Class: ${result.class}
                Confidence: ${result.confidence.toFixed(2)}%
                Name: ${result.name}
                Causes: ${result.causes}
                Symptoms: ${result.symptoms}
                Treatment: ${result.treatment}
            `,
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                console.log(response.status);
                console.log(await response.json());
                setEmailSent(true); // Set the email sent status to true
            } catch (error) {
                console.error('There was a problem with sending the email:', error);
            }
        } else {
            console.log('Result is null or does not have a class property');
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', event.target.file.files[0]);

        try {
            const response = await fetch('http://127.0.0.1:8001/predict/', {
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
        <div className="container center" style={{ backgroundColor: '#90D26D' }}>
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
                                               className="input input--left flex-1" />
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
                    <div className="button-container">
                        <button className="bttn__primary send-email-btn" onClick={sendEmail}>Send Email</button>
                        <button className="bttn__primary" onClick={handlePredictAgain}>Predict Again</button>
                    </div>
                    {emailSent && <p className="success-message">Email sent successfully!</p>}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
