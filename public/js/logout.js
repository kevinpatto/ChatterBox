const logout = async () => {
	const response = await fetch('/api/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/chat');
	} else {
		alert(response.statusText);
	}
};

document.getElementById('logout').addEventListener('click', logout);
