function cargarVendedores() {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "../xml/listaProductos.xml", true); //solicita el documento

    xhr.onreadystatechange = function () { //espera la respuesta

        if (xhr.readyState === 4 && xhr.status === 200) { //ya termino la peticion y todo salio bien

            var xml = xhr.responseXML; //asigna el documento
            var productos = xml.getElementsByTagName("producto");

            let vendedores = new Map();

            var salida = "";

            //realiza el recorrido
            for (var i = 0; i < productos.length; i++) {

                let vendedor = productos[i].getElementsByTagName("vendedor")[0];

                let nombre = vendedor.getElementsByTagName("nombre")[0].textContent;
                let ventas = Number(vendedor.getElementsByTagName("ventas")[0].textContent);

                if (vendedores.has(nombre)) {
                    vendedores.set(nombre, vendedores.get(nombre) + ventas);
                } else {
                    vendedores.set(nombre, ventas);
                }

            }

            vendedores.forEach((ventas, nombre) => {
                salida += `
                    <tr>
                        <td>${nombre}</td>
                        <td>${ventas}</td>
                        <td>
                            <button onclick="cargarDetalles('${nombre}')">
                                Ver Info
                            </button>
                        </td>
                    </tr>
                `;
            });

            document.getElementById("infoTabla").innerHTML = salida;
        }
    };

    xhr.send();
}

function cargarDetalles(nombreVendedor) {
    window.location.href = "detallesVendedor.html?id=" + nombreVendedor;
}

function inicio() {
    window.location.href = "../html/inicio.html";
}