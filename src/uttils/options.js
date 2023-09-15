
export const CuestionarioUser = [
    {
        id: 'location',
        title: '¿Dónde vivís?',
        options: ["Buenos Aires", "Capital Federal", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"],
        follow: 'age'
    },
    {
        id: 'age',
        title: '¿Qué edad tenés?',
        options: ["0-20 AÑOS", "20-40 AÑOS", "40-60 AÑOS", "+60 AÑOS"],
        follow: 'gender'
    },
    {
        id: 'gender',
        title: 'Género',
        options: ["FEMENINO", "MASCULINO", "OTRO / NO BINARIO"],
        follow: 'game'
    }
]

export const candidates=[
    {name:'Javier Millei',value:'milei'},
    {name:'Myriam Bregman',value:'bregman'},
    {name:'Patricia Bullrich',value:'bullrich'},
    {name:'Juan Schiaretti',value:'schiaretti'},
    {name:'Sergio Massa',value:'massa'} , 
]

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }