import Link from "next/link"

export default function Header(){
    return(
        <div className="w-full h-20 bg-(--black-color) border-x border-[#3B3440] shadow-[0_4px_30px_rgba(0,0,0,0.7)] flex items-center justify-start px-8">
            <h1 className="text-3xl font-medium text-(--white-color)">
                Echo
                <span className="text-[15px] ml-1.5 lovr-color">by LOVR</span>
            </h1>
            <div className="ml-auto flex align-center gap-5">
                <Link className={"link"} href={"/"}>Para escuelas</Link>
                <Link className={"link"} href={"/"}>Sobre nosotros</Link>
            </div>
            

        </div>
    )
}