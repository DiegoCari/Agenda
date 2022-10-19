//¡ Función para crear un array con fechas NO REPETIDAS
export const uniqueDates = (task) => {
  const unique = [];

  // Recorremos las tareas que se recibe como parámetro. Estas viene del localStorage.
  task.forEach((task) => {
    // Agregamos al array 'unique' las fechas sin repetir de las tareas que están guardadas en el localStorage
    if (!unique.includes(task.dateFormat)) unique.push(task.dateFormat);
  });
  return unique;
};

//¡ Fuhnción para ordenar un array de fechas con el metodo '.sort()'
export const orderDates = (dates) => {
    return dates.sort((a,b)=> {
        // Antes de ejecutar la logica de .sort() formateamos las fechas(a, b) a un formato de la libreria 'moment'
        const firtDate = moment(a, "DD/MM/YYYY");
        const secondDate = moment(b, "DD/MM/YYYY");
        return firtDate - secondDate;
    });

}