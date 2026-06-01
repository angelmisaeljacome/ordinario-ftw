function cargarProductos() {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "listaProductos.xml", true); //solicita el documento

    xhr.onreadystatechange = function () { //espera la respuesta

        if (xhr.readyState === 4 && xhr.status === 200) { //ya termino la peticion y todo salio bien

            var xml = xhr.responseXML; //asigna el documento
            var productos = xml.getElementsByTagName("producto");

            var salida = "";

            //realiza el recorrido
            for (var i = 0; i < productos.length; i++) {
                var id  = productos[i].getElementsByTagName("id")[0].textContent;
                var nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
                var precio = productos[i].getElementsByTagName("precio")[0].textContent;
                var imagen = productos[i].getElementsByTagName("imagen")[0].textContent;
                salida += `
                    <div class="card">
                        <figure>
                            <img src="${imagen}" alt="">
                        </figure>

                        <div class="divNombre">
                            <p class="etiqueta">Producto</p>
                            <p class="dato">${nombre}</p>
                        </div>

                        <div class="divPrecio">
                            <p class="etiqueta">Precio</p>
                            <p class="dato">$ ${precio} MXN</p>
                        </div>

                        <div class="boton" onclick="cargarDetalles(${id})"> 
                            <button>Detalles</button>
                        </div>
                    </div>
                `;
            }

            document.getElementById("cards").innerHTML = salida;
        }
    };

    xhr.send();
}



function cargarDetalles(idProducto) {
    window.location.href = "detallesProducto.html?id=" + idProducto;
}

function inicio(){
    window.location.href = "inicio.html";
}