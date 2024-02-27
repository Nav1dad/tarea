
    class MenuItem {
        constructor(nombre, precio) {
            this.nombre = nombre;
            this.precio = precio;
        }

        renderRow() {
            return `<tr><td>${this.nombre}</td><td>${this.precio.toFixed(2)}</td></tr>`;
        }
    }

    class Menu {
        constructor() {
            this.items = [];
        }

        agregarItem(item) {
            this.items.push(item);
        }

        renderMenu() {
            const menuTable = document.getElementById("menuTable");
            for (const item of this.items) {
                menuTable.innerHTML += item.renderRow();
            }
        }
    }

    class Pedido {
        constructor() {
            this.pedidos = [];
            this.estadoPedido = {};
        }

        agregarPedido(item, cantidad) {
            if (this.estadoPedido.hasOwnProperty(item.nombre)) {
                alert("Solo se permite un pedido por cliente.");
            } else {
                const total = item.precio * cantidad;
                this.pedidos.push({ item, cantidad, total });
                this.estadoPedido[item.nombre] = "En cocina";

                const cocinaTable = document.getElementById("cocinaTable");
                const newRow = cocinaTable.insertRow(-1);
                newRow.innerHTML = `<td>${item.nombre}</td><td>${cantidad}</td><td>${this.estadoPedido[item.nombre]}</td><td><button onclick="marcarListo('${item.nombre}')">Listo</button></td>`;
            }
        }

        marcarListo(itemNombre) {
            if (this.estadoPedido.hasOwnProperty(itemNombre) && this.estadoPedido[itemNombre] === "En cocina") {
                this.estadoPedido[itemNombre] = "Listo";

                // Actualizar estado en la tabla de pedidos en cocina
                const cocinaTable = document.getElementById("cocinaTable");
                for (let i = 1; i < cocinaTable.rows.length; i++) {
                    const rowProducto = cocinaTable.rows[i].cells[0].innerHTML;
                    if (rowProducto === itemNombre) {
                        cocinaTable.rows[i].cells[2].innerHTML = "Listo";
                        break;
                    }
                }
            } else {
                alert("El pedido ya está marcado como listo o no existe.");
            }
        }
    }

    const hamburguesas = new MenuItem("Hamburguesas con papas", 5.99);
    const tacos = new MenuItem("Tacos de Birria", 7.99);
    const nachos = new MenuItem("Nachos", 4.99);
    const bebidas = new MenuItem("Bebidas de industria la constancia", 1.99);

    const menu = new Menu();
    menu.agregarItem(hamburguesas);
    menu.agregarItem(tacos);
    menu.agregarItem(nachos);
    menu.agregarItem(bebidas);

    menu.renderMenu();

    const pedido = new Pedido();

    const productoSelect = document.getElementById("producto");
    for (const item of menu.items) {
        const option = document.createElement("option");
        option.value = item.nombre;
        option.text = item.nombre;
        productoSelect.add(option);
    }

    function agregarPedido() {
        const producto = productoSelect.value;
        const cantidad = parseInt(document.getElementById("cantidad").value);

        const selectedItem = menu.items.find(item => item.nombre === producto);
        pedido.agregarPedido(selectedItem, cantidad);
    }

    function marcarListo(itemNombre) {
        pedido.marcarListo(itemNombre);
    }