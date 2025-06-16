<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Just Sing</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <h1>Just Sing</h1>
  </header>

  <main>
    <section class="productos" id="productos-container">
      <!-- Productos se generan desde JavaScript -->
    </section>

    <aside class="carrito" id="carrito">
      <h2>Carrito</h2>
      <ul id="lista-carrito"></ul>
      <p>Total: $<span id="total">0</span></p>
      <button id="finalizar-compra">Finalizar compra</button>
    </aside>
  </main>

  <script src="app.js"></script>
</body>
</html>

<!-- app.js -->
<script>
const productos = [
  {
    id: 1,
    nombre: "Bolsa 001",
    precio: 4500,
    imagen: "ruta/de/tu/imagen1.jpg"
  },
  {
    id: 2,
    nombre: "Bolsa 002",
    precio: 4700,
    imagen: "ruta/de/tu/imagen2.jpg"
  },
  {
    id: 3,
    nombre: "Bolsa 003",
    precio: 4900,
    imagen: "ruta/de/tu/imagen3.jpg"
  }
];

const contenedor = document.getElementById("productos-container");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const finalizarBtn = document.getElementById("finalizar-compra");
let carrito = [];

productos.forEach(p => {
  const div = document.createElement("div");
  div.className = "producto";
  div.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}" />
    <h3>${p.nombre}</h3>
    <p>$${p.precio}</p>
    <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
  `;
  contenedor.appendChild(div);
});

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!carrito.find(item => item.id === id)) {
    carrito.push(producto);
    actualizarCarrito();
  } else {
    alert("Este producto ya fue agregado. Solo hay una unidad disponible.");
  }
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    listaCarrito.appendChild(li);
    total += p.precio;
  });
  totalSpan.textContent = total;
}

finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  alert("Compra simulada. Aquí iría la conexión con Mercado Pago o similar.");
});
</script>
