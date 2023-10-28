import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { BsClipboardCheck } from 'react-icons/bs';
import { useGeneralContext } from '../../context/GeneralContext';

interface TaskItemProps {
    taskId: string; // Use a string type for the task ID
    name: string;
    date: string; // Use string for date
    category: string; // Use string for category
    onDelete: (taskId: string) => void; // Pass the task ID to onDelete
    status: string; // Use string for status
    onUpdateStatus: (taskId: string) => void; // Pass the task ID to onUpdateStatus
    onCompleteTask?: any
}

const TaskItem: React.FC<TaskItemProps> = ({ taskId, name, date, category, onDelete, onUpdateStatus, status, onCompleteTask }) => {
    const { setOpenTaskDetails, setTaskDetails } = useGeneralContext();

    const copyToClipboard = () => {
        const taskDetails = `Name: ${name}\nDate: ${date}\nCategory: ${category}\nStatus: ${status}`;
        navigator.clipboard.writeText(taskDetails).then(() => {
            toast.success('Task details copied to clipboard!');
        }).catch((error) => {
            console.error('Unable to copy to clipboard: ', error);
        });
    };

    const getTaskDetails = () => { 
        // const taskDetails = `Name: ${name}\nDate: ${date}\nCategory: ${category}\nStatus: ${status}`;
        const taskDetails = {
            name, 
            date, 
            category, 
            status
        }
        console.log(taskDetails)
        setTaskDetails(taskDetails)
    }
    

    return (
        <div className={`relative p-5 cursor-pointer flex bg-[#22262F] rounded items-center gap-4`}>
            <div onClick={() => onUpdateStatus(taskId)}>
                {!onCompleteTask ? <MdOutlineRadioButtonUnchecked className='text-xl text-[#475569]' /> :
                <MdOutlineTaskAlt className='text-xl text-[#475569]' />}
            </div>
            <div 
                onClick={() => {
                    setOpenTaskDetails(true)
                    getTaskDetails()
                }} 
                className='flex flex-col'>
                <p className={`text-[#475569] ${onCompleteTask && 'line-through'}`}>{name}</p>
                <div className={`flex items-center gap-2 font-normal ${onCompleteTask && 'line-through line decoration-slate-100'}`}>
                    <p className='text-[#B4B4B4]'>{category}</p>
                    <div className='flex items-center justify-center gap-2 pt-2 text-xs text-white md:pt-1'>
                        <SlCalender />
                        <p>{date}</p>
                    </div>
                    <BsClipboardCheck onClick={copyToClipboard} className='text-green-500'/>
                </div>
            </div>
            <RiDeleteBin5Line onClick={() => onDelete(taskId)} className='absolute text-red-500 right-4' />
            <Toaster />
        </div>
    );
}

export default TaskItem;
