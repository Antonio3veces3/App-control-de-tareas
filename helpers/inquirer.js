import inquirer from 'inquirer';
import colors from 'colors';

const menuOpt = [
    {
        type: 'list',
        name: 'options',
        loop: false,
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'    1.- '.green} Create task`
            },
            {
                value: '2',
                name: `${'    2.- '.green} List tasks`
            },
            {
                value: '3',
                name: `${'    3.- '.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'    4.- '.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'    5.- '.green} Complete task(s)`,
            },
            {
                value: '6',
                name: `${'    6.- '.green} Remove task`,
            },
            {
                value: '0',
                name: `${'    0.- '.green} Exit\n`
            },
        ]

    }
];


const inquirerMenu = async () => {
    console.clear();
    console.log('============================'.green);
    console.log('   Choose an option'.white);
    console.log('============================\n'.green);

    const { options } = await inquirer.prompt(menuOpt);
    return options;
};

const pause = async () => {
    const pauseOpt = [
        {
            type: 'input',
            name: 'enter',
            message: `Type ${'ENTER'.green} to continue...`
        }
    ];
    console.log('\n');
    await inquirer.prompt(pauseOpt);
    /*const enter = await inquirer.prompt(pauseOpt).then((answers)=>{
        console.log(JSON.stringify(answers,null,''));
    })*/
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message: message,
            /*validate(value) {
                if (value.length === 0) {
                    return ' Campo requerido'.red;
                }
                return true;
            }*/
        }
    ];

    const { description } = await inquirer.prompt(question);
    return description;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const index = `${i+1}. `.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.description}`
        }
    });

    /*choices.unshift({
        value: '0',
        name: `${'0. '.green} Cancelar`
    });*/

    const questions = [{
        type: 'checkbox',
        name: 'id',
        loop: false,
        message: 'DELETE...'.red,
        choices
    }];
    const {id} = await inquirer.prompt(questions);
    return id;
};

const confirm = async(message) => {
    console.log('');
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const {ok} = await inquirer.prompt(question);
    return ok;
};

const listadoTareasCheckList = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const index = `${i+1}. `.green;
        return {
            value: tarea.id,
            name: `     ${index} ${tarea.description}`,
            loop: false,
            checked: (tarea.completedAt)?true:false
        }
    });
    choices.unshift(new inquirer.Separator('-----------------'));

    const questions = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select options...'.red,
        choices
    }];
    const {ids} = await inquirer.prompt(questions);
    return ids;
};


export {
    inquirerMenu,
    pause,
    readInput,
    listadoTareasBorrar,
    confirm,
    listadoTareasCheckList
};