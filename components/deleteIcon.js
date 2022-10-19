import { displayTask } from "./readTask.js";

//¡ Función para crear un icono de eliminacion, al mismo tiempo se le asigna un evento de escucha para eliminar la tarea
const deleteIcon = (id) => {
  // Creamos un elemento I (icono)
  const i = document.createElement('i');
  // Le agregamos las clases correspondientes, para ser un icono de eliminación
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  // Al icono de eliminar le agregamos un evento de escucha 'click'
  i.addEventListener('click', () => deleteTask(id));
  return i;
};

//¡ Función para eliminar una tarea
const deleteTask = (id) => {
  // Declaramos una varible y la inicializamos idetificandola en el HTML a la lista de tareas
  const list= document.querySelector("[data-list]");

  // Declaramosuna variable y la inicializamos con los datos del localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  // Buscamos el índice del id de la tarea a eliminar
  const index = tasks.findIndex(item => item.id == id);
  // Eliminamos la tarea con splice del arreglo obtenido del localStorage
  tasks.splice(index,1);
  // Volvemos a cargar el arreglo modificado al localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Antes de recargar la página vaciamos la lista de tareas para que no se carge dos veces
  list.innerHTML= "";

  // Recargamos la página actualizada
  displayTask();

 

  //: Podemos eliminar un objeto del array pasando una propiedad de un objeto, en este caso el id, y asi eliminar el objeto correspondiente al id, sin haberle pasado el indice del array. ESTO ES PARA REVISAR sobre el método 'splice'
  //: tasks.splice(id, 1);
}

export default deleteIcon;