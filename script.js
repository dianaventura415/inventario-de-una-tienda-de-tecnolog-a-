let productos = [];

function agregarProducto() {
    // Obtenemos los valores de los inputs
    let producto = document.getElementById("producto").value;
    let marca = document.getElementById("marca").value;
    let precio = document.getElementById("precio").value;
    let tabla = document.getElementById("tablaProductos");

    // Validación simple para no agregar filas vacías
    if (producto === "" || marca === "" || precio === "") {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    // Insertamos la fila con clases específicas para el diseño
    // Usamos la clase 'btn-eliminar' que definimos en el CSS anterior
    tabla.innerHTML += `
        <tr>
            <td>${producto}</td>
            <td>${marca}</td>
            <td>$${precio}</td>
            <td>
                <button class="btn-editar" onclick="editarFila(this)">
                    Editar
                </button>
                <button class="btn-eliminar" onclick="eliminarFila(this)">
                    Eliminar
                </button>
            </td>
        </tr>
    `;

    // Limpiamos los campos y devolvemos el foco al primer input
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("producto").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("producto").focus();
}

function eliminarFila(boton) {
    // Animación simple: antes de borrar, podríamos dar un efecto visual
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        let fila = boton.parentElement.parentElement;
        fila.style.opacity = "0";
        fila.style.transition = "0.3s";
        
        setTimeout(() => {
            fila.remove();
        }, 300);
    }
}

function editarFila(boton) {
    let fila = boton.parentElement.parentElement;
    
    // Obtenemos los valores actuales
    let nombreActual = fila.cells[0].innerText;
    let marcaActual = fila.cells[1].innerText;
    let precioActual = fila.cells[2].innerText.replace('$', '');

    // Pedimos los nuevos datos
    let nuevoProducto = prompt("Nuevo nombre del producto:", nombreActual);
    let nuevaMarca = prompt("Nueva marca:", marcaActual);
    let nuevoPrecio = prompt("Nuevo precio:", precioActual);

    // Actualizamos solo si el usuario no canceló el prompt
    if (nuevoProducto !== null) fila.cells[0].innerText = nuevoProducto;
    if (nuevaMarca !== null) fila.cells[1].innerText = nuevaMarca;
    if (nuevoPrecio !== null) fila.cells[2].innerText = `$${nuevoPrecio}`;
}