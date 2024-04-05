import React from 'react';

const Header = ({ setAuth }) => {
  // Attempt to retrieve the user details from local storage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // This clears all local storage items
    setAuth("login"); // Update auth state to show login page
  };

  return (
    <nav style={styles.navbar}>
      <span style={styles.brand}>Potato Disease Detection</span>
      <div style={styles.authSection}>
        {user && user.full_name ? (
          <>
            <span style={styles.welcomeMessage}>Welcome, {user.full_name}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <button onClick={() => setAuth("login")} style={styles.loginButton}>Login</button>
        )}
      </div>
    </nav>
  );
};

// Updated styles object with logoutButton style
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  authSection: {
    display: 'flex',
    alignItems: 'center',
  },
  welcomeMessage: {
    marginRight: '20px',
  },
  loginButton: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
  },
  logoutButton: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    marginLeft: '20px', // Added some margin to the left of the logout button for spacing
  }
};

export default Header;
