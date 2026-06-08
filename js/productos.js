function cargarProductos() {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "/xml/listaProductos.xml", true); //solicita el documento

    xhr.onreadystatechange = function () { //espera la respuesta

        if (xhr.readyState === 4 && xhr.status === 200) { //ya termino la peticion y todo salio bien

            var xml = xhr.responseXML; //asigna el documento
            var productos = xml.getElementsByTagName("producto");

            var salida = "";

            //realiza el recorrido
            for (var i = 0; i < productos.length; i++) {
                var id = productos[i].getElementsByTagName("id")[0].textContent;
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

function buscar(categoriaBuscada) {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "/xml/listaProductos.xml", true); //solicita el documento

    xhr.onreadystatechange = function () { //espera la respuesta

        if (xhr.readyState === 4 && xhr.status === 200) { //ya termino la peticion y todo salio bien

            var xml = xhr.responseXML; //asigna el documento
            var productos = xml.getElementsByTagName("producto");

            var salida = "";
            console.log(categoriaBuscada)

            //realiza el recorrido
            for (var i = 0; i < productos.length; i++) {
                var categoria = productos[i].getElementsByTagName("categoria")[0].textContent;
                if (categoriaBuscada === categoria) {
                    var id = productos[i].getElementsByTagName("id")[0].textContent;
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

            }

            document.getElementById("cards").innerHTML = salida;
        }
    };

    xhr.send();
}

function cargarCategorias() {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "/xml/listaProductos.xml", true); //solicita el documento

    xhr.onreadystatechange = function () { //espera la respuesta

        if (xhr.readyState === 4 && xhr.status === 200) { //ya termino la peticion y todo salio bien

            var xml = xhr.responseXML; //asigna el documento
            var productos = xml.getElementsByTagName("producto");

            var salida = `<option value="" disabled selected>-- Selecciona una opción--</option>`;

            
            //Set ignora los valores repetidos
            const categoriasUnicas = new Set();

            //realiza el recorrido
            for (var i = 0; i < productos.length; i++) {
                var categoria = productos[i].getElementsByTagName("categoria")[0].textContent;
                categoriasUnicas.add(categoria);
            }

            categoriasUnicas.forEach(categoria => {
                salida += `
                    <option value="${categoria}">${categoria}</option>
                `;
            });

            document.getElementById("opciones").innerHTML = salida;
        }
    };

    xhr.send();
}


function cargarDetalles(idProducto) {
    window.location.href = "detallesProducto.html?id=" + idProducto + "&llamadaPor=" + "productos";
}

function inicio() {
    window.location.href = "/html/inicio.html";
}