//¡ Funcion para crear un elemento LI, asignarle la clase 'date' y agregarleel texto en formato HTML de la decha recibida por parámetro. Se retorna el LI.
export default (date) =>{
  const dateElement = document.createElement('LI');
  dateElement.classList.add('date');
  dateElement.innerHTML = date;
  return dateElement;
}