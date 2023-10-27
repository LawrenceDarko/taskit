import { useGeneralContext } from "../../context/GeneralContext"

const TaskDetails = () => {

    const { openTaskDetails, setOpenTaskDetails } = useGeneralContext();

    return (
        <div className={`fixed inset-y-0 right-0 bg-[#22262F] border-l border-[#475569] z-50 flex-col w-80 h-full ${openTaskDetails ? 'flex' : 'hidden'}`}>
            <div className="w-full h-full relative">
                <div onClick={()=>setOpenTaskDetails(false)} className="absolute right-2 p-2 top-2 text-[#475569] text-xl cursor-pointer">x</div>
            </div>
        </div>
    )
}

export default TaskDetails