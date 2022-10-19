import { addTask } from "./components/addTask.js";
import { displayTask } from "./components/readTask.js";

// Identificamos las variables con 'data atributes' del HTML
const btn = document.querySelector("[data-form-btn]");


//Evento de escucha sobre el botón de agregar tarea
btn.addEventListener("click", addTask);

// Se llama a la funcion 'displaytask' cuando se recarga la página
displayTask();