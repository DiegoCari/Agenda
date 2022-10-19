import { uniqueDates } from "../services/date.js";
import checkComplete from "./checkComplete.js";
import deleteIcon from "./deleteIcon.js";
import { displayTask } from "./readTask.js";

//¡ Función para agregar una tarea
//** Se identifican los elementos en el HTML para tomar los datos ingresados por el usuario, se los asiga en un objeto para luego guardarlo en el localStorage
export const addTask = (evento) => {
  evento.preventDefault();

  // Identificamos el elemento LI en el HTML
  const list = document.querySelector("[data-list]");
  // Identifucamos el campo 'input' en el HTML
  const input = document.querySelector("[data-form-input]");
  //Identificamos el calendario en el HTML
  const calendar = document.querySelector("[data-form-date]");

  //Declaramos y asignamos el valor del campo del calendario a la variable 'date'
  const date = calendar.value;
  // Formateamos valor de 'date', que es la fecha de forma local a un formato de la libreria 'moment'
  const dateFormat = moment(date).format("DD/MM/YYYY");

  //Declaramos y asignamos el valor del campo 'input' a la variable 'value'
  const value = input.value;

  // Evitamos que se carge una tarea 'vacia'
  if (value == "" || date == "") return;

  // Reseteamos el campo input, el del calendario y el contenido de la lista(tareas)
  input.value = "";
  calendar.value = "";
  list.innerHTML = "";
  // Colocamos el foco nuevamente en el campo input
  input.focus();

  const complete = false;

  //: Local Storage    -----------------------
  // Objeto creado para guardar los datos ingresados por el usuario
  const taskOBJ = {
    value,
    dateFormat,
    complete,
    id: uuid.v4(), //* Le asignamos al atributo 'id' un string 'unico' mediante un metodo de la librería UUID
  };

  // Inicializamos 'taskList' con el array que hay en el 'localStorage' en el momento de recargar la página
  const taskList = JSON.parse(localStorage.getItem("tasks")) || []; // operador de cortocircuito

  // Agregamos al array 'taskList' las tareas que estaban guardadas en el localStorage, o en caso que no hubiera nada en el localStorage, se agregan en el array declarado mediante el operador de cortocircuito 'taskList'
  taskList.push(taskOBJ);

  // Guardamos en el localStorage la tarea con el formato JSON y la clave 'task' para identificarla en el localStorage
  localStorage.setItem("tasks", JSON.stringify(taskList));
  //: ----------------------------------------

  // Cargamos el localStorage al HTML
  displayTask();
};

//¡ Función para crear una tarea
//** La función crea los elemento HTML necesarios(iconos, span, div, li) e incluye sus clases CSS para c/u si lo requiere. Retorna un Elemento LI de la lista de tareas
// Utilizamos destructuring en el parametro de la función
export const createTask = ({ value, dateFormat, complete, id }) => {
  // Creamos un elemento LI y le asignamos la clase 'card'
  const taskLI = document.createElement("li");
  taskLI.classList.add("card");

  // Creamos un 'span' para insertarle la fecha y agregarlo al HTML
  const dateElement = document.createElement("SPAN");
  dateElement.innerHTML = dateFormat;

  // Creamos el elemento DIV
  const taskDIV = document.createElement("div");

  // Declaramos una variable y la inicializamos con un elemento I ( icono), que es retornado por la función 'chackComplete()'
  const check = checkComplete(id);

  // Verificamos la propiedad 'complete' de la tarea, en caso que sea true, le asignamos o quitamos la clase CSS correspondiente
  // Esta verificación sirve para la recarga de la página, cuando no se pasa por la función 'addTask()', ya que esta es solo llamada cuando se agrega una tarea por parte del usuario
  if (complete) {
    check.classList.toggle("fas");
    check.classList.toggle("completeIcon");
    check.classList.toggle("far");
  }

  // Creamos el elemento SPAN y le asignamos la clase 'task'
  const taskSPAN = document.createElement("SPAN");
  taskSPAN.classList.add("task");

  // Ingresamos dinámicamente texto al SPAN
  taskSPAN.innerText = value;

  // Agregamos mediante la función 'checkComplete' el icono checkbox al DIV
  taskDIV.appendChild(check);
  // Agregamos al DIV el SPAN con el texto ya incluido
  taskDIV.appendChild(taskSPAN);
  // Agregamos al LI el DIV con el icono checkbox y el SPAN con su texto
  taskLI.appendChild(taskDIV);
  // Agregamos la fecha al elemento LI
  taskLI.appendChild(dateElement);
  // Agregamos el boton de eliminar tarea al LI(este boton está por fuera del DIV)
  // Al mismo tiempo dentro de la función 'deleteIcon()', se llama al evento sobre el icono creado para eliminar la tarea; este evento llama en sus argumentos una funcion específica ( deleteTask() ) para poder eliminar el elemento padre del icono, que es el elemento LI que contiene al SPAN como al elemento I (icono de eliminación de tarea)
  taskLI.appendChild(deleteIcon(id));

  return taskLI;

  //: Estructura básica del LI creado
  /*
    <li class="card"> => Se le agrego la clase diámicamente
  
      <div> 
  
        <i class="far fa-check-square icon"></i> => Este icono se agrega mediante una función
  
        <span class="task">Tarea a agregar</span>
  
      </div>
  
      <i class="fas fa-trash-alt trashIcon icon"></i> => Este ícono se agrega mediante una función
  
    </li>;
    */
};