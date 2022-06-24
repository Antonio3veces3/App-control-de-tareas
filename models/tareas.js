import colors from 'colors';
import Tarea from './tarea.js'

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        //Convertimos el objeto a un Array 
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(description = '') {
        const tarea = new Tarea(description);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((item, index) => {
            const i = `${index + 1}.`.green;
            const { description, completedAt } = item
            const estado = (completedAt) ?
                'Completado'.green
                :'Pendiente'.red;
            
                console.log(`   ${i} ${description} :: ${estado}`);
        });
        return '';
    }

    listarCompletadasOPendientes( completadas = true){
        this.listadoArr.forEach((item, index)=>{
            const i =  `${index +1}. `.green;
            const {description, completedAt} = item;
            const estado = (completedAt) ?
                    `${completedAt}`.green
                    :'Pendiente'.red;
            
            if(completadas){
                if(completedAt)
                console.log(`   ${i} ${description} :: ${estado}`);
            }else{
                if(!completedAt)
                console.log(`   ${i} ${description} :: ${estado}`);
            }
        });
        
        return '';
    }

    toggleCompletadas(ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completedAt)
            tarea.completedAt = new Date().toISOString();
        })

        this.listadoArr.map( tarea => {
            if( !ids.includes(tarea.id))
            this._listado[tarea.id].completedAt = null;
        });
    }
}

export default Tareas;