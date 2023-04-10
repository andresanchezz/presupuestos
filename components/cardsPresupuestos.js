import storage from "../storage/storage.js";

export default {

    showWorker() {
        storage.setDataInStorage();

        let datos = JSON.parse(localStorage.getItem("data"))
        const worker = new Worker("../workers/presupuestosWorker.js", { type: "module" });

        let id = []
        let count = 0

        worker.postMessage({ module: "validarOperacion", data: datos });
        worker.postMessage({ module: "ingreso", data: datos });
        worker.postMessage({ module: "egreso", data: datos });
        worker.postMessage({ module: "tablaIngreso", data: datos });
        worker.postMessage({ module: "tablaEgreso", data: datos });
        worker.postMessage({ module: "porcentajeEgreso", data: datos });


        id = ["#presupuesto-disponible", "#ingreso-total", "#egreso-total", "#ingresos", "#egresos", "#porcentaje-egreso"]

        worker.addEventListener("message", (e) => {
          
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector(id[count]).append(...doc.body.children);


            (id.length - 1 == count) ? worker.terminate() : count++

        })
    },





}