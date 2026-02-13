import { forwardRef } from "react"

const UserBox = forwardRef(({activeUser, setActiveUser, userBoxActive}, ref) =>{

    return(
        <div ref={ref} className={`${userBoxActive? "fixed" : "hidden"} w-60 h-fit rounded-2xl bg-[#26282b] border border-[#6e73794b] bottom-30 left-5 z-20 shadow-2xl p-4`}>
                        <form className="h-full w-full ">
                            <label className="text-[16px]" htmlFor="name">Nombre</label>
                            <input 
                                type="text" 
                                name="name"
                                id="apodo"
                                placeholder="Tu nombre..."
                                className="w-full mt-1 mb-4 outline-none border-b border-[#6e737970] pb-1"
                                value={activeUser?.name ?? ""} 
                                onChange={(e) => setActiveUser((prev:any) => ({...prev, name: e.target.value}))}
                            />
                            <label className="text-[16px]" htmlFor="apodo">Apodo</label>
                            <input 
                                type="text" 
                                name="apodo"
                                id="apodo"
                                placeholder="Crea un apodo..."
                                className="w-full mt-1 mb-4 outline-none border-b border-[#6e737970] pb-1"
                                value={activeUser?.apodo ?? ""} 
                                onChange={(e) => setActiveUser((prev:any)=> ({...prev, apodo: e.target.value}))}
                            />
                            <label className="text-[16px]" htmlFor="apodo">Nombre de tu modelo</label>
                            <input 
                                type="text" 
                                name="apodo"
                                id="apodo"
                                placeholder="Original..."
                                className="w-full mt-1 mb-4 outline-none border-b border-[#6e737970] pb-1"
                                value={activeUser?.apodo ?? ""} 
                                onChange={(e) => setActiveUser((prev:any)=> ({...prev, apodo: e.target.value}))}
                            />
                        </form>
    </div>
    )
})

export default UserBox;