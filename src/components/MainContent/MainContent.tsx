import React, { useState, ChangeEvent, useEffect } from 'react';
import TaskItem from './TaskItem';
import { useGeneralContext } from '../../context/GeneralContext';

const MainContent: React.FC = () => {
    const { activeCategory } = useGeneralContext()
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskStatus, setTaskStatus] = useState('progress');
    const [sidebarTaskCategory, setSidebarTaskCategory] = useState('') as any;
    const [tasks, setTasks] = useState<Task[]>([]);

    // Define the Task type
    interface Task {
        id: string; // Add a unique ID to each task
        name: string;
        date: string;
        category: string;
        status: string;
    }

    // Fetch tasks from localStorage when the component mounts
    useEffect(() => {
        const existingTasksJSON = localStorage.getItem('tasks');
        if (existingTasksJSON) {
        const existingTasks: Task[] = JSON.parse(existingTasksJSON);
        setTasks(existingTasks);
        }
    }, []);

    // Fetch categories from localStorage when the component mounts
    useEffect(() => {
        const sidebarRoutesJSON = localStorage.getItem('sidebarRoutes');
        if (sidebarRoutesJSON) {
        const sidebarRoutes: string[] = JSON.parse(sidebarRoutesJSON);
        // Here you can do something with the loaded categories, e.g., set them in state.
        setSidebarTaskCategory(sidebarRoutes)
        }
    }, []);

    const toggleAddTask = () => {
        setIsAddingTask(!isAddingTask);
    };

    const handleTaskTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    const handleTaskDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskDate(e.target.value);
    };

    const handleTaskCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTaskCategory(e.target.value);
    };

    const addTask = () => {
        if (taskText && taskDate && taskCategory) {
        const newTask = {
            id: Date.now().toString(), // Generate a unique ID
            name: taskText,
            date: taskDate,
            category: taskCategory,
            status: taskStatus,
        };
    
        const existingTasksJSON = localStorage.getItem('tasks');
        const existingTasks: Task[] = existingTasksJSON ? JSON.parse(existingTasksJSON) : [];
        existingTasks.push(newTask);
    
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
    
        setTaskText('');
        setTaskDate('');
        setTaskCategory('');
        setIsAddingTask(false);
        setTasks(existingTasks); // Update the tasks state with the new task
        } else {
        // Handle validation or show an error message if any of the fields is empty
        // You can add your validation logic or error handling here
        }
    };
    

    const deleteTask = (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        };
        
    const updateTaskStatus = (taskId: string) => {
        const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
            return { ...task, status: 'complete' };
        }
        return task;
    });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const updateTaskStatusToProgress = (taskId: string) => {
        const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
            return { ...task, status: 'progress' };
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
};
    
    const categories = Array.isArray(sidebarTaskCategory) ? sidebarTaskCategory.filter((category: string) => category !== 'All Tasks') : [];

    const completeTasks = tasks.filter((task) => task.status === 'complete');
    
    const progressingTasks = activeCategory === 'All Tasks' ? 
        tasks.filter((task) => task.status === 'progress')
        : activeCategory
            ? tasks.filter((task) => task.status === 'progress' && task.category === activeCategory)
            : tasks.filter((task) => task.status === 'progress');

    return (
        <div className='relative w-full h-full overflow-y-auto'>
            <div className='flex flex-col w-full h-auto gap-2 p-4'>
                {progressingTasks?.map((task, index) => (
                <TaskItem
                    key={task.id}
                    taskId={task.id} // Pass the unique ID as a prop
                    name={task.name}
                    date={task.date}
                    category={task.category}
                    status={task.status}
                    onDelete={() => deleteTask(task.id)} // Pass the task's ID to delete
                    onUpdateStatus={() => updateTaskStatus(task.id)} // Pass the task's ID to update status
                />
                ))}
            </div>

            <div className='flex flex-col w-full h-auto gap-2 p-4 pb-20'>
                {completeTasks && <p className='text-lg text-white'>Completed</p>}
                {completeTasks?.map((task, index) => (
                <TaskItem
                    key={task.id}
                    taskId={task.id} // Pass the unique ID as a prop
                    name={task.name}
                    date={task.date}
                    category={task.category}
                    status={task.status}
                    onDelete={() => deleteTask(task.id)} // Pass the task's ID to delete
                    onUpdateStatus={() => updateTaskStatusToProgress(task.id)} // Pass the task's ID to update status
                    onCompleteTask={true}
                />
                ))}
            </div>

        <div className='fixed flex items-center justify-center w-full md:w-[80%] px-3 cursor-pointer pt-20 bottom-4'>
            {isAddingTask ? (
            <div className='p-2 w-full text-white flex bg-[#22262F] rounded items-center gap-4'>
                <input
                    type='text'
                    placeholder='Enter task'
                    className='w-full bg-transparent outline-none'
                    value={taskText}
                    onChange={handleTaskTextChange}
                />
                <input
                    type='date'
                    className='bg-[#1B1E25] p-2 rounded outline-none'
                    value={taskDate}
                    onChange={handleTaskDateChange}
                />
                <select
                    value={taskCategory}
                    className='text-white bg-transparent outline-none'
                    onChange={handleTaskCategoryChange}
                >
                    <option value=''>Select Category</option>
                    {categories?.map((category: any)=>
                        <option value={category} className='text-black'>{category}</option>
                    )}
                </select>
                <button onClick={addTask} className='flex items-center justify-center px-3 py-2 bg-blue-500 rounded'>Add</button>
            </div>
            ) : (
            <div
                className='p-4 w-full text-white flex bg-[#22262F] rounded items-center gap-4'
                onClick={toggleAddTask}
            >
                +Add Task
            </div>
            )}
        </div>
        </div>
    );
};

export default MainContent;
