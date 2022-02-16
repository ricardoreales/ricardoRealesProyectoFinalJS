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

//array de productos
const productos = [
    { id: 1, producto: "proteinaA", precio: 2000, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 2, producto: "proteinaB", precio: 1900, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 3, producto: "proteinaC", precio: 1850, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 4, producto: "proteinaD", precio: 1700, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 5, producto: "proteinaE", precio: 1800, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 6, producto: "proteinaF", precio: 1550, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 7, producto: "proteinaG", precio: 1880, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 8, producto: "proteinaH", precio: 1630, imagen: "./imagenes/wheyPtroteinEmbase.png" },
    { id: 9, producto: "proteinaI", precio: 1520, imagen: "./imagenes/wheyPtroteinEmbase.png" }
]


//funcion para agregar los productos a la galeria
productos.forEach(element => {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
        <img src="${element.imagen} " alt="proteina">
        <div class="cantidad_style">
            <h2>${element.producto} </h2>
            <h3>$ ${element.precio} </h3>
            <button class="agregar_carrito" onclick="agregarAlCarrito(${element.id})" >Agregar al carrito</button>
        </div> `
    document.getElementById("galeria").appendChild(contenedor)
});





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


    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizaCarrito()
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

