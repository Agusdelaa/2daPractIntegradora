const restoreForm = document.querySelector('#restoreForm');

restoreForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = {
        email: restoreForm.email.value,
        password: restoreForm.password.value
    }
    try {
        const response = await fetch('/api/sessions/restore', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status === 'error') {
            alert(data.message);
        } else {
            alert(data.message);
            window.location.href = '/login';
        }
    } catch (error) {
        alert(error.message || 'Error al restaurar la contraseña');
    }
});