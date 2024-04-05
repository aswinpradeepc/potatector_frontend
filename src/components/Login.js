import React, {useState} from 'react';

async function fetchUserProfile(accessToken) {

  if (!accessToken) {
    console.error('No access token available.');
    return;
  }

  try {
    const response = await fetch('https://auth.radr.in/auth/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      // Handle response errors
      const errorData = await response.json();
      console.error('Failed to fetch profile:', errorData);
      throw new Error('Failed to fetch user profile');
    }

    const userData = await response.json();
    // Store user details in local storage
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User details fetched and stored:', userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

function Login({ setAuth }) {
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // State for error messages
  const [errorMsg, setErrorMsg] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMsg('');

    try {
      const response = await fetch('https://auth.radr.in/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.username, // Assuming the API expects an 'email' field
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        // Handle errors, e.g., wrong credentials
        setErrorMsg(data.message || 'Login failed');
      } else {
        // Assuming the response includes an access token on successful login
        if (data.access) {
          localStorage.setItem('accessToken', data.access);
          // Optionally set auth state to manage user session
          await fetchUserProfile(data.access);
          setAuth('');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('An error occurred during login.');
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="user">
            <i className="fas fa-user"></i>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              id="username"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              placeholder="Password"
              required
            />
            <i className="fas fa-unlock-alt"></i>
          </div>
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div className="login-btn">
            <button type="submit" className="btn">Submit</button>
            <p className="signup">Create an account ? <button type="button" onClick={() => setAuth("signup")}>Signup</button></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
