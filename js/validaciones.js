export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoErrores = [
    "valueMissing", "typeMismatch", "patternMismatch", "customError"
]

const mensajeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo fecha no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX (10 numeros)"
    },
    direccion: {
        valueMissing: "El campo direccion no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres"
    },
}

const validadores = {
    nacimiento: input => validarNacimiento,
}

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    tipoErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error)
            mensaje = mensajeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 años de edad'
    }        
    input.setCustomValidity(mensaje);

}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return diferenciaFechas <= fechaActual;
}