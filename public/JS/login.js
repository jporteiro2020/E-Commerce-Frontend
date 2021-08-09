const btnIniciar = document.getElementById('btn-Login');

const emailInput = document.getElementById('emailLogin');
const passInput = document.getElementById('passLogin');

//const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

btnIniciar.addEventListener('click', async function () {
    const email = emailInput.value;
    const password = passInput.value;

    if(!email && !password){
        alert("Debes completar los datos obligatorios (email, password)");
        return;
    }

    if(!email){
        alert("Debes ingresar el mail");
        return;
    }

    if(!password){
        alert("Debes ingresar la contraseña");
        return;
    }

    if ( regex.test(email) === false) {
        alert("Debes ingresar un email con un formato correcto");
        return;
    }

    const response = await fetch('https://localhost:4000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({mail: email, password: password})
    });

    const status = response.status;
    const respuestaJson = response.json();

    if(status == 200){
        localStorage.setItem('token', response.token);
        alert('Login exitoso');
        location.href='/'
    } else{
        alert(respuestaJson.data);
    }

    //const token = localStorage.getItem('token');
    // Ejemplo
    // localStorage.setItem('user', JSON.stringify(usuario));
    // const stringifiedObjet = localStorage.getItem('user');
    // const user = JSON.parse(stringifiedObjet);
});
