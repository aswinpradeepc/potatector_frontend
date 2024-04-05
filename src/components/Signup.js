import React, {useEffect, useState} from 'react';

function Signup({setAuth}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        mobileNumber: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [validationMsg, setValidationMsg] = useState('');
    const [serverErrors, setServerErrors] = useState({});

    useEffect(() => {
        if (loading) {
            setLoading(false)
            return;

        }
        setValidationMsg(''); // Reset validation message
        if (!formData.email || !formData.email.includes('@')) {
            setValidationMsg('Please enter a valid email.');
        } else if (formData.password.length < 8) {
            setValidationMsg('Password must be at least 8 characters.');
        } else if (formData.fullName.length < 1) {
            setValidationMsg('Full name is required.');
        } else if (!formData.mobileNumber.match(/^\d{10}$/)) {
            setValidationMsg('Mobile number must be 10 digits.');
        } else if (formData.password !== formData.confirmPassword) {
            setValidationMsg('Passwords do not match.');
        }
    }, [formData]);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validationMsg) {
            try {
                const body = JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        full_name: formData.fullName,
                        mobile_number: formData.mobileNumber
                    });
                const response = await fetch('https://auth.radr.in/auth/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
                const data = await response.json();
                if (!response.ok) {
                    // Handling server-side validation errors
                    if (typeof data === 'object' && data !== null) {
                        setServerErrors(data);
                    } else {
                        console.log(data, 'data')
                    }
                }
                else {
                    if(data.access) { // Assuming 'access' is the key for the access token in the response
                localStorage.setItem('accessToken', data.access);
                localStorage.setItem('refreshToken', data.refresh);
                localStorage.setItem('user', body);
                console.log('Access token saved to local storage.');
                setAuth('');
              }
                }
            } catch (error) {
                console.error('Signup error:', error);
            }
        }
        ;
    }
    return (
        <div className="container">
            <div className="box">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="user">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {validationMsg && <p className="validation-msg">{validationMsg}</p>}
                    {Object.keys(serverErrors).map((key, index) => (
                        <p key={index} className="validation-msg">{`${key}: ${serverErrors[key].join(', ')}`}</p>
                    ))}
                    <div className="login-btn">
                        <button type="submit" className="btn">Submit</button>
                        <p className="signup">Already have an account ? <button type="button"
                                                                                onClick={() => setAuth("login")}>Log
                            In</button></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
