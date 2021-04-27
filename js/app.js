//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener(){
    //Agregar carrito
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar curso de carrito
    carrito.addEventListener('click', eliminarCurso);
    //Añadir carrito al Local Stroge
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [];//reseteamos el arreglo
        limpiarHTML();// Eliminar todo el HTMl
    });
}

//Funciones
function agregarCurso(e){
    //prevenimos la acción por defecto que vaya a ese id #
    e.preventDefault()
    //Si a el elemento que presionamos contiene el classList agregar-carrito que se ejecute
    if(e.target.classList.contains('agregar-carrito')){
        //Nos derigimos al elemento padre de padre parentElement
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
    }
}

//Eliminar curso del carrito 
function  eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        //Eliminar del arreglo articulosCarrito poer el id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML() //Iterar sobre carrito y mostrar su HTML  
    }
}

//Lee el contenido  del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(curso){
    //console.log(curso);
    //Crear objeto del contenido del curso actual
    const infoCurso = {
        img: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    //some permite iterar sobre un arreglo de objetos y verificar si un elemento se encuentra 
    const existe = articulosCarrito.some(curso =>curso.id === infoCurso.id)
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++; //retorna el objeto actualizado
                return curso;
            }else{
                return curso; //retorana los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //Agregar elementos al arreglo carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
    carritoHTML()
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();
    //Recorrer el carrito y generar el HTML
    articulosCarrito.forEach((curso)=>{
        const row = document.createElement('tr');
        const {img, titulo, precio, cantidad, id} = curso;
        row.innerHTML = `
            <td>
                <img src="${img}" width=100>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class = "borrar-curso" data-id ="${id}">X<a>
            </td>
        `
        //Agrega el HTML  al carrito tbody
        // inserta un nuevo nodo dentro de la estructura DOM de un documento
        contenedorCarrito.appendChild(row);
    })
    sincronizarStorage();
}

//Agregar carrito al Local Storage
function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}