import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TasksItem = (props) => {

    const [task, setTask] = useState(props.task);
    // const [show, setShow] = useState("");

    const title = task.name.substr(0, 3) + "...";

    const onPriorityUp = () => {
        const updatedTask = {...task, priority: --task.priority};
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onPriorityDown = () => {
        const updatedTask = {...task, priority: ++task.priority}
        setTask(updatedTask);
        props.updateTask(updatedTask);
    }

    const onStatusChange = (e) => {
        // e.preventDefault();
        const updatedTask = {...task, statusId: +e.target.value};
        setTask(updatedTask);
        props.updateTask(updatedTask);
        // setShow("");
    }

    const onDeleteTask = () => {
        props.deleteTask(task);
    }

    // const onToggleDropdown = (e) => {
    //     e.preventDefault();
    //     setShow(!show ? " show" : "");
    // }

    const getItemStyle = (isDragging, draggableStyle) => ({
        // change background colour if dragging
        background: isDragging ? "lightgrey" : "",

        // styles we need to apply on draggables
        ...draggableStyle
    });


    return (
        <Draggable draggableId={task.id.toString()} index={props.index}>
            {
                (provided, snapshot)  => (
                    <div className="card m-1"
                         ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <div className="card-body">
                            <button type="button" className="close text-right" onClick={onDeleteTask} aria-label="Delete">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text p-1">
                                {task.name}
                            </p>
                            <p className="card-text p-1">
                                Priority: {task.priority}
                            </p>
                            <div className="input-group input-group-sm mb-2 mt-2">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Status:</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01" defaultValue={task.statusId} onChange={onStatusChange}>
                                    {
                                        props.initStatuses.map(el => {
                                            return <option key={el.id} value={el.id}>{el.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            {/*<div className="btn-group-vertical btn-group-sm" aria-label={"Priority: " + task.priority}>*/}
                            {/*    Priority: {task.priority}*/}
                            {/*    {*/}
                            {/*        task.priority > 1 &&*/}
                            {/*        <button className="btn btn-secondary" onClick={onPriorityUp} type="button">Up</button>*/}
                            {/*    }*/}
                            {/*    {*/}
                            {/*        task.priority < 10 &&*/}
                            {/*        <button className="btn btn-secondary" onClick={onPriorityDown} type="button">Down</button>*/}
                            {/*    }*/}
                            {/*</div>*/}
                        </div>
                    </div>
            )}
        </Draggable>


        // <div className="card m-1">
        //     <div className="card-body">
        //         <button type="button" className="close text-right" onClick={onDeleteTask} aria-label="Delete">
        //             <span aria-hidden="true">&times;</span>
        //         </button>
        //         <h5 className="card-title">{title}</h5>
        //         <p className="card-text p-1">
        //             {task.name}
        //         </p>
        //         <div className="input-group input-group-sm mb-2 mt-2">
        //             <div className="input-group-prepend">
        //                 <label className="input-group-text" htmlFor="inputGroupSelect01">Status:</label>
        //             </div>
        //             <select className="custom-select" id="inputGroupSelect01" defaultValue={task.statusId} onChange={onStatusChange}>
        //                 {
        //                     props.initStatuses.map(el => {
        //                         return <option key={el.id} value={el.id}>{el.name}</option>
        //                     })
        //                 }
        //             </select>
        //         </div>
        //         <div className="btn-group-vertical btn-group-sm" aria-label={"Priority: " + task.priority}>
        //             Priority: {task.priority}
        //             {
        //                 task.priority > 1 &&
        //                 <button className="btn btn-secondary" onClick={onPriorityUp} type="button">Up</button>
        //             }
        //             {
        //                 task.priority < 10 &&
        //                 <button className="btn btn-secondary" onClick={onPriorityDown} type="button">Down</button>
        //             }
        //         </div>
        //         {/*This bootstrap dropdown doesn't work */}
        //         {/*<div className="dropdown">*/}
        //         {/*    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"*/}
        //         {/*            data-toggle="dropdown" aria-haspopup={true} aria-expanded={false}*/}
        //         {/*            onClick={onToggleDropdown}>*/}
        //         {/*        {props.initStatuses.map(el => {*/}
        //         {/*            if(el.id === task.statusId)*/}
        //         {/*                return el.name*/}
        //         {/*        })}*/}
        //         {/*    </button>*/}
        //         {/*    <div className={"dropdown-menu" + show} aria-labelledby="dropdownMenuButton">*/}
        //         {/*        {*/}
        //         {/*            props.initStatuses.filter(el =>*/}
        //         {/*                el.id !== task.statusId*/}
        //         {/*            ).map(el =>*/}
        //         {/*                <a className="dropdown-item" key={el.id} id={el.id} onClick={onStatusChange} href="#">{el.name}</a>*/}
        //         {/*            )*/}
        //         {/*        }*/}
        //         {/*    </div>*/}
        //         {/*</div>*/}
        //     </div>
        // </div>
    );
};

export default TasksItem;