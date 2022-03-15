//toggle y modal para el carrito
const carritoToggle = document.getElementById("carritoToggle")
const carritoModal = document.getElementById("carritoModal")
const carritoClose = carritoModal.getElementsByClassName("close")[0]
const carritoCantidad = carritoToggle.getElementsByClassName("cantidad")[0]
const carritoProductos = document.getElementById("carritoProductos")


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
let productosGaleria = []
//ajax
fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
        productos = data
        productosGaleria = productos
        actualizarGaleria()
    })

//funcion para agregar los productos a la galeria
function actualizarGaleria() {

    //odernar productos
    const opcion = document.getElementById("opcionOrdenar").value
    switch (opcion) {
        case 'precio':
            productosGaleria.sort((a, b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0))
            break
        default:
            productosGaleria.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
    }

    //se agregan los prodcutos al div galeria
    let galeria = document.getElementById("galeria")
    galeria.innerHTML = ""
    productosGaleria.forEach(element => {
        let contenedor = document.createElement("div");
        contenedor.innerHTML = `
            <img src="${element.imagen} " alt="proteina">
            <div class="cantidad_style">
                <h2>${element.nombre} </h2>
                <h3>$ ${element.precio} </h3>
                <button class="button_secundario" onclick="agregarAlCarrito(${element.id})" >Agregar al carrito</button>
            </div> `
        galeria.appendChild(contenedor)
    })
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

//Agregar productos al Carrito 
function agregarAlCarrito(productoId) {
    //primero busco el array carrito si existe el producto
    const productoCarrito = carrito.find(item => item.id === parseInt(productoId))
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
    //vaciar el div de carrito producto
    carritoProductos.innerHTML = ""

    if (carrito.length) {
        carrito.forEach(item => {
            let totalItem = item.cantidad * item.precio
            let fila = document.createElement("tr");
            fila.innerHTML = `
            <td><img src="${item.imagen}" alt=""></td>
            <td>
                <h4>${item.nombre}</h4> 
                <small>$ ${item.precio} por unidad</small>
            </td>
            <td><input type="number" value="${item.cantidad}" min="1" step="1" onchange="actualizarCantidad(${item.id},this)" required></td>
            <td id="subtotalPorProducto" class="bold">$ ${totalItem}</td>
            <td><span onclick="removerProducto(${item.id})" class="material-icons">delete_forever</span></td> `
            carritoProductos.appendChild(fila)
        });
    } else {
        carritoProductos.innerHTML = "<tr><td>usted no cuenta con productos agragdos al carrito</td></tr>"
    }
    calcularTotal()
}



function actualizarCantidad(productoId, input) {
    let cantidad = Number(input.value)

    if (Number.isInteger(cantidad)) {
        let actualizarMontos = document.querySelectorAll('#subtotalPorProducto')
        carrito.forEach(function (producto, index) {
            if (producto.id === productoId) {
                producto.cantidad = cantidad
                actualizarMontos[index].innerHTML = Number(cantidad * producto.precio)
                calcularTotal()
            }
        });
        
        localStorage.setItem('productos', JSON.stringify(carrito))
        input.classList.remove("text_red")
    } else {
        alertCustom("Ingresar un valor entero", "bottom", "left")
        input.classList.add("text_red")
    }
}

function removerProducto(productoId) {
    //Comparar el id del producto borrado con LS
    carrito.forEach(function (producto, index) {
        if (producto.id === productoId) {
            carrito.splice(index, 1)
        }
    });

    //Añadimos el arreglo actual al Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizaCarrito()
}

function vaciarCarrito() {
    carrito = []
    localStorage.clear();
    actualizaCarrito()
}

function procesarCompra(){
    if(carrito.length){
        alertCustom("Gracias por su compra", "bottom", "left")
        vaciarCarrito()
    }else{
        alertCustom("Agregue un producto", "bottom", "left")

    }
    
}

function calcularTotal() {
console.log(carrito)
    let total = 0
    let iva = 0
    let subtotal = 0

    for (let i = 0; i < carrito.length; i++) {
        total = total + Number(carrito[i].precio * carrito[i].cantidad)
    }
    if (total > 0) {
        iva = parseFloat((total * 21)/121).toFixed(2)
        subtotal = parseFloat(total - iva).toFixed(2)
    }

    document.getElementById('subtotalProducto').innerHTML = "subtotal:" + subtotal
    document.getElementById('iva').innerHTML = "IVA:" + iva
    document.getElementById('total').innerHTML = "TOTAL:" + total.toFixed(2)
}



