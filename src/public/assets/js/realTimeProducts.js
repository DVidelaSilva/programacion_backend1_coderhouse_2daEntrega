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


/*   socket.on('messageLogs', data => {
    ///console.log('mensajes para todos', data);

    let log = document.querySelector('#messageLogs')
    let messages = ''
    data.forEach(message => {
      messages += `Título: ${message.title}, Descripción: ${message.description}<br>`;
    })

    log.innerHTML = messages
  })


  // Escuchar el evento productLogs para mostrar los productos
socket.on('messageLogs', data => {
  let productList = document.querySelector('#productList'); // Asegúrate de tener un elemento para mostrar los productos
  let products = '';
  console.log('esta es la data', data);
  data.forEach(product => {
      products += `<li>
          <p>Title: ${product.title}</p>
          <p>Descripción: ${product.description}</p>
      </li>`;
  });

  productList.innerHTML = products; // Actualizar la lista de productos en el HTML
}); */


// Escuchar el evento messageLogs para mostrar mensajes y productos
socket.on('messageLogs', data => {
  let log = document.querySelector('#messageLogs');
  let productList = document.querySelector('#productList'); // Asegúrate de tener un elemento para mostrar los productos

  // Crear mensajes y productos
  let messages = '';
  let products = '';

  // Procesar los mensajes
  data.messages.forEach(message => {
      messages += `Título: ${message.title}, Descripción: ${message.description}<br>`;
  });

  // Procesar los productos
  const reversedProducts = data.products.slice().reverse(); 
  reversedProducts.forEach(product => {
      products += `<li>
          <p>Title: ${product.title}</p>
          <p>Descripción: ${product.description}</p>
      </li>`;
  });

  // Actualizar el HTML
  log.innerHTML = messages; // Mostrar los mensajes en el log
  productList.innerHTML = products; // Actualizar la lista de productos en el HTML
});