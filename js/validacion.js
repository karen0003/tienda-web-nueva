// Validación del formulario de contacto

const reglas = {

    nombre: {
        valido: (valor) => valor.trim().length >= 3,
        mensaje: "Ingresa tu nombre completo (mínimo 3 caracteres)."
    },

    correo: {
        valido: (valor) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()),

        mensaje: "Ingresa un correo válido, por ejemplo nombre@correo.com."
    },

    telefono: {
        valido: (valor) => /^9\d{8}$/.test(valor.trim()),
        mensaje: "El celular debe tener 9 dígitos y empezar con 9."
    },

    asunto: {
        valido: (valor) => valor !== "",
        mensaje: "Selecciona un asunto."
    },

    consulta: {
        valido: (valor) => valor.trim().length >= 10,
        mensaje: "Escribe tu mensaje (mínimo 10 caracteres)."
    }

};


// Validar un campo individual

function validarCampo(id) {

    const campo = document.getElementById(id);

    const error = document.getElementById("error-" + id);

    const esValido = reglas[id].valido(campo.value);

    campo.closest(".campo").classList.toggle("invalido", !esValido);

    error.textContent = esValido ? "" : reglas[id].mensaje;

    return esValido;

}


// Validar todos los campos

function validarFormulario() {

    let todoValido = true;

    Object.keys(reglas).forEach((id) => {

        if (!validarCampo(id)) {
            todoValido = false;
        }

    });

    return todoValido;

}


// Ejecutar cuando cargue la página

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("form-contacto");

    if (!formulario) return;

    // Validar cuando el usuario sale de un campo

    Object.keys(reglas).forEach((id) => {

        document.getElementById(id).addEventListener(
            "blur",
            () => validarCampo(id)
        );

    });


    // Validar cuando se envía el formulario

    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        if (validarFormulario()) {

            const nombre = document.getElementById("nombre").value.trim();

            mostrarMensaje(
                "exito",
                "Gracias, " + nombre + ". Hemos recibido tu mensaje."
            );

            formulario.reset();

        } else {

            mostrarMensaje(
                "fallo",
                "Revisa los campos marcados en rojo."
            );

        }

    });

});