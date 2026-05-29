// =============================================
//  CÓDIGOS DE ACCESO SEGUROS — Números Primos
//  Archivo: js/codigos-acceso.js
// =============================================


// ---------------------------------------------
// FUNCIÓN: Verificar si un número es primo
// Cuenta todos los divisores del número.
// Si tiene exactamente 2 → es primo.
// ---------------------------------------------
function esPrimo(numero) {
  if (numero < 2) return false;

  let contador = 0;

  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      contador++;
    }
  }

  return contador === 2;
}


// ---------------------------------------------
// FUNCIÓN: Obtener todos los divisores de un número
// Útil para mostrar en el resultado por qué NO es primo.
// ---------------------------------------------
function obtenerDivisores(numero) {
  let divisores = [];
  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      divisores.push(i);
    }
  }
  return divisores;
}


// ---------------------------------------------
// FUNCIÓN: Encontrar el primo más cercano
// Busca hacia arriba y hacia abajo desde el número dado.
// ---------------------------------------------
function primoCercano(numero) {
  let arriba = numero + 1;
  let abajo  = numero - 1;

  while (arriba < numero + 1000) {
    if (esPrimo(arriba)) break;
    arriba++;
  }

  while (abajo > 1) {
    if (esPrimo(abajo)) break;
    abajo--;
  }

  return { arriba: arriba, abajo: abajo };
}


// ---------------------------------------------
// FUNCIÓN PRINCIPAL: Validar código de acceso
// Lee el código del formulario y muestra el resultado.
// ---------------------------------------------
function validarCodigo() {
  // Leer datos con getElementById (requerimiento obligatorio)
  let inputCodigo   = document.getElementById("codigo");
  let selectNivel   = document.getElementById("nivelSeguridad");
  let panelResultado = document.getElementById("resultado");

  let codigo = parseInt(inputCodigo.value);
  let nivel  = selectNivel.value;

  // Validar que se ingresó un número
  if (isNaN(codigo) || codigo < 1) {
    panelResultado.innerHTML = `
      <div style="color: var(--color-prime); padding: 1.25rem;
           background: rgba(255,107,107,0.1); border-radius: 12px;
           border: 1px solid rgba(255,107,107,0.3);">
        ⚠️ Por favor ingresa un código numérico válido (número entero positivo).
      </div>`;
    return;
  }

  // Verificar longitud mínima según nivel de seguridad
  let digitos = String(codigo).length;
  let minimoDigitos = nivel === "alto" ? 4 : nivel === "medio" ? 3 : 1;

  if (digitos < minimoDigitos) {
    panelResultado.innerHTML = `
      <div style="color: var(--color-gold); padding: 1.25rem;
           background: rgba(255,209,102,0.1); border-radius: 12px;
           border: 1px solid rgba(255,209,102,0.3);">
        ⚠️ El nivel de seguridad <strong>${nivel}</strong> requiere mínimo
        <strong>${minimoDigitos} dígitos</strong>. Tu código tiene ${digitos}.
      </div>`;
    return;
  }

  // Verificar si el código es primo
  let primo    = esPrimo(codigo);
  let divisores = obtenerDivisores(codigo);
  let cercanos = primoCercano(codigo);

  // --- Construir el HTML del resultado ---
  let iconoEstado = primo ? "✅" : "❌";
  let etiqueta    = primo ? "CÓDIGO VÁLIDO" : "CÓDIGO NO VÁLIDO";
  let colorClase  = primo ? "var(--color-fib)" : "var(--color-prime)";
  let bgColor     = primo ? "rgba(79,255,176,0.08)" : "rgba(255,107,107,0.08)";
  let borderColor = primo ? "rgba(79,255,176,0.25)" : "rgba(255,107,107,0.25)";

  // Bloque principal de veredicto
  let htmlVeredicto = `
    <div style="background:${bgColor}; border:1px solid ${borderColor};
         border-radius:16px; padding:1.75rem; margin-bottom:1.5rem; text-align:center;">
      <div style="font-size:2.5rem; margin-bottom:0.5rem;">${iconoEstado}</div>
      <div style="font-family:var(--font-display); font-size:1.6rem; font-weight:800;
           color:${colorClase}; margin-bottom:0.4rem;">${etiqueta}</div>
      <div style="font-family:var(--font-mono); font-size:2rem; font-weight:700;
           color:var(--color-text); letter-spacing:0.15em;">${codigo}</div>
      <div style="font-size:0.8rem; color:var(--color-text-muted); margin-top:0.5rem;">
        ${digitos} dígitos · Nivel ${nivel}
      </div>
    </div>`;

  // Análisis de divisores
  let htmlDivisores;
  if (primo) {
    htmlDivisores = `
      <div style="background:var(--color-surface-2); border-radius:12px;
           padding:1.25rem; margin-bottom:1rem;">
        <div class="sequence-title" style="margin-bottom:0.6rem;">Análisis matemático</div>
        <p style="font-size:0.88rem;">
          El código <strong style="color:var(--color-fib)">${codigo}</strong> tiene exactamente
          <strong>2 divisores</strong>: el <code>1</code> y el <code>${codigo}</code> mismo.
          Eso lo hace primo ✔️ y matemáticamente robusto como clave de acceso.
        </p>
      </div>`;
  } else {
    let divMostrar = divisores.slice(0, 12);
    let extra = divisores.length > 12 ? `... (${divisores.length} divisores en total)` : "";
    htmlDivisores = `
      <div style="background:var(--color-surface-2); border-radius:12px;
           padding:1.25rem; margin-bottom:1rem;">
        <div class="sequence-title" style="margin-bottom:0.6rem;">¿Por qué NO es primo?</div>
        <p style="font-size:0.88rem; margin-bottom:0.75rem;">
          Tiene <strong style="color:var(--color-prime)">${divisores.length} divisores</strong>
          (necesita exactamente 2 para ser primo):
        </p>
        <div class="sequence-grid">
          ${divMostrar.map(function(d, idx) {
            let esPrimero = d === 1;
            let esUltimo  = d === codigo;
            let color = (esPrimero || esUltimo) ? "is-prime" : "";
            return `<div class="term ${color}" style="animation-delay:${idx*40}ms">${d}</div>`;
          }).join("")}
        </div>
        ${extra ? `<p style="font-size:0.75rem; margin-top:0.5rem; color:var(--color-text-muted);">${extra}</p>` : ""}
      </div>`;
  }

  // Sugerencia de primo más cercano (solo si no es primo)
  let htmlSugerencia = "";
  if (!primo) {
    htmlSugerencia = `
      <div style="background:rgba(123,97,255,0.08); border:1px solid rgba(123,97,255,0.2);
           border-radius:12px; padding:1.25rem;">
        <div class="sequence-title" style="color:var(--color-accent); margin-bottom:0.6rem;">
          💡 Códigos primos cercanos
        </div>
        <p style="font-size:0.88rem;">
          Podrías usar <code style="color:var(--color-fib); font-size:1rem;">${cercanos.abajo}</code>
          (anterior) o <code style="color:var(--color-fib); font-size:1rem;">${cercanos.arriba}</code>
          (siguiente) como alternativas seguras.
        </p>
      </div>`;
  }

  // Mostrar todo usando getElementById (requerimiento obligatorio)
  panelResultado.innerHTML = htmlVeredicto + htmlDivisores + htmlSugerencia;
}


// ---------------------------------------------
// FUNCIÓN: Probar un número de ejemplo
// ---------------------------------------------
function probar(numero) {
  document.getElementById("codigo").value = numero;
  validarCodigo();
}


// ---------------------------------------------
// FUNCIÓN: Limpiar resultados
// ---------------------------------------------
function limpiar() {
  document.getElementById("resultado").innerHTML = `
    <div class="result-empty">
      <span>🔢</span>
      <p>El resultado de validación aparecerá aquí</p>
    </div>`;
  document.getElementById("codigo").value = "";
}


// ---------------------------------------------
// FUNCIÓN: Generar tabla de los primeros 30 primos
// Se ejecuta al cargar la página.
// ---------------------------------------------
function generarTablaPrimos() {
  let panel = document.getElementById("tablaPrimos");
  let primos = [];
  let numero = 2;

  // Encontrar los primeros 30 primos
  while (primos.length < 30) {
    if (esPrimo(numero)) {
      primos.push(numero);
    }
    numero++;
  }

  let html = `<div class="sequence-grid">`;
  primos.forEach(function(p, idx) {
    html += `<div class="term is-prime" style="animation-delay:${idx * 60}ms">${p}</div>`;
  });
  html += `</div>`;
  html += `<p style="margin-top:1.25rem; font-size:0.85rem;">
    Los números <span style="color:var(--color-prime)">resaltados en rojo</span>
    son primos. Nota cómo se vuelven más escasos a medida que los números crecen.
  </p>`;

  panel.innerHTML = html;
}


// ---------------------------------------------
// Inicialización al cargar la página
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  generarTablaPrimos();

  // Enter para validar
  document.getElementById("codigo").addEventListener("keydown", function(e) {
    if (e.key === "Enter") validarCodigo();
  });
});