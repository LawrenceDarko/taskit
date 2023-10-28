import { useGeneralContext } from "../../context/GeneralContext"

const TaskDetails = () => {

    const { openTaskDetails, setOpenTaskDetails, taskDetails } = useGeneralContext();

    return (
        <div className={`fixed inset-y-0 right-0 bg-[#22262F] border-l border-[#475569] z-50 flex-col w-80 h-full ${openTaskDetails ? 'flex' : 'hidden'}`}>
            <div className="relative w-full h-full">
                <div onClick={()=>setOpenTaskDetails(false)} className="absolute right-2 p-2 top-2 text-[#475569] text-xl cursor-pointer">x</div>
                <div className="flex flex-col gap-2 pt-16 text-white">
                    <div className="p-3">Name: {taskDetails.name}</div>
                    <div className="p-3">Due Date: {taskDetails.date}</div>
                    <div className="p-3">Category: {taskDetails.category}</div>
                    <div className="p-3">Status: {taskDetails.status}</div>
                </div>
            </div>
            
        </div>
    )
}

export default TaskDetails