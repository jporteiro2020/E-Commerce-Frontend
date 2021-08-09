const btnRegistro = document.getElementById('btn-Registro');
const inpNombreRegistro = document.getElementById('nombreRegistro');
const inpApellidoRegistro = document.getElementById('apellidoRegistro');
const inpDireccionRegistro = document.getElementById('direccionRegistro');
const inpEmailRegistro = document.getElementById('emailRegistro');
const inpTelefonoRegistro = document.getElementById('telefonoRegistro');
const inpPasswordRegistro = document.getElementById('passwordRegistro');
const inpRepetirPasswordRegistro = document.getElementById('repetirPasswordRegistro');

btnRegistro.addEventListener("click", async function () {
    await registro();
});

async function registro(){
    const nombre = inpNombreRegistro.value;
    const apellido = inpApellidoRegistro.value;
    const direccion = inpDireccionRegistro.value;
    const email = inpEmailRegistro.value;
    const telefono = inpTelefonoRegistro.value;
    const password = inpPasswordRegistro.value;
    const repetirPassword = inpRepetirPasswordRegistro.value;

    if(!nombre && !apellido && !direccion && !email && !telefono && !password && !repetirPassword){
        alert("Debes completar los datos obligatorios (nombre, apellido, direccion, mail, teléfono, password y repetir password)");
        return;
    }

    if(!nombre){
        alert("Debes ingresar un nombre");
        return;
    }

    if(!apellido){
        alert("Debes ingresar un apellido");
        return;
    }

    if(!direccion){
        alert("Debes ingresar una dirección");
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

    if(!telefono){
        alert("Debes ingresar un telefono");
        return;
    }

    if(!password){
        alert("Debes ingresar una contraseña");
        return;
    }

    if(!repetirPassword){
        alert("Debes ingresar la contrasña nuevamente");
        return;
    }

    if(password != repetirPassword){
        alert("Las contraseñas ingresadas no son iguales, verifique los datos ingresados");
        return;
    }

    const resp = await crearRegistro(nombre, apellido, direccion, email, telefono, password, repetirPassword);

    if(resp.status != 201 && resp.status != 400 && resp.status != 500){
        alert("Ocurrió un error", resp.data);
    }

    alert(resp.data);
    if(status = 201) location.href='/login'
}

async function crearRegistro(nombre, apellido, direccion, email, telefono, password, repetirPassword){
    const response = await fetch("https://localhost:4000/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nombre, apellido, direccion, email, telefono, password, repetirPassword})
    });
    
    const status = response.status;
    const respuestaJson = await response.json();
    const data = respuestaJson.data;
        
    return {status, data};
}