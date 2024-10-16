const loginUser = async (email, password) => {
	try {
	  const response = await axios.post('http://localhost:3000/login', {
		email,
		password,
	  });
	  // Store token in localStorage or context
	  localStorage.setItem('token', response.data.token);
	  console.log('Login successful:', response.data);
	} catch (error) {
	  console.error('Error logging in:', error.response ? error.response.data : error.message);
	}
  };