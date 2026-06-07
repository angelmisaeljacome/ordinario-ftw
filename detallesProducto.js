function obtenerId() {
    // Este código se ejecuta en cuanto se abre la pantalla de detalles
   
        // Obtener los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);

        // Extraer específicamente el parámetro llamado 'id'
        const idDetectado = urlParams.get('id');

        console.log("El usuario quiere ver el producto con ID:", idDetectado);

        // lógica para rellenar la página
        if (idDetectado) {
            cargarDetalles(idDetectado);
        }
    
}

function cargarDetalles(idProducto) {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "listaProductos.xml", true); //solicita el documento

    xhr.onreadystatechange = function () { //espera la respuesta

        if (xhr.readyState === 4 && xhr.status === 200) { //ya termino la peticion y todo salio bien

            var xml = xhr.responseXML; //asigna el documento
            var productos = xml.getElementsByTagName("producto");

            var salida = "";

            //realiza el recorrido
            for (var i = 0; i < productos.length; i++) {
                var id = productos[i].getElementsByTagName("id")[0].textContent;
                if (idProducto === id) {
                    var imagen = productos[i].getElementsByTagName("imagen")[0].textContent;
                    var nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
                    var precio = productos[i].getElementsByTagName("precio")[0].textContent;
                    var categoria = productos[i].getElementsByTagName("categoria")[0].textContent;
                    var descripcion = productos[i].getElementsByTagName("descripcion")[0].textContent;
                    var oferta = productos[i].getElementsByTagName("oferta")[0].textContent;
                    var vendedor = productos[i].getElementsByTagName("vendedor")[0].getElementsByTagName("nombre")[0].textContent;


                    salida += `
                    <div class="info">
                        <figure>
                            <img src="${imagen}" alt="">
                        </figure>
                        <p class="etiqueta">Nombre del producto:</p>
                        <p class="dato">${nombre}</p>
                        <p class="etiqueta">Precio:</p>
                        <p class="dato">$ ${precio} MXN</p>
                        <p class="etiqueta">Categoria:</p>
                        <p class="dato">${categoria}</p>
                        <p class="etiqueta">Descripcion:</p>
                        <p class="dato">${descripcion}</p>
                        <p class="etiqueta">En oferta:</p>
                        <p class="dato">${oferta}</p>
                        <p class="etiqueta">Vendida por:</p>
                        <p class="dato">${vendedor}</p>
                    </div>
                `;console.log("detecto")
                    break;
                }console.log("funciono")
            }

            document.getElementById("unico").innerHTML = salida;
        }
    };

    xhr.send();
}


/*
    Dado que a detalles acceden productos y ofertas se necesita saber quien lo llamo
    Y posteriormente el boton regreso, retorne a la pagina anterior esperada.
*/
function regreso() {
    // Obtener los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);

        // Extraer específicamente el parámetro llamado 'id'
        const llamadaPor = urlParams.get('llamadaPor');

        console.log("El usuario quiere regresar a:", llamadaPor);

        // lógica para rellenar la página
        if (llamadaPor === "ofertas") {
            window.location.href = "ofertas.html"
        } else if(llamadaPor === "productos"){
            window.location.href = "productos.html"
        } else{
            window.location.href = "inicio.html"
        }

   
}
