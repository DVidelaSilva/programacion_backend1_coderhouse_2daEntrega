console.log('Ejecutando realTimeProducts.js');

const socket = io()

let titleBox = document.querySelector('#titleBox')
let descriptionBox = document.querySelector('#descriptionBox');
let codeBox = document.querySelector('#codeBox');
let priceBox = document.querySelector('#priceBox');
let statusBox = document.querySelector('#statusBox');
let stockBox = document.querySelector('#stockBox');
let categoryBox = document.querySelector('#categoryBox');
let thumbnailsBox = document.querySelector('#thumbnailsBox');

let saveButton = document.querySelector('#saveButton');


// Guardar Producto mediante boton guardar
saveButton.addEventListener('click', () => {
  try{
    // Obtener el valores del Formulario
    let title = titleBox.value.trim()
    let description = descriptionBox.value.trim()
    let code = codeBox.value.trim()
    let price = Number(priceBox.value.trim())
    let status = statusBox.value.trim()
    let stock = Number(stockBox.value.trim())
    let category = categoryBox.value.trim()
    let thumbnails = thumbnailsBox.value.trim()

    // Validaciones Campos requeridos y validacion de tipo de datos
    if (!title || typeof title !== 'string') {
      throw new Error('El campo title no fue ingresado, o no es un texto')}
      
    if (!description || typeof description !== 'string') {
      throw new Error('El campo description no fue ingresado, o no es un texto')}

    if (!code || typeof code !== 'string') {
        throw new Error('El campo code no fue ingresado, o no es una texto')}

    if (!price || isNaN(price)) {
        throw new Error('El campo price no fue ingresado, o no es un numero')}
    
    if(status === 'true'){
      status = true
    } else if (status === 'false'){
      status = false
    } 

    if (status !== false){
        status = true
    }

    if (!stock || typeof stock !== 'number') {
        throw new Error('El campo stock no fue ingresado, o no es un numero')}

    if (!category || typeof category !== 'string') {
        throw new Error('El campo category no fue ingresado, o no es una texto')}

    if (thumbnails && typeof thumbnails !== 'string') {  
        throw new Error('El campo thumbnails no es una texto')
    } else if (thumbnails && typeof thumbnails === 'string'){
        thumbnails = thumbnails;
    } else {
        thumbnails = ''
    }

      socket.emit('message', { title, description, code, price, status, stock, category, thumbnails }); // Emitir un objeto con valores del formulario
      titleBox.value = ''; 
      descriptionBox.value = '';
      codeBox.value = '';
      priceBox.value = '';
      statusBox.value = '';
      stockBox.value = '';
      categoryBox.value = '';
      thumbnailsBox.value = '';

    //SweetAlert Exito
    Swal.fire({
      icon: 'success',
      title: '¡Exito!',
      text: 'Producto guardado con exito', // Mostrar el mensaje del error
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    });

  } catch (error) {
    //SweetAlert Errores
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: error.message, // Mostrar el mensaje del error
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false
    })
  }    
});


// Escuchar el evento messageLogs para mostrar mensajes y productos
socket.on('messageLogs', data => {
  let log = document.querySelector('#messageLogs')
  let productList = document.querySelector('#productList') 

  // Crear mensajes y productos
  let messages = '';
  let products = '';

  // Procesar los mensajes
/*   data.messages.forEach(message => {
      messages += `Título: ${message.title}, Descripción: ${message.description}<br>`;
  }); */

  // Añadir los productos
  const reversedProducts = data.products.slice().reverse(); 
  reversedProducts.forEach(product => {
      products += `<div class="col-md-4"> <!-- Cada producto en una columna -->
                            <div class="card mb-3"> <!-- Tarjeta para cada producto -->
                                <div class="card-body">
                                  <p class="card-text">id: ${product.id}</p>
                                  <p class="card-text">title: ${product.title}</p>
                                  <p class="card-text">descripcion: ${product.description}</p>
                                  <p class="card-text">code: ${product.code}</p>
                                  <p class="card-text">price: ${product.price}</p>
                                  <p class="card-text">status: ${product.status}</p>
                                  <p class="card-text">category: ${product.category}</p>
                                  <p class="card-text">thumbnails: ${product.thumbnails}</p>
                                </div>
                            </div>
                        </div>`;
  });

  log.innerHTML = messages; 
  productList.innerHTML = products; 
});