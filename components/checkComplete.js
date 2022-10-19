//¡ Función para crear un icono de forma 'check', ademas se le agrega un evento de escucha para poder marcarlo como 'completado'
const checkComplete = (id) => {
  const i = document.createElement('i');
  i.classList.add('far', 'fa-check-square', 'icon');
  i.addEventListener('click', (evento) => completeTask(evento, id));
  return i;
};
//¡ Función para marcar como completado o no completado una tarea
const completeTask = (evento, id) => {
  // Declaramos una variable y la inicializamos con el evento.target, que es un elemento I(icono)
  const element = evento.target;

  // Al elemento I (element) le agregamos o quitamos las clases
  element.classList.toggle('fas');
  element.classList.toggle('completeIcon');
  element.classList.toggle('far');

  // Declaramos una variable y la inicializamos con el JSON.Parse del contenido del localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  // Obtenemos el índice de la tarea buscandolo por el 'id'
  const index = tasks.findIndex(item => item.id == id );
  
  // Obtenido el índice de la tarea, cada ves que hacemos click sobre el check, invertimos el valor de 'complete'
  tasks[index].complete = !tasks[index].complete;
  // Con la siguiente instrucción, hacemos lo mismo que con la anterior. Con el operador condicional ternario es mas facil de comprender.
  //(tasks[index].complete)? tasks[index].complete = false : tasks[index].complete=  true;

  // Una ves cambiado el estado del check en el array de tareas(tasks), guardamos los cambios en el localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export default checkComplete;