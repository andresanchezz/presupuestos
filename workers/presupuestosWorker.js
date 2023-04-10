export let presupuestosWorker = {

  validarOperacion(p1) {

    let total = 0;

    if (p1 === null) {
      console.log('Sin datos aún')
    } else {

      for (let index = 0; index < p1.length; index++) {
        const element = p1[index];
        (element.tipoIngreso === '+')
          ? total += parseInt(element.valor)
          : total -= parseInt(element.valor);

      }



    }

    return `<h5>${total}</h5>`

  },


  ingreso(p1) {

    let total = 0;


    if (p1 === null) {
      console.log('Sin datos aún')
    } else {

      for (let index = 0; index < p1.length; index++) {
        const element = p1[index];

        (element.tipoIngreso === '+')
          ? total += parseInt(element.valor)
          : ''
      }

    }

    return `<p>${total}</p>`

  },

  egreso(p1) {

    let total = 0;

    if (p1 === null) {
      console.log('Sin datos aún')
    } else {

      for (let index = 0; index < p1.length; index++) {
        const element = p1[index];

        (element.tipoIngreso === '-')
          ? total -= parseInt(element.valor)
          : ''
      }

    }

    return `<p>${total}</p>`

  },

  tablaIngreso(p1) {

    let html = '';
    let contador = 0
    if (p1 === null) {
      console.log('Sin datos aún')
    } else {

      for (let index = 0; index < p1.length; index++) {
        const element = p1[index];

        if (element.tipoIngreso === '+') {
          contador++
          html += `
           
        <table class="table table-striped mt-4" >
          <thead>
            <tr>
              <th scope="col">N° Ingreso</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>   
              <tr>
                <th scope="row">${contador}</th>
                <td>${element.descripcion}</td>
                <td>${element.valor}</td>
              </tr>
          </tbody>
        </table>

          `
        } else {
          html += ""
        }
      }

    }

    return html

  },

  tablaEgreso(p1) {

    let html = '';
    let contador = 0
    if (p1 === null) {
      console.log('Sin datos aún')
    } else {

      for (let index = 0; index < p1.length; index++) {
        const element = p1[index];
        if (element.tipoIngreso === '-') {
          contador++;
          html += `
            
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">N° greso</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>   
              <tr>
                <th scope="row">${contador}</th>
                <td>${element.descripcion}</td>
                <td> -${element.valor}</td>
              </tr>
          </tbody>
        </table>

          `
        } else {
          html += ""
        }
      }

    }

    return html

  },

  porcentajeEgreso(p1) {

    let total = 0;
    let egreso = 0;
    let html = "";
    let totalDivido = 0;
    let totalPorcentaje = 0;


    if (p1 === null) {
      console.log('Sin datos aún')
    } else {

      for (let index = 0; index < p1.length; index++) {
        const element = p1[index];
        (element.tipoIngreso === '+')
          ? total += parseInt(element.valor)
          : total -= parseInt(element.valor);


        (element.tipoIngreso === '-')
          ? egreso -= parseInt(element.valor)
          : ''


         totalDivido = total / egreso;

         console.log(totalDivido)

         totalPorcentaje = totalDivido*100
         totalPorcentaje = totalPorcentaje * -1
       
      }



      html += `
      
      <span>${totalPorcentaje.toFixed(2)}</span>
      
      `

    }

    return html

  },

}



self.addEventListener("message", (e) => {
  postMessage(presupuestosWorker[`${e.data.module}`](e.data.data));
})