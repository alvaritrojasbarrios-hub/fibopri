// =============================================
//  AHORRO PROGRESIVO — Serie de Fibonacci
//  Archivo: js/ahorro-fibonacci.js
// =============================================

// Variable global para la moneda seleccionada
let moneda = "Bs.";


// ---------------------------------------------
// FUNCIÓN: Cambiar la moneda activa
// ---------------------------------------------
function setCurrency(simbolo, boton) {
  moneda = simbolo;

  // Actualizar el botón activo visualmente
  let botones = document.querySelectorAll(".currency-btn");
  botones.forEach(function(b) { b.classList.remove("active"); });
  boton.classList.add("active");
}


// ---------------------------------------------
// FUNCIÓN: Formatear número con separadores
// Ej: 1234.5 → "1,234.50"
// ---------------------------------------------
function formatear(numero) {
  return numero.toLocaleString("es-BO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


// ---------------------------------------------
// FUNCIÓN PRINCIPAL: Calcular el plan de ahorro
// Lee los datos del formulario con getElementById
// y muestra los resultados en pantalla.
// ---------------------------------------------
function calcularAhorro() {
  // Leer datos del formulario con getElementById (requerimiento obligatorio)
  let inputMeses = document.getElementById("meses");
  let inputBase  = document.getElementById("base");
  let panelResultado = document.getElementById("resultado");

  let n    = parseInt(inputMeses.value);
  let base = parseFloat(inputBase.value);

  // Validar datos ingresados
  if (isNaN(n) || n < 1 || n > 24) {
    panelResultado.innerHTML = `
      <div style="color:var(--color-prime); padding:1.25rem;
           background:rgba(255,107,107,0.1); border-radius:12px;
           border:1px solid rgba(255,107,107,0.3);">
        ⚠️ Ingresa una cantidad de meses entre 1 y 24.
      </div>`;
    return;
  }

  if (isNaN(base) || base <= 0) {
    panelResultado.innerHTML = `
      <div style="color:var(--color-prime); padding:1.25rem;
           background:rgba(255,107,107,0.1); border-radius:12px;
           border:1px solid rgba(255,107,107,0.3);">
        ⚠️ El depósito base debe ser un número mayor a 0.
      </div>`;
    return;
  }

  // ---------------------------------------------
  // GENERAR LA SERIE DE FIBONACCI
  // Se usan variables simples: a, b, c (sin arrays)
  // El depósito de cada mes = término Fibonacci × base
  // ---------------------------------------------
  let a = 0;   // Primer término Fibonacci
  let b = 1;   // Segundo término Fibonacci
  let c;       // Variable auxiliar

  let totalAhorrado = 0;
  let depositoMaximo = 0;
  let meses = [];

  for (let i = 1; i <= n; i++) {
    let termino;

    if (i === 1) {
      termino = a;
    } else if (i === 2) {
      termino = b;
    } else {
      c = a + b;   // Siguiente Fibonacci = suma de los dos anteriores
      a = b;
      b = c;
      termino = b;
    }

    // El depósito de este mes es el término escalado por la base
    // Si el término es 0 (mes 1), se deposita la base directamente
    let deposito = (termino === 0 ? 1 : termino) * base;

    totalAhorrado += deposito;
    if (deposito > depositoMaximo) depositoMaximo = deposito;

    meses.push({
      mes: i,
      termino: termino === 0 ? 1 : termino,
      deposito: deposito,
      acumulado: totalAhorrado
    });
  }

  // Promedio mensual
  let promedio = totalAhorrado / n;

  // ---------------------------------------------
  // CONSTRUIR HTML DEL RESULTADO
  // Se muestra en pantalla con getElementById (requerimiento obligatorio)
  // ---------------------------------------------

  // --- Tarjetas de resumen ---
  let htmlResumen = `
    <div class="resumen-grid">
      <div class="resumen-card">
        <div class="valor">${moneda} ${formatear(totalAhorrado)}</div>
        <div class="etiqueta">Total ahorrado</div>
      </div>
      <div class="resumen-card">
        <div class="valor">${n}</div>
        <div class="etiqueta">Meses de ahorro</div>
      </div>
      <div class="resumen-card">
        <div class="valor">${moneda} ${formatear(depositoMaximo)}</div>
        <div class="etiqueta">Depósito máximo</div>
      </div>
      <div class="resumen-card">
        <div class="valor">${moneda} ${formatear(promedio)}</div>
        <div class="etiqueta">Promedio mensual</div>
      </div>
    </div>`;

  // --- Lista de meses con barras de progreso ---
  let htmlMeses = `<div class="sequence-title" style="margin-bottom:0.75rem;">Detalle por mes</div>`;

  meses.forEach(function(m, idx) {
    let porcentajeBarra = Math.round((m.deposito / depositoMaximo) * 100);
    let delay = idx * 40;

    htmlMeses += `
      <div class="mes-card" style="animation-delay:${delay}ms">
        <div class="mes-num">M${m.mes}</div>
        <div>
          <div class="mes-deposito">${moneda} ${formatear(m.deposito)}</div>
          <div class="mes-acumulado">Acumulado: ${moneda} ${formatear(m.acumulado)}</div>
        </div>
        <div class="mes-barra">
          <div class="barra-track">
            <div class="barra-fill" style="width:${porcentajeBarra}%"></div>
          </div>
        </div>
        <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--color-text-muted); min-width:40px; text-align:right;">
          F(${m.termino})
        </div>
      </div>`;
  });

  // Mostrar todo en el panel usando getElementById (requerimiento obligatorio)
  panelResultado.innerHTML = htmlResumen + htmlMeses;
}


// ---------------------------------------------
// FUNCIÓN: Cargar un ejemplo predefinido
// ---------------------------------------------
function probar(mesesVal, baseVal) {
  document.getElementById("meses").value = mesesVal;
  document.getElementById("base").value  = baseVal;
  calcularAhorro();
}


// ---------------------------------------------
// FUNCIÓN: Limpiar resultados
// ---------------------------------------------
function limpiar() {
  document.getElementById("resultado").innerHTML = `
    <div class="result-empty">
      <span>💰</span>
      <p>Tu plan de ahorro aparecerá aquí</p>
    </div>`;
  document.getElementById("meses").value = "12";
  document.getElementById("base").value  = "10";
}


// ---------------------------------------------
// Inicialización: Enter para calcular
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("meses").addEventListener("keydown", function(e) {
    if (e.key === "Enter") calcularAhorro();
  });
  document.getElementById("base").addEventListener("keydown", function(e) {
    if (e.key === "Enter") calcularAhorro();
  });
});