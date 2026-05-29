// =============================================
//  DESAFÍO WEB — Fibonacci & Números Primos
//  Archivo: js/script.js
// =============================================


// ---------------------------------------------
// FUNCIÓN: Verificar si un número es primo
// Un número primo solo se divide entre 1 y sí mismo.
// ---------------------------------------------
function esPrimo(numero) {
  // Los números menores a 2 no son primos (incluye 0 y 1)
  if (numero < 2) return false;

  // Contamos cuántos divisores tiene el número
  let contador = 0;

  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      contador++;
    }
  }

  // Si exactamente tiene 2 divisores (1 y él mismo), es primo
  return contador === 2;
}


// ---------------------------------------------
// FUNCIÓN PRINCIPAL: Calcular la secuencia
// Lee los datos del formulario con getElementById
// y muestra los resultados en pantalla.
// ---------------------------------------------
function calcular() {
  // Leer datos del formulario usando getElementById (requerimiento obligatorio)
  let inputTerminos = document.getElementById("terminos");
  let inputModo    = document.getElementById("modoVista");
  let panelResultado = document.getElementById("resultado");

  // Convertir el valor a número entero
  let n = parseInt(inputTerminos.value);

  // Validar que el dato ingresado sea válido
  if (isNaN(n) || n < 1 || n > 50) {
    panelResultado.innerHTML = `
      <div style="color: #ff6b6b; padding: 1rem; background: rgba(255,107,107,0.1);
           border-radius: 12px; border: 1px solid rgba(255,107,107,0.3);">
        ⚠️ Por favor ingresa un número entre 1 y 50.
      </div>`;
    return;
  }

  let modo = inputModo.value; // "todos" o "soloprimos"

  // ---------------------------------------------
  // GENERAR LA SERIE DE FIBONACCI
  // Usamos tres variables simples (sin arrays) como pide el desafío
  // ---------------------------------------------
  let a = 0;   // Primer término
  let b = 1;   // Segundo término
  let c;       // Variable auxiliar para el siguiente valor

  // Arreglos para guardar los resultados
  let terminos = [];   // Todos los términos Fibonacci
  let primosFib = [];  // Solo los que también son primos

  for (let i = 1; i <= n; i++) {
    let valor;

    if (i === 1) {
      valor = a;
    } else if (i === 2) {
      valor = b;
    } else {
      // El siguiente término es la suma de los dos anteriores
      c = a + b;
      a = b;
      b = c;
      valor = b;
    }

    // Verificar si este término Fibonacci es también primo
    let esPrimoFib = esPrimo(valor);

    terminos.push({ indice: i, valor: valor, primo: esPrimoFib });

    if (esPrimoFib) {
      primosFib.push(valor);
    }
  }

  // Calcular la suma total de los términos
  let sumaTotal = terminos.reduce(function(acc, t) { return acc + t.valor; }, 0);

  // ---------------------------------------------
  // CONSTRUIR EL HTML DEL RESULTADO
  // Usamos innerHTML para mostrar en pantalla (requerimiento obligatorio)
  // ---------------------------------------------

  // --- Estadísticas generales ---
  let htmlStats = `
    <div class="stats-row">
      <span class="stat-chip stat-chip--total">Total: ${n} términos</span>
      <span class="stat-chip stat-chip--primes">Primos Fibonacci: ${primosFib.length}</span>
      <span class="stat-chip stat-chip--sum">Suma total: ${sumaTotal.toLocaleString()}</span>
    </div>
  `;

  // --- Secuencia de términos ---
  let htmlSecuencia = `<div class="sequence-title">Secuencia generada</div><div class="sequence-grid">`;

  let terminosMostrar = (modo === "soloprimos")
    ? terminos.filter(function(t) { return t.primo; })
    : terminos;

  terminosMostrar.forEach(function(t, idx) {
    let claseExtra = t.primo ? "is-prime" : "";
    // La animación se retrasa un poco más por cada término para efecto escalonado
    let delay = idx * 50;

    htmlSecuencia += `
      <div class="term ${claseExtra}" style="animation-delay: ${delay}ms">
        ${t.valor}
        <span class="term-index">F${t.indice}</span>
      </div>`;
  });

  htmlSecuencia += `</div>`;

  // Mensaje si filtró por primos y no encontró ninguno
  if (modo === "soloprimos" && primosFib.length === 0) {
    htmlSecuencia += `<p style="margin-top:1rem; font-size:0.85rem;">
      Ninguno de los ${n} primeros términos Fibonacci es primo (además del 0 y 1).
    </p>`;
  }

  // --- Lista de primos encontrados ---
  let htmlPrimos = "";
  if (primosFib.length > 0) {
    htmlPrimos = `
      <div class="primes-list">
        <h4>🔴 Primos Fibonacci encontrados</h4>
        <p>${primosFib.join(", ")}</p>
      </div>`;
  }

  // --- Mostrar todo en el panel de resultado ---
  panelResultado.innerHTML = htmlStats + htmlSecuencia + htmlPrimos;
}


// ---------------------------------------------
// FUNCIÓN: Limpiar resultados
// Restaura el panel a su estado inicial.
// ---------------------------------------------
function limpiar() {
  document.getElementById("resultado").innerHTML = `
    <div class="result-empty">
      <span>🔢</span>
      <p>Los resultados aparecerán aquí</p>
    </div>`;

  // Limpiar también el verificador
  let verifResult = document.getElementById("resultadoVerif");
  verifResult.innerHTML = "";
  verifResult.className = "verif-result";

  // Limpiar campos
  document.getElementById("terminos").value = "15";
  document.getElementById("numeroVerif").value = "";
}


// ---------------------------------------------
// FUNCIÓN: Verificar si un número es primo (sección extra)
// Usa getElementById para leer y mostrar el resultado.
// ---------------------------------------------
function verificarPrimo() {
  // Leer el número ingresado con getElementById (requerimiento obligatorio)
  let inputNumero = document.getElementById("numeroVerif");
  let panelVerif  = document.getElementById("resultadoVerif");

  let numero = parseInt(inputNumero.value);

  // Validar que sea un número positivo
  if (isNaN(numero) || numero < 1) {
    panelVerif.innerHTML = "⚠️ Ingresa un número entero positivo.";
    panelVerif.className = "verif-result no-primo";
    return;
  }

  // Verificar usando la función esPrimo
  if (esPrimo(numero)) {
    panelVerif.innerHTML = `✅ ${numero} es un número primo 🔐`;
    panelVerif.className = "verif-result is-primo";
  } else {
    panelVerif.innerHTML = `❌ ${numero} NO es un número primo`;
    panelVerif.className = "verif-result no-primo";
  }
}


// ---------------------------------------------
// Permitir calcular al presionar Enter
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("terminos").addEventListener("keydown", function(e) {
    if (e.key === "Enter") calcular();
  });

  document.getElementById("numeroVerif").addEventListener("keydown", function(e) {
    if (e.key === "Enter") verificarPrimo();
  });
});
