import React, {useState} from 'react';
import TaskItem from "./TaskItem";

//not so good variant
// const tasks1 = {
//     todo: [
//         {name: 'Create F1', priority: 1},
//         {name: 'Create F2', priority: 1}
//         ],
//     progress: [],
//     review: [],
//     done: []
// };

//good variant
// const statuses = {
//     s1: {name: 'To Do'},
//     s2: {name: 'In Progress'},
//     s3: {name: 'Review'},
//     s4: {name: 'Done'},
// }

const initStatuses = [
    {id: 1, queue: 1, name: 'To Do'},
    {id: 2, queue: 2, name: 'In Progress'},
    {id: 3, queue: 3, name: 'Review'},
    {id: 4, queue: 4, name: 'Done'}
]
//Many-to-one relation (many tasks to one status)
const initTasks = [
    {id: 1, name: 'Create F1.1', priority: 1, statusId: 1},
    {id: 2, name: 'Create F2.1', priority: 1, statusId: 2},
    {id: 3, name: 'Create F2.2', priority: 2, statusId: 2},
    {id: 4, name: 'Create F3.3', priority: 3, statusId: 3},
    {id: 5, name: 'Create F3.2', priority: 2, statusId: 3},
    {id: 6, name: 'Create F3.1', priority: 1, statusId: 3},
    {id: 7, name: 'Create F1.3', priority: 3, statusId: 1},
    {id: 8, name: 'Create F1.2', priority: 2, statusId: 1},
    {id: 9, name: 'Create F4', priority: 1, statusId: 4}
];

function App() {

    const [tasks, setTasks] = useState(initTasks);
    const [lastTaskId, setLastTaskId] = useState(9);
    const [isOpenCreateTaskForm, setIsOpenCreateTaskForm] = useState(false);
    const [isActiveButtonTaskCreate, setIsActiveButtonTaskCreate] = useState(false);
    const [taskName, setTaskName] = useState('');

    const onTaskChange = (e) => {
        setIsActiveButtonTaskCreate(e.target.value.length > 4);
        setTaskName(e.target.value);
    }

    const taskCreate = (e) => {
        e.preventDefault();
        const newTask = {
            id: lastTaskId + 1,
            name: taskName,
            priority: 10,
            statusId: 1

        };
        setLastTaskId(newTask.id);
        setTasks([...tasks, newTask]);
        taskReset();
    }

    const taskReset = (e) => {
        setTaskName('');
        setIsOpenCreateTaskForm(false);
        setIsActiveButtonTaskCreate(false);
    }

    const updateTask = (task) => {
        const updatedTasks = tasks.map(obj => {
            if(obj.id === task.id){
                return {...obj, name: task.name, priority: task.priority, statusId: task.statusId};
            } else {
                return obj;
            }
        })
        setTasks(updatedTasks);
    }

    return (
        <div>

            <div className="container">
                <h1>Kanban</h1>
                {
                    !isOpenCreateTaskForm &&
                    <button className="btn btn-primary p-1" onClick={e => setIsOpenCreateTaskForm(true)}>Create task</button>
                }
                {
                    isOpenCreateTaskForm &&
                    <form>
                        <div className="form-group p-1">
                            <label htmlFor="exampleInputEmail1">Task</label>
                            <input type="text" className="form-control" placeholder="Enter Task"
                                value={taskName} onChange={onTaskChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary m-1"
                                onClick={taskCreate}
                                disabled={!isActiveButtonTaskCreate}
                        >Submit</button>
                        <button className="btn btn-secondary" onClick={taskReset}>Cancel</button>
                    </form>
                }
                <div className="row">
                {
                    initStatuses
                        .sort((a, b) => { return a.queue - b.queue} )
                        .map(el =>
                            <div key={el.id} className="col-sm-3 p-1">
                                <h5 className="card-header text-center">{el.name}</h5>
                                {
                                    tasks
                                        .sort((a, b) => { return a.priority - b.priority} )
                                        .map(task => {
                                            if(task.statusId === el.id)
                                                return (
                                                        <TaskItem key={task.id}
                                                                  task={task}
                                                                  updateTask={updateTask}
                                                        />
                                                    );
                                        })
                                }
                            </div>
                        )
                }
                </div>
            </div>
        </div>
    );
}

export default App;
