//toggle y modal para el carrito
const carritoToggle = document.getElementById("carritoToggle")
const carritoModal = document.getElementById("carritoModal")
const carritoClose = carritoModal.getElementsByClassName("close")[0]
const carritoCantidad = carritoToggle.getElementsByClassName("cantidad")[0]


//funcion para cerrar ventana del carrito
carritoClose.onclick = function () {
    carritoToggle.classList.remove("active")
    carritoModal.classList.remove("active")
    document.body.classList.remove("modalOpen")
}

//funcion para abrir la ventana del carrito
carritoToggle.onclick = function () {
    carritoToggle.classList.toggle("active")
    carritoModal.classList.toggle("active")
    document.body.classList.add("modalOpen")
    actualizaCarrito()
}


let productos = []
//ajax
fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
        productos = data
        ordenarBy('nombre')
        actualizarGaleria()
    })

//funcion para agregar los productos a la galeria
function actualizarGaleria() {

    //se agregan los prodcutos al div galeria
    let galeria = document.getElementById("galeria")
    galeria.innerHTML = ""
    productos.forEach(element => {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
            <img src="${element.imagen} " alt="proteina">
            <div class="cantidad_style">
                <h2>${element.nombre} </h2>
                <h3>$ ${element.precio} </h3>
                <button class="agregar_carrito" onclick="agregarAlCarrito(${element.id})" >Agregar al carrito</button>
            </div> `
        galeria.appendChild(contenedor)
    })
}

// onchage para odernar por precio o nombre 
function ordenarBy(opcion) {
    //odernar productos
    switch (opcion) {
        case 'precio':
            productos.sort((a, b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0))
            break
        default:
            productos.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
    }
   actualizarGaleria()
}

//funcion de alerta al agregar un producto al carrito
function alertCustom(mensaje, gravity = 'bottom', position = "right") {
    Toastify({
        text: mensaje,
        className: "info",
        gravity: gravity,
        position: position,
        style: {
            background: "linear-gradient(to right, #ff8800, #ff010a)",
        }
    }).showToast();
}








//carrito de compras
let carrito = []
//el array q esta en "string" en el localstorage lo volvemos un array y si no hay nada queda vacio 
let storageCarrito = JSON.parse(localStorage.getItem("carrito")) || []

if (storageCarrito) {
    carrito = [...storageCarrito]
    actualizaCarrito()
    // console.log(carrito)
}


//para agregar productos 
function agregarAlCarrito(productoId) {
    //primero busco el array carrito si existe el producto
    const productoCarrito = carrito.find(item => item.id === parseInt(productoId))
    console.log(productoId)
    console.log(productoCarrito)
    if (productoCarrito === undefined) {
        //aqui se busca en el array productos por su id 
        const producto = productos.find(item => item.id === parseInt(productoId))
        //se le agrega a la propiedad cantidad a el array encontrado
        producto.cantidad = 1
        //se agrega el array producto al array carrito 
        carrito.push(producto)
        console.log(producto)
    } else {
        //si existe el producto se le suma la cantidad + 1 
        productoCarrito.cantidad = productoCarrito.cantidad + 1
    }


    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizaCarrito()

    alertCustom("Producto Agregado", "top")


}



function actualizaCarrito() {
    //actualizar el numero de icono del carrito
    carritoCantidad.innerHTML = carrito.length


    //
    let carritoProductos = document.getElementById("carritoProductos")
    carritoProductos.innerHTML = ""
    console.log(carritoProductos.innerHTML)
    if (carrito.length) {
        carrito.forEach(item => {
            let totalItem = item.cantidad * item.precio
            let fila = document.createElement("tr");
            fila.innerHTML = `
            <td><img src="${item.imagen}" alt=""></td>
            <td>
                <h4>${item.producto}</h4> 
                <small>$ ${item.precio} por unidad</small>
            </td>
            <td><input type="number" value="${item.cantidad}"></td>
            <td><h4>$ ${totalItem}</h4></td>
            <td><span class="material-icons">delete_forever</span></td> `
            carritoProductos.appendChild(fila)
        });

    } else {
        carritoProductos.innerHTML = "<tr><td>usted no cuenta con productos agragdos al carrito</td></tr>"
    }
}

