console.log('Bienvenidos Socket')

const socket = io()

socket.emit('message', 'Hola me estoy comunicando desde el cliente')

socket.on('evento_para_un_socket_individual', data => {
    console.log(data);
})

socket.on('evento_para_todos_menos_para_el_socket_actual', data => {
    console.log(data);
})

socket.on('mensaje_para_todos', data => {
    console.log(data);
})
