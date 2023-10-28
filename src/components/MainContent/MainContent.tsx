import React, { useState, ChangeEvent, useEffect } from 'react';
import TaskItem from './TaskItem';
import { useGeneralContext } from '../../context/GeneralContext';

const MainContent: React.FC = () => {
    const { activeCategory, categories } = useGeneralContext()
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskStatus, setTaskStatus] = useState('progress');
    const [tasks, setTasks] = useState<Task[]>([]);

    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks); // State for filtered tasks

    // Define the Task type
    interface Task {
        id: string; // Add a unique ID to each task
        name: string;
        date: string;
        category: string;
        status: string;
    }

    // Update filteredTasks whenever tasks or searchQuery changes
    useEffect(() => {
        const filtered = tasks.filter((task) => {
            // Match the task with the search query in name, status, or date
            return (
                task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.date.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredTasks(filtered);
    }, [tasks, searchQuery]);

    // Fetch tasks from localStorage when the component mounts
    useEffect(() => {
        const existingTasksJSON = localStorage.getItem('tasks');
        if (existingTasksJSON) {
        const existingTasks: Task[] = JSON.parse(existingTasksJSON);
        setTasks(existingTasks);
        }
    }, []);

    // Handle search input change
    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };


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
            // return { ...task, status: 'complete' };
            return { ...task, status: task.status === 'progress' ? 'complete' : 'progress' };
        }
        return task;
    });

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    

    // const completeTasks = tasks.filter((task) => task.status === 'complete');
    const newCategoryList = categories.filter((category) => category !== 'All Tasks')
    
    
    const progressingTasks = activeCategory === 'All Tasks'
        ? filteredTasks.filter((task) => task.status === 'progress')
        : filteredTasks.filter((task) => task.status === 'progress' && task.category === activeCategory);

    const completeTasks = activeCategory === 'All Tasks'
        ? filteredTasks.filter((task) => task.status === 'complete')
        : filteredTasks.filter((task) => task.status === 'complete' && task.category === activeCategory);

    console.log('Complete Task ',completeTasks)

    return (
        <div className='relative w-full h-full overflow-y-auto'>
            <input
                type='text'
                placeholder='Search tasks'
                className='outline-none border border-[#22262F] bg-transparent ml-5 rounded p-2 w-full md:w-[30%] text-white mt-3'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
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
                <p className='text-lg text-white'>Completed</p>
                {completeTasks?.map((task, index) => (
                <TaskItem
                    key={task.id}
                    taskId={task.id} // Pass the unique ID as a prop
                    name={task.name}
                    date={task.date}
                    category={task.category}
                    status={task.status}
                    onDelete={() => deleteTask(task.id)} // Pass the task's ID to delete
                    onUpdateStatus={() => updateTaskStatus(task.id)} // Pass the task's ID to update status
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
                    <option>Select Category</option>
                    {newCategoryList?.map((category: any)=>
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
