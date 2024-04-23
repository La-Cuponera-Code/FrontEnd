// Función para inicializar el modal y mostrarlo cuando se carga la página
window.onload = function() {
    var modal = new bootstrap.Modal(document.getElementById('userModal'));
    modal.show();
};

// Función para ocultar el modal de registro
function hideRegistrationModal() {
    console.log("hide")
    $('#userModal').modal('hide');
}

// Función para enviar el formulario de registro
function submitRegistrationForm(event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener el formulario
    var form = document.getElementById("registrationForm");

    // Obtener los datos del formulario
    var formData = new FormData(form);

    // Simular una solicitud AJAX (puedes ajustar esto según tu backend)
    // Aquí puedes enviar los datos del formulario al servidor para procesar el registro
    // En este ejemplo, simplemente simulamos una solicitud exitosa después de 1 segundo
    setTimeout(function() {
        // Simular una respuesta exitosa del servidor
        var registrationSuccessful = true; // Cambia a false para simular un fallo de registro
        var externRegistrationSuccessful = false;

        // Si el registro fue exitoso, redirigir al usuario a la página principal
        if (registrationSuccessful) {
            hideRegistrationModal();
        } else {
            // Si el registro falló, mostrar un mensaje de error
            alert("El registro falló. Por favor, inténtalo de nuevo.");
        }

        if (externRegistrationSuccessful) {
            const nuevaPagina = 'escritorio_cuponeros.html';
            window.location.href = nuevaPagina;
            hideRegistrationModal();
        } else {
            // Si el registro falló, mostrar un mensaje de error
            alert("El registro falló. Por favor, inténtalo de nuevo.");
        }
    }, 1000); // Simulamos una solicitud de 1 segundo (puedes ajustar esto según sea necesario)
}

document.addEventListener("DOMContentLoaded", function() {
    var defaultLat = 4.60971;
    var defaultLng = -74.08175;

    const map = L.map('map').setView([defaultLat, defaultLng], 4);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: ''
    }).addTo(map);

    const marker = L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map)
        .bindPopup('<b>Estás acá</b>').openPopup();

    const circle = L.circle([defaultLat, defaultLng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map).bindPopup('I am a circle.');

    function updateCity(lat, lng) {
        // Utilizar Nominatim para obtener la dirección
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

        fetch(nominatimUrl)
            .then(response => response.json())
            .then(data => {
                const ciudad = data.address.city || data.address.town || data.address.village || data.address.hamlet;


             

    var selectedFilter = ciudad;

    $.ajax({
        type: 'GET',
        url: 'tu_script_php_que_procesa_el_filtro2.php',
        data: { filter: selectedFilter },
        success: function(response) {
            $('#result-container2').html(response);
            document.getElementById('ciudad').innerText = ciudad;

        }
    });


            })
            .catch(error => console.error('Error al obtener la dirección:', error));
    }

    // Al mover el marcador
    marker.on('moveend', function (e) {
        const latlng = e.target.getLatLng();
        updateCity(latlng.lat, latlng.lng);
    });

    // Al cargar la página
    updateCity(defaultLat, defaultLng);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var latitud = position.coords.latitude;
                var longitud = position.coords.longitude;

                map.setView([latitud, longitud], 13);
                marker.setLatLng([latitud, longitud]);
                circle.setLatLng([latitud, longitud]);

                updateCity(latitud, longitud);
            },
            function(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        // El usuario rechazó la geolocalización, se mantiene la ubicación predeterminada
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert("La información de ubicación no está disponible.");
                        break;
                    case error.TIMEOUT:
                        alert("La solicitud para obtener la ubicación del usuario ha caducado.");
                        break;
                    case error.UNKNOWN_ERROR:
                        alert("Se produjo un error desconocido al intentar obtener la ubicación del usuario.");
                        break;
                }
            }
        );
    } else {
        alert("La geolocalización no es compatible en este navegador.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Select the carousel
    var carousel = document.getElementById('productCarousel');

    // Example: Dynamically add product items to the carousel
    var productItems = []; // Array of product items, you need to populate this with your product data
    productItems.forEach(function(item, index) {
        var itemHtml = `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <div class="row">
                                <!-- Your product cards here -->
                                <!-- Example product card -->
                                <div class="col">
                                    <!-- Your product card content -->
                                </div>
                            </div>
                        </div>`;
        carousel.querySelector('.carousel-inner').insertAdjacentHTML('beforeend', itemHtml);
    });

    // Initialize the carousel
    new bootstrap.Carousel(carousel);
    
});