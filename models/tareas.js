
const Tarea = require('./tarea');
class Tareas {
    _listado = {};
    constructor(){
        this._listado = {};
    }

    cargarTareaFromArray( tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] =tarea;
        })
    }
    crearTarea(desc){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    } 

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(keys => {
            const tarea = this._listado[keys];
            listado.push(tarea);

        });
        return listado;
    }

    listadoCompleto(){
        this.listadoArr.forEach( (tarea , i) => {
             const idx =  `${i +1} .`.green;
             const {desc , completadoEn } = tarea;
             const estado = (completadoEn)
                            ? 'completado'.green 
                            : 'pendiente'.red; 
            console.log(`${ idx} ${desc} :: ${estado   }`)
        });
    }

    listarPendientesCompletadas(completadas = true){ 

        let contador = 0;
        this.listadoArr.forEach( (tarea ) => {
            const {desc , completadoEn } = tarea;
            const estado = (completadoEn)
            ? 'completado'.green 
            : 'pendiente'.red; 

            if(completadas && completadoEn){
                contador++;
                const id = ` ${contador}.`.green
                console.log(`${ id} ${desc} :: ${completadoEn.green }`);
            }else{
                if(!completadas && !completadoEn){
                    contador++;
                const id = ` ${contador}.`.green
                console.log(`${ id} ${desc} :: ${estado   }`);
                }
                
            }
           
       });

    }

    toggleCompleradas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn)
            tarea.completadoEn = new Date().toISOString();
        })

        this.listadoArr.forEach( tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn =null;
            }
        })


    }

}

module.exports = Tareas;