console.log('conectado')
const formulario = document.getElementById('formulario')
const listatareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

let tareas ={}

document.addEventListener('DOMContentLoaded', () => {
    console.log('cargo la pagina')
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
        pintartareas()
    }
})
listatareas.addEventListener('click', e =>{
    btnacciones(e)
})




formulario.addEventListener('submit', Event =>{
    Event.preventDefault()
    //console.log('evento', Event)
    settarea(Event)
})

const settarea = e => {
    const texto = e.target.querySelector('input').value
    //console.log(texto)
    if(texto.trim()==''){
        console.log('cadena vacia')
        return
    }
    const tarea =
    {
        id: Date.now(),
        texto: texto,
        estado: false
    }
    //console.log('tarea',tarea)
    tareas[tarea.id] = tarea
    pintartareas()
    formulario.reset()
    e.target.querySelector('input').focus()

}

const pintartareas = () =>{
    localStorage.setItem('tareas',JSON.stringify(tareas))
    if(Object.values(tareas).length === 0){
        listatareas.innerHTML =
        `
        <div class="alert alert-dark">
            sin tareas pendientes
        </div>
        `
        return
    }
    listatareas.innerHTML = ''
    Object.values(tareas).forEach(item => {
        //console.log('item',item)
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = item.texto
        if(item.estado){
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'

        }
        clone.querySelectorAll('.fas')[0].dataset.id = item.id
        clone.querySelectorAll('.fas')[1].dataset.id = item.id
        fragment.appendChild(clone)
    })

    listatareas.appendChild(fragment)
   
}
const btnacciones = e =>{
    if(e.target.classList.contains('fa-check-circle')){
        tareas[e.target.dataset.id].estado = true
        pintartareas()
    }
    if(e.target.classList.contains('fa-undo-alt')){
        tareas[e.target.dataset.id].estado = false
        pintartareas()
    }
    if(e.target.classList.contains('fa-minus-circle')){
        pintartareas()
    }
    e.stopPropagation();
}