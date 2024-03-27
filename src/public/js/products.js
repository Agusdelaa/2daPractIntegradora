const btnLogout = document.querySelector('#btnLogout');

btnLogout.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/sessions/logout', { method: 'POST' });
        const data = await response.json();
        if (data.status === 'error') {
            alert(data.message);
        } else {
            alert(data.message);
            window.location.href = '/login';
        }
    } catch (error) {
        alert(error);
    }
});

async function addProductToCart(productId, cartId) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, { method: 'POST' });
        const data = await response.json();
        if (data.status === 'success') {
            alert('Producto agregado al carrito');
        }
    } catch (error) {
        alert(error);
    }
}