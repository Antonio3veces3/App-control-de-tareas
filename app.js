import colors from 'colors';
import { inquirerMenu, pause, readInput, listadoTareasBorrar, confirm, listadoTareasCheckList } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import Tarea from './models/tarea.js'
import { guardarDB,leerDB } from './helpers/guardarArchivo.js';

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1': //Crear tarea
                let ok;
                do{
                    const description = await readInput('Description: ');
                    description != ''
                    ?(tareas.crearTarea(description), 
                     console.log('\n >>Successfully'.green))
                    :console.log('The description is required'.red);

                    ok = await confirm('Do you want add another task?...'.green);
                }while(ok);

                break;
            case '2': //Listar tareas
                console.log(tareas.listadoCompleto());
                break;
            case '3': //Listar tareas completadas
                console.log(tareas.listarCompletadasOPendientes(true));
                break;
            case '4': //Listar tareas pendientes
                console.log(tareas.listarCompletadasOPendientes(false));
                break;
            case '5': //Marcar completadas
                let okContinue;
                do {
                    const ids = await listadoTareasCheckList(tareas.listadoArr);
                    okContinue = await confirm('Are you sure?...'.green);
                    if(okContinue){
                        tareas.toggleCompletadas(ids);
                        console.log('\n >>Successfully'.green);
                    }
                }while(!okContinue);
                break;
            case '6': //Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if(id.length > 0){
                    const ok = await confirm(`Are you sure? ...`.green);
                    if (ok){
                        id.forEach((item) => {
                            tareas.borrarTarea(item);
                        });
                        console.log('\n >>Deleted succesfully'.green);
                    }
                }
                break;
            case '0':
                
                break;
        }
        guardarDB(tareas.listadoArr);

        if(opt!='0') await pause();

    } while (opt != '0');
}

main();