require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
// const {mostrarMenu} = require('./helpers/mensajes');
const { inquirerMenu, pausa, leerInput, 
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
console.clear();
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareaDB = leerDB();

  if (tareaDB) {
    tareas.cargarTareaFromArray(tareaDB);
  }

  do {
    opt = await inquirerMenu();
    // console.log({opt});

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        // console.log(desc);

        break;
      case "2":
        // console.log(tareas.listadoArr);
        tareas.listadoCompleto();
        break;
      case "3":
        // console.log(tareas.listadoArr)
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        // console.log(tareas.listadoArr)
        tareas.listarPendientesCompletadas(false);
        break;
      
        case "5":
            // console.log(tareas.listadoArr)
           const ids = await mostrarListadoCheckList(tareas.listadoArr);
           tareas.toggleCompleradas(ids);
        //    console.log(ids);
            
       break;
    case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id !== '0'){
            const ok = await confirmar('¿Esta Seguro?');
            if(ok){
                tareas.borrarTarea(id);
                console.log('Tarea Borrada'.green);
            }
        }
        
        break;
      default:
        break;
    }

    // guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
