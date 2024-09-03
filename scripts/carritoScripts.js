document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const productQuantities = document.querySelectorAll('.product-quantity');
    const productTotals = document.querySelectorAll('.product-total');
    const totalValueSpan = document.getElementById('total-value');

    // Función para actualizar el total de cada producto y el total general
    function updateTotal() {
        let total = 0;
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const quantity = parseInt(productQuantities[index].value, 10);
                const value = parseFloat(checkbox.getAttribute('data-value'));
                const itemTotal = quantity * value;
                productTotals[index].textContent = `$${itemTotal.toFixed(2)}`;
                total += itemTotal;
            } else {
                productTotals[index].textContent = `$0.00`;
            }
        });
        totalValueSpan.textContent = `$${total.toFixed(2)}`;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    productQuantities.forEach(input => {
        input.addEventListener('input', updateTotal);
    });

    // Agrega evento al botón "Solicitar productos"
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que el enlace navegue a la URL por defecto

        let message = "Hola, estoy interesado en comprar los siguientes productos:\n";
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const quantity = parseInt(productQuantities[index].value, 10);
                const productTitle = checkbox.closest('.product-item').querySelector('.product-title').textContent;
                message += `- ${productTitle}: ${quantity} unidad(es)\n`;
            }
        });

        // Codifica el mensaje para incluirlo en la URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/3114185444?text=${encodedMessage}`;

        // Abre la URL de WhatsApp
        window.open(whatsappURL, '_blank');
    });

    // Inicializa el total
    updateTotal();
});
