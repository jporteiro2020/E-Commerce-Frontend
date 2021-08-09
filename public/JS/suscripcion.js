const btnSuscripcion = document.getElementById('btnSuscribir');
const inpNombreSuscripcion = document.getElementById('nombreSuscripcion');
const inpEmailSuscripcion = document.getElementById('emailSuscripcion');

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

btnSuscripcion.addEventListener("click", async function () {
    await suscripcion();
});

async function suscripcion(){
    const nombre = document.getElementById('nombreSuscripcion').value;
    const email = document.getElementById('emailSuscripcion').value;

    if(!nombre && !email){
        alert("Debes completar los datos obligatorios (nombre, email)");
        return;
    }

    if(!nombre){
        alert("Debes ingresar un nombre");
        return;
    }

    if(!email){
        alert("Debes ingresar un email");
        return;
    }

    if ( regex.test(email) === false) {
        alert("Debes ingresar un email con un formato correcto");
        return;
    }

    const resp = await crearSuscripcion(nombre, email);

    if(parseInt(resp.status) != 201 && parseInt(resp.status) != 400 && parseInt(resp.status) != 500){
        alert("Ocurrió un error", resp.data);
    }

    alert(resp.data);
}

async function crearSuscripcion(nombre, email){
    const response = await fetch("https://localhost:4000/suscribir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nombre: nombre, email: email})
    });
    
    const status = response.status;
    const respuestaJson = await response.json();
    const data = respuestaJson.data;
        
    return {status, data};
}