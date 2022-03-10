function recomendacionesImc(imc) {
    let mensaje = ""
    switch (true) {

        case (imc < 18.5):
            mensaje = "Usted  esta en desnutrición, recomendamos ponerse en control con un Nutricionista "
            break;
        case (imc >= 18.5 && imc <= 24.9):
            mensaje = "Usted  se encuentra dentro del rango de peso normal o saludable"
            break;
        case (imc >= 25 && imc <= 29.9):
            mensaje = "Usted se encuentra dentro del rango de sobrepeso, recomendamos ponerse en control con un Nutricionista y hacer ejercicicio "
            break;
        case (imc > 29.9):
            mensaje = "Usted se encuentra dentro del rango de obesidad, recomendamos ponerse en control con un Nutricionista y hacer ejercicio"
            break;
        default:
            mensaje = "ingrese un valor valido"
            break;
    }
    return mensaje
}


function calculoImc(peso, altura) {
    let imc = parseFloat(peso / (altura * altura))
    console.log(imc)
    return imc
}


function obtenerImc() {

    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    const divImc = document.getElementById("imc")
    const recomendaciones = document.getElementById("recomendaciones")
    divImc.innerHTML = ""

    if (peso > 0 && altura > 0) {
        let imc = calculoImc(peso, altura)
        divImc.innerHTML = imc.toFixed(2)
        recomendaciones.innerHTML = recomendacionesImc(imc)

    }else {
        recomendaciones.innerHTML = "ingrese un valor mayor a 0"
        alertCustom("No has insertado ningun valor")
    }


    //ACA VA MI ALGORITMO

    

    // if (imc = isNaN){
    //     document.getElementById("imc").innerHTML = "ingrese un valor valido"
        
    
    
    
    //QUITAMOS EL ALERT O CONSOLE Y PONEMOS ASI

  



}

