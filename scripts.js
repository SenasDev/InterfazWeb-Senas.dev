
// // Funciones para el Slider
const sliderImages = document.querySelectorAll('.slider-container img');
let currentIndex = 0;

function showNextImage() {
    if (sliderImages.length > 0) {
        sliderImages[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % sliderImages.length;
        currentIndex = currentIndex >= 0 ? currentIndex : sliderImages.length - 1;
        sliderImages[currentIndex].style.display = 'block';
    }
}

setInterval(showNextImage, 5000);


// Funciónes para el banner de la promo principal

function openOverlay() {
    document.getElementById('overlay').style.display = 'block';
}

// cerrar banner
function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

window.onload = function () {
    openOverlay();
};

// funciones Menu
function toggleDropdownMenu() {
    var submenu = document.getElementById("submenu");
    submenu.classList.toggle("show");
}
window.onclick = function (event) {
    if (!event.target.matches('.dropdown > span')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Cargar menus de carta

document.addEventListener('DOMContentLoaded', function () {
    var contenidoDivs = {
        'btn-hamburguesas': 'categoria-hamburguesas',
        'btn-acompanamientos': 'categoria-acompanamientos',
        'btn-bebidas': 'categoria-bebidas'
    };

    function mostrarContenido(id) {

        Object.values(contenidoDivs).forEach(function (divId) {
            document.getElementById(divId).style.display = 'none';
        });

        document.getElementById(contenidoDivs[id]).style.display = 'block';
    }


    Object.keys(contenidoDivs).forEach(function (buttonId) {
        document.getElementById(buttonId).addEventListener('click', function () {
            mostrarContenido(buttonId);
        });
    });
});

// ---------------------- Carrito Compra -------------------------------
// Función para añadir productos al carrito
function addToCart(button) {
    let card = button.closest('.card');
    let productName = card.querySelector('h3').textContent;
    let price = parseFloat(card.querySelector('p span').textContent);
    let imageSrc = card.querySelector('img').getAttribute('src');

    if (!productName || isNaN(price) || !imageSrc) {
        alert('Error al añadir al carrito: Información del producto no disponible.');
        return;
    }

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let foundProduct = cart.find(product => product.name === productName);

    if (foundProduct) {
        foundProduct.quantity++;
        foundProduct.totalPrice = foundProduct.quantity * foundProduct.price;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: imageSrc,
            quantity: 1,
            totalPrice: price
        });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Animar carrito del boton y del nav al añadir pro
    let cartIconInNav = document.querySelector('.nav-link .fa-shopping-cart');
    animateCartIcon(cartIconInNav);
    let cartIconInButton = button.querySelector('.fa-shopping-cart');
    animateCartIcon(cartIconInButton);

}
// Actualizar contador carrito al cargar pagina
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
});

// Funcion para actualizar el nnumero de productos del carrito
function updateCartCount() {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById('cart-count').textContent = ` (${totalItems})`;

}

// Función para mostrar los productos en la página del carrito
function showCartItems() {
    let cartProductsContainer = document.getElementById('cart-products');
    let totalCartPriceElement = document.getElementById('total-cart-price');
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let totalCartPrice = 0;

    cartProductsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartProductsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
    } else {
        cart.forEach((product) => {
            let item = document.createElement('div');
            item.classList.add('cart-item');
            item.innerHTML = `
            <img src="${product.image}" alt="Imagen de ${product.name}" class="cart-item-image">
            <div class="cart-item-info">
            <h3 class="cart-item-name">${product.name}</h3>
            <p class="cart-item-price">Precio: ${product.price.toFixed(2)}€</p>
            <p class="cart-item-quantity">Cantidad: ${product.quantity}</p>
            <div class="cart-item-total-price">Total: ${product.totalPrice.toFixed(2)}€</p>
            </div>
            `;
            cartProductsContainer.appendChild(item);
            totalCartPrice += product.totalPrice;
        });

        totalCartPriceElement.innerHTML = `Total del carrito: ${totalCartPrice.toFixed(2)}€`;
    }
}

document.addEventListener('DOMContentLoaded', showCartItems);

function emptyCart() {
    sessionStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    showCartItems();
    actualizarTotalCarrito(0);
}

// Asociar el evento solo si el botón existe
if (document.getElementById('empty-cart')) {
    document.getElementById('empty-cart').addEventListener('click', emptyCart);
}


// animacion de icono de carrito

function animateCartIcon(cartIcon) {
    cartIcon.classList.add('icono-zoom');
    setTimeout(() => {
        cartIcon.classList.remove('icono-zoom');
    }, 500);
}


// ------------------------------------------------ Perfil Usuario---------------------------------------
function toggleDropdownMenu() {
    var submenu = document.getElementById('submenu');
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

// Función para mostrar el formulario correspondiente (login o registro)
function mostrarFormulario(tipo) {
    var formularioLogin = document.getElementById('formularioLogin');
    var formularioRegistro = document.getElementById('formularioRegistro');

    if (tipo === 'login') {
        formularioLogin.style.display = 'block';
        formularioRegistro.style.display = 'none';
    } else {
        formularioLogin.style.display = 'none';
        formularioRegistro.style.display = 'block';
    }
}

// Función para procesar el inicio de sesión
function procesarInicioSesion() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    var storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        localStorage.setItem('usuarioLogueado', username);
        mostrarMensaje('Inicio de sesión exitoso, ' + username + '!');
        document.getElementById('formularioLogin').style.display = 'none';
        actualizarNavegacion(username);
        window.location.href = 'perfilUsuario.html';
    } else {
        mostrarMensaje('Nombre de usuario o contraseña incorrectos.');
    }
}

// Función para procesar el registro
function procesarRegistro() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(localStorage.getItem(username)) {
        mostrarMensaje('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        return;
    }

    localStorage.setItem(username, password);
    mostrarMensaje('Usuario registrado con éxito, ' + username + '!');
    document.getElementById('formularioRegistro').style.display = 'none';
  
}
function mostrarMensaje(mensaje) {
    var mensajeDiv = document.getElementById('mensajeUsuario');
    mensajeDiv.innerHTML = mensaje;
    mensajeDiv.style.display = 'block';
}


// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el usuario logueado de localStorage
    localStorage.removeItem('usuarioLogueado');

    // Restablecer la visualización de los elementos de navegación
    document.getElementById('navUsuario').style.display = 'block';
    document.getElementById('navPerfil').style.display = 'none';

    // Restablecer el texto del enlace de usuario a 'USUARIO'
    var usuarioLink = document.getElementById('nombreUsuarioHeader');
    usuarioLink.textContent = 'USUARIO';

    // Redirigir al usuario a la página de registro/login
    window.location.href = 'registroLogin.html';
}

function verificarSesion() {

    var usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        actualizarNavegacion(usuarioLogueado);
    }
}

function actualizarNavegacion(username) {
    var usuarioLink = document.getElementById('nombreUsuarioHeader');
    if (usuarioLink) {
        usuarioLink.textContent = username;
       
    }
    // Esconde el botón de login/registro y muestras el de perfil
    document.getElementById('navUsuario').style.display = 'none';
    document.getElementById('navPerfil').style.display = 'block';
}

// Llamada a verificarSesion cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
});

document.addEventListener('DOMContentLoaded', function () {
    cargarPerfilUsuario();
});

function cargarPerfilUsuario() {
    var nombreUsuario = localStorage.getItem('usuarioLogueado');
    var direccionUsuario = localStorage.getItem('direccionUsuario');
    var metodosPago = localStorage.getItem('metodosPago');

    if (nombreUsuario) {
        document.getElementById('nombreUsuarioHeader').textContent = nombreUsuario;
        document.getElementById('nombreCompletoHeader').textContent = nombreUsuario;
        document.getElementById('nombreCompletoPerfil').textContent = nombreUsuario;
    }
}

document.addEventListener('DOMContentLoaded', cargarPerfilUsuario);

function eliminarCuenta() {
    // Mostrar un mensaje de confirmación antes de eliminar la cuenta
    var confirmacion = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción eliminará todos tus datos y no se puede deshacer.");
    if (confirmacion) {
    
        // Limpiar completamente el localStorage
        localStorage.clear();

        document.getElementById('navUsuario').style.display = 'block';
        document.getElementById('navPerfil').style.display = 'none';
        var usuarioLink = document.getElementById('nombreUsuarioHeader');
        usuarioLink.textContent = 'USUARIO'; 

       
        window.location.href = 'registroLogin.html';
    } else {
        alert("Cuenta Eliminada")
      
    }
}

function cambiarFotoPerfil(event) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = function(e) {
            // Establecer la imagen de perfil con la imagen leída
            const base64Image = e.target.result;
            document.getElementById('fotoUsuario').src = base64Image;
            
            // Guardar la imagen codificada en base64 en localStorage
            localStorage.setItem('imagenPerfil', base64Image);
        };

        // Leer el archivo como una URL de datos (esto codificará la imagen en base64)
        reader.readAsDataURL(file);
    } else {
        alert('La File API no está completamente soportada en este navegador.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar imagen de perfil de localStorage si existe
    const imagenGuardada = localStorage.getItem('imagenPerfil');
    if (imagenGuardada) {
        document.getElementById('fotoUsuario').src = imagenGuardada;
    }
});


// boton soporte 

// Función para alternar el menú desplegable de soporte
function toggleContactMenu() {
    document.getElementById("supportDropdown").classList.toggle("show");
  }
  
  // Esta función manejará todos los clics en la ventana
  function handleWindowClick(event) {
    // Cerrar el menú desplegable de soporte si se hace clic fuera de él
    if (!event.target.matches('.support-btn') && !event.target.matches('.support-btn *')) {
      var supportContent = document.getElementById("supportDropdown");
      if (supportContent.classList.contains('show')) {
        supportContent.classList.remove('show');
      }
    }
    
    // Cerrar otros menús desplegables si se hace clic fuera de ellos
    if (!event.target.matches('.dropdown > span')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  // Asignar el manejador de eventos al cargar la ventana
  window.onclick = handleWindowClick;
  

  // COOKIES

  function closeCookieNotice() {
    document.getElementById('cookie-notice').style.display = 'none';
    
}


function toggleAnalytics() {
    // Esta función cambiaría el estado de las cookies de análisis.
    // Deberías implementar la lógica para activar/desactivar las cookies de análisis aquí.
    var btn = document.getElementById('toggle-analytics');
    if (btn.textContent === "Activar") {
        btn.textContent = "Desactivar";
    } else {
        btn.textContent = "Activar";
    }
}


// Este código supone que ya has implementado las funciones 'toggleAnalytics' y 'saveCookieSettings'

function saveCookieSettings() {
    document.getElementById('cookie-settings').style.display = 'none';
}

function configuracioncookies() {
    document.getElementById('cookie-settings').style.display = 'block'; 
}

