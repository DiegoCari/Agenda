import { createTask } from "./addTask.js";
import { uniqueDates, orderDates } from "../services/date.js";
import dateElement from "./dateElement.js";

//¡ Función para madar al HTML la lista de tareas
//* Se toman los objetos del localStorage en caso de que existan, se los ordena por fecha y se mandan a la lista del HTML
export const displayTask = () => {
  const list = document.querySelector("[data-list]");
  // Inicializamos 'taskList' con el array que hay en el 'localStorage' en el momento de recargar la página
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  // Declaramos una constante que se inicializa mediante una función que retorna un array con las fechas sin repetir de las tareas guardadas en el localStorage
  const dates = uniqueDates(taskList);


  // Con la función 'orderDates' ordenamos de menor a mayor el array de fechas
  orderDates(dates);

  // Recorremos el array 'dates' que contiene las fechas sin repetir
  dates.forEach((date) => {
    // variable la inicializamos con la fecha de c/u de los indices del array 'dates', con el formato que nos facilita la libreria 'moment' para despues poder compararla con otra fecha del mismo formato
    const dateMoment = moment(date, "DD/MM/YYYY");
    // Insertamos en el HTML el LI con la fecha de la tarea de c/u de los indices del array
    list.appendChild(dateElement(date));

    
    // Recorremos el array que obtubimos del localStorage mediante JSON.parse (de taskList)
    taskList.forEach((task) => {
      // Declaramos una variable y la inicializamos con la fecha de c/u de las propiedades del objeto 'taskList'(obtenido del localStorage), con el formato que nos facilita la libreria 'moment' para despues poder compararla con otra fecha del mismo formato
      const taskDates = moment(task.dateFormat, "DD/MM/YYYY");
      // Utilizamos el método 'diff' que nos facilita la librería 'moment' para calcular la diferencia entre dos fechas(con el mismo formato)
      const dif = dateMoment.diff(taskDates);
      // Verificamos que la fecha del array 'unique' sea igual que la fecha de la area guardada en el localStorage
      if (dif == 0) {
        // Agregamos las tareas guardadas en el localStorage en el HTML. Se utiliza la función 'createTask' para darle los elementos necesarios para poder ser implementado en el HTML
        list.appendChild(createTask(task));
      }
    });
  });
  
};