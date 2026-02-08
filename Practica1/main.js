const coleccion_docentes=[
    {
        nombre:"Luis Alberto",
        apellidos:"Mendoza San juan",
        puesto:"Profesor ivestigador",
        edad:41,
        estado:true
    },
    {
        nombre:"Efrén",
        apellidos:"Juarez Castillo",
        puesto:"Profesor investigador",
        edad:55,
        estado:false
    },
    {
        nombre:"Hermes",
        apellidos:"Salazar Casanova",
        puesto:"Profesor investigador",
        edad:43,
        estado:true
    }

] 
const mostrar =()=>{
    // rescatar el div que va a contener LA informacion
    const contenedor=document.getElementById("contenedor")

    // Limpiamos el contenedor 
    contenedor.innerHTML=""
    coleccion_docentes.forEach((docente)=>{
        if(docente.estado){
    contenedor.innerHTML+="<div class='tarjeta'>"+
    "<h2>"+docente.nombre+"</h2>"+" </div>"
    }
    })

    
}