const readline = require("readline");

// arreglo de cadenas con las lineas de código a ejecutar.
const procesosPredefinidos = [
    ["a = 1 + 2;", "console.log(\"1 + 2\");", "console.log(a);"],
    ["b = 3 + 4;", "console.log(\"3 + 4\");"],
    ["c = 5 + 6;", "console.log(\"5 + 6\");", "console.log(c);"]
];

// clase para representar un proceso
class Proceso {
    constructor(id, instrucciones) {
        this.id = id;
        this.instrucciones = instrucciones;
        this.lineaActual = 0;
        this.terminado = false;
    }

    ejecutar() {
        if (this.lineaActual < this.instrucciones.length) {
            console.log(`Proceso ${this.id}\nLinea de codigo: ${this.instrucciones[this.lineaActual]}`);
            this.lineaActual++;
        }
        if (this.lineaActual >= this.instrucciones.length) {
            this.terminado = true;
        }
    }

    imprimirTerminado() {
        if (this.terminado && this.lineaActual === this.instrucciones.length) {
            console.log(`Proceso ${this.id}\nTerminado`);
        }
    }
}

// funcion para inicializar los procesos
function inicializarRR(cantidadProcesos) {
    const procesos = procesosPredefinidos.slice(0, cantidadProcesos).map((instrucciones, i) => new Proceso(i + 1, instrucciones));
    ejecutarRR(procesos);
}

// funcion para ejecutar Round Robin
function ejecutarRR(procesos) {
    let todosTerminado = false;

    while (!todosTerminado) {
        todosTerminado = true;

        for (let i = 0; i < procesos.length; i++) {
            const proceso = procesos[i];
            
            if (!proceso.terminado) {
                proceso.ejecutar();
                todosTerminado = false;  
            } else {
                proceso.imprimirTerminado(); 
            }
        }
    }
}

// leer el numero de procesos desde la linea de comandos
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question("Ingrese el numero de procesos a simular (1-3): ", (respuesta) => {
    const cantidadProcesos = parseInt(respuesta);
    if (!isNaN(cantidadProcesos) && cantidadProcesos > 0 && cantidadProcesos <= 3) {
        inicializarRR(cantidadProcesos);
    } else {
        console.log("error (1-3)\n");
    }
    rl.close();
});
