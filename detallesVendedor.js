function obtenerId() {

    const urlParams = new URLSearchParams(window.location.search);

   
    const nombreUsuario = urlParams.get('id');

    console.log("El usuario quiere ver el vendedor con nombre:", nombreUsuario);

    // lógica para rellenar la página
    if (nombreUsuario) {
        cargarDetalles(decodeURIComponent(nombreUsuario));
    }

}

function cargarDetalles(nombreUsuario) {

    var xhr = new XMLHttpRequest(); //Variable de peticion o tuberia

    xhr.open("GET", "listaProductos.xml", true); //solicita el documento

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

                if (nombreUsuario === nombre) {
                    let telefono = vendedor.getElementsByTagName("telefono")[0].textContent;
                    let email = vendedor.getElementsByTagName("email")[0].textContent;
                    let ciudad = vendedor.getElementsByTagName("ciudad")[0].textContent;

                    vendedores.set(nombre, {
                        telefono: telefono,
                        email: email,
                        ciudad: ciudad
                    });

                    let datosVendedor = vendedores.get(nombre)

                    salida += `
                    <div class="info">
                        <p class="etiqueta">Nombre:</p>
                        <p class="dato">${nombre}</p>
                        <p class="etiqueta">Telefono:</p>
                        <p class="dato">${datosVendedor.telefono}</p>
                        <p class="etiqueta">Email:</p>
                        <p class="dato">${datosVendedor.email}</p>
                        <p class="etiqueta">Ciudad:</p>
                        <p class="dato">${datosVendedor.ciudad}</p>
                        <p class="etiqueta">Solicitar reunion:</p>
                        <button id="btnMensaje">Solicitud predeterminada</button>
                    </div>
                `; console.log("detecto");

                    break;
                }


            }
            document.getElementById("unico").innerHTML = salida;
        }

        
    }

    xhr.send();


};


function regreso() {
    window.location.href = "vendedores.html"
}
