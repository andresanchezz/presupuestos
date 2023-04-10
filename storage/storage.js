import cardsPresupuestos from "../components/cardsPresupuestos.js";

export default {

    setDataInStorage() {

        const idForm = document.querySelector("#form-data");
        let arrayData = [];

        let dataInStorage = JSON.parse(localStorage.getItem("data"));
        (dataInStorage) ? arrayData = dataInStorage : arrayData = arrayData;

        idForm.addEventListener("submit", (e) => {
            let data = Object.fromEntries(new FormData(e.target))

            arrayData.push(data)
            idForm.reset()

            localStorage.setItem("data", JSON.stringify(arrayData));

            cardsPresupuestos.showWorker()
        })

    }


}