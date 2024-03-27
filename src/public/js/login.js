const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = {
        email: loginForm.email.value,
        password: loginForm.password.value
    }
    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        alert(data.message);
        if (data.status === 'success') {
            window.location.href = '/products';
        }
    } catch (error) {
        alert(error);
    }
});

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('success')) {
    const success = urlParams.get('success');
    const message = urlParams.get('message');
    alert(message);
    if (success === 'true') {
        window.location.href = '/products';
    }
}