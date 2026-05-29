# 🌿 Fibonacci & Números Primos

Página web interactiva que aplica la **serie de Fibonacci** y los **números primos** a un problema del mundo real: detectar qué términos de Fibonacci también son números primos, con aplicaciones en seguridad y patrones naturales.

## 🗂️ Estructura del proyecto

```
desafio-fibonacci-primos/
│
├── index.html
├── ahorro fibonacci.html
├── codigos con primo.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
│   └── codigos-acceso.js
│   └── ahorro-fibonacci.js
└── README.md
```

## 🚀 Funcionalidades

- Genera la serie de Fibonacci para N términos (1–50)
- Detecta y resalta los términos que también son primos
- Muestra estadísticas: total de términos, cantidad de primos, suma total
- Verificador independiente de números primos
- Diseño responsivo (computadora, tablet, celular)

## Código principal

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Fibonacci & Primos — Desafío Web</title>
  <link rel="stylesheet" href="css/estilos.css" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet"/>
</head>
<body>

  <!-- ENCABEZADO -->
  <header class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <span class="badge">Desafío Web 2025</span>
      <h1>Fibonacci<br/><em>&amp; Números Primos</em></h1>
      <p class="subtitle">Matemáticas que resuelven problemas del mundo real</p>
      <div class="student-info">
        <span>👤 Alvaro Rojas</span>
        <span>🏫 Carrera de Informática</span>
      </div>
    </div>
    <div class="scroll-hint">↓ explorar</div>
  </header>

  <nav class="nav">
    <a href="ahorro fibonacci.html">AHORRO FIBONACCI</a>
    <a href="codigos con primos.html">CODIGO CON PRIMOS</a>
    <a href="index.html">PRINCIPAL</a>
  </nav>

  <!-- CONTEXTO -->
  <section class="section" id="contexto">
    <div class="container">
      <div class="section-label">01 / Contexto</div>
      <h2>¿Por qué importa?</h2>
      <div class="cards-grid">
        <div class="card card--fib">
          <div class="card-icon">🌿</div>
          <h3>Serie de Fibonacci</h3>
          <p>Aparece en el crecimiento de plantas, espirales de caracoles, reproducción de conejos y proyecciones financieras. Cada número es la suma de los dos anteriores: <strong>0, 1, 1, 2, 3, 5, 8, 13…</strong></p>
        </div>
        <div class="card card--prime">
          <div class="card-icon">🔐</div>
          <h3>Números Primos</h3>
          <p>Solo divisibles entre 1 y sí mismos. Son la base de la criptografía moderna, protegen contraseñas, transacciones bancarias y comunicaciones seguras en internet.</p>
        </div>
        <div class="card card--combo">
          <div class="card-icon">✨</div>
          <h3>La intersección</h3>
          <p>Algunos términos de Fibonacci <em>también</em> son números primos: 2, 3, 5, 13, 89, 233… Esta propiedad se usa en diseño de algoritmos de seguridad especiales.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ALGORITMO -->
  <section class="section section--dark" id="algoritmo">
    <div class="container">
      <div class="section-label">02 / Algoritmo</div>
      <h2>¿Cómo funciona?</h2>
      <div class="algo-grid">
        <div class="algo-step">
          <div class="step-num">1</div>
          <h4>Generar Fibonacci</h4>
          <p>Se empieza con <code>a=0</code> y <code>b=1</code>. En cada paso, el siguiente valor es <code>a + b</code>, luego se desplaza: <code>a = b</code>, <code>b = siguiente</code>.</p>
        </div>
        <div class="algo-arrow">→</div>
        <div class="algo-step">
          <div class="step-num">2</div>
          <h4>Verificar si es primo</h4>
          <p>Para cada término Fibonacci, se cuenta cuántos divisores tiene. Si exactamente 2 divisores (1 y él mismo), <strong>es primo</strong>.</p>
        </div>
        <div class="algo-arrow">→</div>
        <div class="algo-step">
          <div class="step-num">3</div>
          <h4>Mostrar resultado</h4>
          <p>Se muestra la secuencia completa y se resaltan los términos que son primos, junto con estadísticas del cálculo.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMULARIO + RESULTADO -->
  <section class="section" id="calculadora">
    <div class="container">
      <div class="section-label">03 / Calculadora</div>
      <h2>Pruébalo tú mismo</h2>

      <div class="app-wrapper">
        <!-- Formulario -->
        <div class="form-panel">
          <h3>Ingresa los datos</h3>

          <div class="field-group">
            <label for="terminos">Cantidad de términos Fibonacci</label>
            <input type="number" id="terminos" min="1" max="50" value="15" placeholder="Ej: 15"/>
            <span class="field-hint">Entre 1 y 50 términos</span>
          </div>

          <div class="field-group">
            <label for="modoVista">Modo de visualización</label>
            <select id="modoVista">
              <option value="todos">Mostrar todos los términos</option>
              <option value="soloprimos">Solo mostrar los primos Fibonacci</option>
            </select>
          </div>

          <button id="btnCalcular" onclick="calcular()">
            <span>Calcular</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

          <button id="btnLimpiar" onclick="limpiar()">
            Limpiar resultados
          </button>
        </div>

        <!-- Resultado -->
        <div class="result-panel">
          <div id="resultado">
            <div class="result-empty">
              <span>🔢</span>
              <p>Los resultados aparecerán aquí</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- VERIFICADOR PRIMO -->
  <section class="section section--accent" id="verificador">
    <div class="container">
      <div class="section-label">04 / Extra</div>
      <h2>Verificador de número primo</h2>
      <p class="section-desc">¿Quieres saber si un número específico es primo? Ingrésalo aquí.</p>

      <div class="verificador-wrapper">
        <div class="verificador-input">
          <input type="number" id="numeroVerif" min="1" placeholder="Ej: 97" />
          <button onclick="verificarPrimo()">Verificar</button>
        </div>
        <div id="resultadoVerif" class="verif-result"></div>
      </div>
    </div>
  </section>

  <!-- CONCLUSIÓN -->
  <section class="section" id="conclusion">
    <div class="container">
      <div class="section-label">05 / Conclusión</div>
      <h2>¿Qué aprendimos?</h2>
      <div class="conclusion-text">
        <p>La serie de Fibonacci y los números primos no son conceptos abstractos: están en la naturaleza, en la tecnología y en nuestra vida cotidiana. Esta calculadora demuestra que con algoritmos simples podemos encontrar patrones matemáticos profundos.</p>
        <p>Detectar cuáles términos de Fibonacci son primos puede usarse en diseño de claves de seguridad, generación de secuencias pseudoaleatorias y análisis de patrones naturales.</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>UMSA</p>
  </footer>

  <script src="js/script.js"></script>
</body>
</html>

