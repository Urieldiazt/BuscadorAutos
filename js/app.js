
document.addEventListener('DOMContentLoaded', function(){
    buscadorAutos();
});

function buscadorAutos(){
    //generar un objeto con la busqueda
    const datosBusqueda = {
        marca: '',
        year: '',
        minimo: '',
        maximo: '',
        puertas: '',
        transmision: '',
        color: ''
    }

    //variables
    const marca = document.querySelector('#marca');
    const yearAuto = document.querySelector('#year');
    const minimo = document.querySelector('#minimo');
    const maximo = document.querySelector('#maximo');
    const puertas = document.querySelector('#puertas');
    const transmision = document.querySelector('#transmision');
    const color = document.querySelector('#color');

    //contenedor para los resultados
    const colocarAutos = document.querySelector('#resultado');
    const max = new Date().getFullYear();
    const min = max-6;
    
    //enventsliesteners para los select de busqueda
    marca.addEventListener('change', e =>{
        datosBusqueda.marca = e.target.value;
        filtrarAuto();
    });
    
    yearAuto.addEventListener('change', e =>{
        datosBusqueda.year = parseInt(e.target.value);
        filtrarAuto();
    });
    
    minimo.addEventListener('change', e =>{
        datosBusqueda.minimo = parseInt( e.target.value);
        filtrarAuto();
    });
    
    maximo.addEventListener('change', e =>{
        datosBusqueda.maximo = parseInt(e.target.value);
        filtrarAuto();
    });
    
    puertas.addEventListener('change', e =>{
        datosBusqueda.puertas = parseInt(e.target.value);
        filtrarAuto();
    });
    
    transmision.addEventListener('change', e =>{
        datosBusqueda.transmision = e.target.value;
        filtrarAuto();
    });
    
    color.addEventListener('change', e =>{
        datosBusqueda.color = e.target.value;
        filtrarAuto();
    });

    //funciones
    mostrarAutos(autos);
    mostrarYears();

    function mostrarAutos(autos){

        limpiarHTML();

        autos.forEach(auto => {
            const {marca, modelo, year, precio, puertas, color, transmision} = auto
            const carro = document.createElement('P');
            carro.classList.add('center');
            carro.innerHTML = `
            --- Marca: ${marca} Modelo: ${modelo} Año: ${year} Precio: $${precio} Puertas-${puertas} Color:${color} Trasmicion-${transmision}
            `;
            colocarAutos.appendChild(carro);
        });
    }

    function limpiarHTML(){
        while(colocarAutos.firstChild){
            colocarAutos.removeChild(colocarAutos.firstChild);
        }
    }

    function mostrarYears(e){
        for(let years = max; years >  min; years--){
            const year = document.createElement('OPTION');
            year.textContent = years;
            year.classList.add('bg-blue-400');
            yearAuto.appendChild(year);
        }
    }
    //funcion que filtra en base a la busqueda
    function filtrarAuto(){
                             //Funcion de alto nivel
        const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    
        if(resultado.length){
            mostrarAutos(resultado);
            return;
        }
            mostrarAlerta();

}

function mostrarAlerta(){
    limpiarHTML();
    const alerta = document.createElement('P');
    alerta.textContent = 'No se encontro informacion en base a su busqueda';
    alerta.classList.add('alerta', 'error');
    colocarAutos.appendChild(alerta);
}

function filtrarMarca(autos){
    //comprobar de que se este colocando algo, me marca
    const {marca} = datosBusqueda;
    if(marca){
        return autos.marca === marca;
    }

    return autos;
}

function filtrarYear(autos){
    //destructuring
    const {year} = datosBusqueda;
    if(year){
     return autos.year === year;
    }

    return autos;
}

function filtrarMinimo(autos){

    const {minimo} = datosBusqueda;

    if(minimo){
    return autos.precio >= minimo;
    }
    return autos;
}

function filtrarMaximo(autos){
    //destructuring
    const {maximo} = datosBusqueda;

    if(maximo){
     return autos.precio <= maximo;
    }
    return autos;
}

function filtrarPuertas(autos){
    const {puertas} = datosBusqueda;

    if(puertas){
        return puertas === autos.puertas;
    }
    return autos;
}

function filtrarTransmision(autos){
    const {transmision} = datosBusqueda;
    if(transmision){
        return transmision === autos.transmision;
    }

    return autos;
}

function filtrarColor(autos){
    const {color} = datosBusqueda;
    if(color){
        return color === autos.color;
    }
    return autos;
}

}// end document
