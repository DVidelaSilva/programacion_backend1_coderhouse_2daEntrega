console.log('Estamos en chat.js');


const socket = io()


let titleBox = document.querySelector('#titleBox')
let descriptionBox = document.querySelector('#descriptionBox');

let saveButton = document.querySelector('#saveButton');



  saveButton.addEventListener('click', () => {

    try{
      const title = titleBox.value.trim(); // Obtener el valor del título
      const description = descriptionBox.value.trim();
  
  
        // Validaciones Campos requeridos y validacion de tipo de datos
        if (!title || typeof title !== 'string') {
          throw new Error('El campo title no fue ingresado, o no es un texto')
          
      }
  
      if (!description || typeof description !== 'string') {
        throw new Error('El campo description no fue ingresado, o no es un texto');
    }
  
      if (title.length > 0 && description.length > 0) {
        socket.emit('message', { title, description }); // Emitir un objeto con título y descripción
        titleBox.value = ''; // Limpiar el chatBox
        descriptionBox.value = ''; // Limpiar el descriptionBox
      }

      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'Producto guardado con exito', // Mostrar el mensaje del error
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
    });

    } catch (error) {
              // Mostrar el error en pantalla usando SweetAlert
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: error.message, // Mostrar el mensaje del error
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            });
        }    

});


  socket.on('messageLogs', data => {
    ///console.log('mensajes para todos', data);

    let log = document.querySelector('#messageLogs')
    let messages = ''
    data.forEach(message => {
      messages += `Título: ${message.title}, Descripción: ${message.description}<br>`;
    })

    log.innerHTML = messages
  })