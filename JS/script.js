// Constantes y arrays
const medicamento1 = {
  nombre: "Paracetamol",
  dosisPorKg: 15, // mg por kg
};

const medicamento2 = {
  nombre: "Ibuprofeno",
  dosisPorKg: 10, // mg por kg
};

const medicamento3 = {
  nombre: "Amoxicilina",
  dosisPorKg: 20, // mg por kg
};

const medicamentos = [medicamento1, medicamento2, medicamento3];
console.table(medicamentos);

// Array para almacenar el historial de cálculos
let historialCalculos = [];

// Función 1 que calcula la dosis pediátrica
function calcularDosisPediatrica(peso, dosisPorKg, dilucion, concentracion) {
  let dosis = (peso * dosisPorKg * dilucion) / concentracion;
  console.log("Cálculo de dosis:", {
    peso: peso,
    dosisPorKg: dosisPorKg,
    dilucion: dilucion,
    concentracion: concentracion,
    dosisCalculada: dosis,
  });
  return dosis;
}

// Función 2 para mostrar detalles del medicamento seleccionado
function mostrarDetallesMedicamento(medicamento) {
  console.log("Detalles del medicamento seleccionado:", {
    nombre: medicamento.nombre,
    dosisPorKg: medicamento.dosisPorKg,
  });
  alert(
    "Has seleccionado el medicamento: " +
    medicamento.nombre +
    "\nDosis recomendada por kg: " +
    medicamento.dosisPorKg +
    " mg."
  );
}

// Función 3 para mostrar el historial de cálculos
function mostrarHistorial() {
  if (historialCalculos.length === 0) {
    alert("No hay cálculos en el historial.");
  } else {
    let mensajeHistorial = "Historial de cálculos:\n";
    historialCalculos.forEach((calculo, index) => {
      mensajeHistorial += index + 1 + ". " + calculo.mensaje + "\n";
    });
    alert(mensajeHistorial);
    console.log("Historial mostrado:", historialCalculos);
  }
}

// Función 4, principal
function iniciarCalculadora() {
  let continuar = true;

  while (continuar) {
    // Solicita peso del paciente
    let peso = parseFloat(
      prompt("Por favor, ingrese el peso del paciente en kg:")
    );
    console.log("Peso ingresado:", peso);

    if (isNaN(peso) || peso <= 0) {
      alert("Por favor, ingrese un peso válido.");
      continue;
    }

    // Mostrar lista de medicamentos
    let mensajeMedicamentos = "Seleccione el medicamento:\n";
    let index = 1;
    for (let medicamento of medicamentos) {
      mensajeMedicamentos += index + ". " + medicamento.nombre + "\n";
      index++;
    }
    console.log("Mensaje de medicamentos:", mensajeMedicamentos);

    // Solicitar selección de medicamento
    let seleccion = parseInt(prompt(mensajeMedicamentos)) - 1;
    console.log("Selección ingresada:", seleccion);

    if (seleccion < 0 || seleccion >= medicamentos.length) {
      alert("Selección inválida. Intente nuevamente.");
      continue;
    }

    let medicamentoSeleccionado = medicamentos[seleccion];
    console.log("Medicamento seleccionado:", medicamentoSeleccionado);

    // Mostrar detalles del medicamento seleccionado
    mostrarDetallesMedicamento(medicamentoSeleccionado);

    // se solicita al usuario la dilución y concentración
    let dilucion = parseFloat(
      prompt(
        "Ingrese la dilución del " + medicamentoSeleccionado.nombre + " en cc:"
      )
    );
    console.log("Dilución ingresada:", dilucion);

    if (isNaN(dilucion) || dilucion <= 0) {
      alert("Por favor, ingrese una dilución válida.");
      continue;
    }

    let concentracion = parseFloat(
      prompt(
        "Ingrese la concentración del " +
        medicamentoSeleccionado.nombre +
        " en mg/cc:"
      )
    );
    console.log("Concentración ingresada:", concentracion);

    if (isNaN(concentracion) || concentracion <= 0) {
      alert("Por favor, ingrese una concentración válida.");
      continue;
    }

    // calcular la dosis
    let dosisCalculada = calcularDosisPediatrica(
      peso,
      medicamentoSeleccionado.dosisPorKg,
      dilucion,
      concentracion
    );

    // se muestra el resultado al usuario
    const resultado =
      "La dosis recomendada de " +
      medicamentoSeleccionado.nombre +
      " para un paciente de " +
      peso +
      " kg es " +
      dosisCalculada.toFixed(2) +
      " cc.";
    alert(resultado);
    console.log("Resultado mostrado:", resultado);

    // s el cálculo al historial
    historialCalculos.push({
      mensaje: resultado,
      peso: peso,
      medicamento: medicamentoSeleccionado.nombre,
      dosis: dosisCalculada,
      dilucion: dilucion,
      concentracion: concentracion,
    });

    // Preguntar si desea realizar otro cálculo
    continuar = confirm("¿Te gustaría calcular otra dosis?");
    console.log("Respuesta del usuario a continuar:", continuar);

    // Si la respuesta es no, preguntar si desea ver el historial
    if (!continuar) {
      mostrarHistorial();
      alert("Gracias por utilizar nuestra calculadora!");
      console.log(
        "Alerta mostrada: 'Gracias por utilizar nuestra calculadora!'"
      );
    }
  }

  console.log("Calculadora finalizada.");
}

// Ejecutar la función principal para iniciar la calculadora
iniciarCalculadora();
