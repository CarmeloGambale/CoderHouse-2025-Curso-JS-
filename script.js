const juegos = [
    { id: 1, titulo: "Call of Duty: Modern Warfare II", desarrollador: "Infinity Ward", genero: "Shooter", disponible: true },
    { id: 2, titulo: "Counter-Strike 2", desarrollador: "Valve", genero: "Shooter", disponible: true },
    { id: 3, titulo: "The Last of Us Part II", desarrollador: "Naughty Dog", genero: "Aventura", disponible: false },
    { id: 4, titulo: "Grand Theft Auto V", desarrollador: "Rockstar Games", genero: "Acción", disponible: true },
    { id: 5, titulo: "EA FC 25", desarrollador: "EA Sports", genero: "Futbol", disponible: true }
];

const jugadoresRegistrados = [];
const CARGO_RETRASO_POR_DIA = 250;

function animarInterfaz() {
    if (typeof document === "undefined" || !document.body || !document.body.animate) {
        return;
    }

    document.body.animate(
        [
            { backgroundPosition: "0% 50%" },
            { backgroundPosition: "100% 50%" },
            { backgroundPosition: "0% 50%" }
        ],
        {
            duration: 18000,
            iterations: Infinity,
            easing: "ease-in-out"
        }
    );

    const contenedor = document.querySelector(".contenedor");
    if (contenedor?.animate) {
        contenedor.animate(
            [
                { opacity: 0, transform: "translateY(26px)" },
                { opacity: 1, transform: "translateY(0)" }
            ],
            {
                duration: 900,
                easing: "ease-out",
                fill: "forwards"
            }
        );
    }

    const titulo = document.querySelector(".titulo");
    if (titulo?.animate) {
        titulo.animate(
            [
                { opacity: 0, letterSpacing: "0.1em" },
                { opacity: 1, letterSpacing: "0.02em" }
            ],
            {
                duration: 700,
                easing: "ease-out",
                fill: "forwards",
                delay: 200
            }
        );
    }

    const parrafos = document.querySelectorAll(".descripcion");
    parrafos.forEach((parrafo, indice) => {
        if (parrafo.animate) {
            parrafo.animate(
                [
                    { opacity: 0, transform: "translateY(18px)" },
                    { opacity: 1, transform: "translateY(0)" }
                ],
                {
                    duration: 700,
                    easing: "ease-out",
                    fill: "forwards",
                    delay: 250 + indice * 200
                }
            );
        }
    });
}

function mostrarMensajeBienvenida() {
    alert(
        "¡Buenas Profe! Bienvenido a mi mini GamePass.\n" +
        "Respondé los prompts y mirá la consola para ver cómo va la simulación."
    );
    console.log("🎮 ¡Gracias por entrar a mi primer simulador de GamePass!");
    console.log("👉 Tip: abrí la consola del navegador (F12) para seguir las novedades de cada juego.");
}

function obtenerOpcionMenu() {
    const menu = `
Elegí qué querés hacer:
1 - Ver todos los juegos disponibles
2 - Filtrar juegos por genero
3 - Registrar a una persona que quiera jugar
4 - Simular que reservás un juego
5 - Calcular un cargo por retraso en la devolución
ESC - Salir del simulador
    `;

    const opcion = prompt(menu);
    return opcion ? opcion.trim() : null;
}

function mostrarCatalogoJuegos(listaJuegos) {
    if (listaJuegos.length === 0) {
        console.log("Ups, todavía no cargué juegos disponibles. ¡Se vienen pronto!");
        return;
    }

    console.log("🕹️ Estos son los juegos disponibles ahora mismo:");
    listaJuegos.forEach((juego, indice) => {
        console.log(`${indice + 1}. ${juego.titulo} - ${juego.desarrollador} (${juego.genero}) | Disponible: ${juego.disponible ? "Sí" : "No"}`);
    });
}

function buscarJuegosPorGenero(listaJuegos) {
    const generoBuscado = prompt("¿Qué genero te gustaría jugar? (ej: Shooter, Aventura, Acción)");

    if (!generoBuscado) {
        console.log("Buscador cancelado. Sin genero no sé qué recomendar 😅.");
        return;
    }

    const resultado = listaJuegos.filter((juego) => juego.genero.toLowerCase() === generoBuscado.trim().toLowerCase());

    if (resultado.length === 0) {
        console.log(`No encontré juegos para el genero "${generoBuscado}". ¡Voy a sumar más para la próxima!`);
        return;
    }

    console.log(`Estos son los juegos que encontré en el genero "${generoBuscado}":`);
    resultado.forEach((juego) => {
        console.log(`- ${juego.titulo} (${juego.desarrollador}) | Disponible: ${juego.disponible ? "Sí" : "No"}`);
    });
}

function registrarJugador() {
    const nombre = prompt("¿Cómo se llama la nueva persona gamer?");
    if (!nombre) {
        console.log("Registro cancelado. Necesito al menos un nombre para poder registrarte.");
        return;
    }

    const apellido = prompt("¿Y su apellido?");
    if (!apellido) {
        console.log("Registro cancelado. Anotá un apellido así queda mas prolijo.");
        return;
    }

    const correo = prompt("¿Cuál es tu correo o user para contactarte?");
    if (!correo) {
        console.log("Registro cancelado. Sin contacto no puedo avisarte si se libera un juego.");
        return;
    }

    const nuevoUsuario = {
        id: jugadoresRegistrados.length + 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim()
    };

    jugadoresRegistrados.push(nuevoUsuario);
    console.log(`✅ Registro listo: ${nuevoUsuario.nombre} ${nuevoUsuario.apellido} (ID: ${nuevoUsuario.id}). ¡Bienvenido/a!`);
}

function calcularCargo(diasRetraso) {
    if (diasRetraso <= 0) {
        return 0;
    }
    return diasRetraso * CARGO_RETRASO_POR_DIA;
}

function gestionarCalculoMulta() {
    const diasIngresados = prompt("¿Cuántos días de retraso lleva la devolución del juego?");

    if (diasIngresados === null) {
        console.log("Cancelaste el cálculo de cargo. Todo bien, seguimos sin cobrar nada.");
        return;
    }

    const diasRetraso = parseInt(diasIngresados, 10);

    if (Number.isNaN(diasRetraso) || diasRetraso < 0) {
        console.log("Porfi, ingresá un número válido de días (0 o más) para poder calcular el cargo.");
        return;
    }

    const monto = calcularCargo(diasRetraso);
    if (monto === 0) {
        console.log("¡Se devolvió a tiempo! No corresponde pagar cargo.");
    } else {
        console.log(`El retraso en la devolución fue de ${diasRetraso} día(s). Cargo estimado: $${monto}.`);
    }
}

function simularReservaJuego(listaJuegos) {
    mostrarCatalogoJuegos(listaJuegos);

    const tituloSolicitado = prompt("Decime el titulo exacto del juego que querés reservar:");
    if (!tituloSolicitado) {
        console.log("No escribiste el titulo. Volvé cuando lo recuerdes 😉.");
        return;
    }

    const juegoEncontrado = listaJuegos.find(
        (juego) => juego.titulo.toLowerCase() === tituloSolicitado.trim().toLowerCase()
    );

    if (!juegoEncontrado) {
        console.log(`Busqué y busqué... pero "${tituloSolicitado}" todavía no está disponible.`);
        return;
    }

    if (!juegoEncontrado.disponible) {
        console.log(`El juego "${juegoEncontrado.titulo}" ya está reservado. Probá con otro mientras tanto.`);
        return;
    }

    const deseaReservar = confirm(
        `"${juegoEncontrado.titulo}" está disponible. ¿Confirmamos la reserva?`
    );
    if (!deseaReservar) {
        console.log("Cancelaste la reserva. El juego vuelve a estar disponible.");
        return;
    }

    let diasEstimados = prompt("¿Cuántos días pensás quedarte el juego? (Tip: entre 3 y 7 días)");
    if (diasEstimados === null) {
        console.log("No indicaste los días. Para esta prueba, te lo reservamos por 5 días.");
        diasEstimados = "5";
    }

    let diasReserva = parseInt(diasEstimados, 10);
    if (Number.isNaN(diasReserva) || diasReserva <= 0) {
        console.log("Ingresaste un valor raro. Te asigné 5 días por defecto para la reserva.");
        diasReserva = 5;
    }

    juegoEncontrado.disponible = false;
    console.log(`🎉 ¡Listo! "${juegoEncontrado.titulo}" es tuyo por ${diasReserva} día(s). ¡Que disfrutes la partida!`);
}

function iniciarSimulador() {
    mostrarMensajeBienvenida();

    let continuar = true;

    while (continuar) {
        const opcionSeleccionada = obtenerOpcionMenu();

        if (opcionSeleccionada === null) {
            console.log("Cerraste el menú sin elegir. Me tomo que saliste a estirar las piernas un toque.");
            break;
        }

        const opcionNormalizada = opcionSeleccionada.toUpperCase();

        if (opcionNormalizada === "ESC") {
            console.log("Elegiste salir del simulador gamer. ¡Gracias por probarlo!");
            continuar = false;
        } else {
            switch (opcionNormalizada) {
                case "1":
                    mostrarCatalogoJuegos(juegos);
                    console.log("Tip: probá la opción 4 para reservar alguno de los títulos.");
                    break;
                case "2":
                    buscarJuegosPorGenero(juegos);
                    break;
                case "3":
                    registrarJugador();
                    break;
                case "4":
                    simularReservaJuego(juegos);
                    break;
                case "5":
                    gestionarCalculoMulta();
                    break;
                default:
                    console.log("Esa opción no existe todavía. Elegí un número del menú o ESC para salir 🙏.");
            }

            if (continuar) {
                continuar = confirm("¿Querés probar otra opción del simulador gamer?");
            }
        }
    }

    console.log("🧑‍💻 Resumen final de personas gamer registradas:");
    console.table(jugadoresRegistrados);

    console.log("🎮 Estado final de la biblioteca gamer (así quedó después de las pruebas):");
    console.table(juegos);

    alert("¡Gracias por pasar por mi GamePass casero! Nos vemos en la próxima entrega.");
}

animarInterfaz();
iniciarSimulador();
