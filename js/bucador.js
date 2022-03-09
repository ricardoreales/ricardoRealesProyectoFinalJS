
let inputSearch = document.getElementById("encontrado")
inputSearch.onchange = () => {
    productosGaleria = productos.filter((element) => element.nombre.includes(inputSearch.value))
    actualizarGaleria()
}