export default function Footer(){
    return(
        <div className="mt-auto w-full h-20 bg-(--black-color) flex items-center justify-start p-8 border-x border-[#3B3440] shadow-[0_-4px_30px_rgba(0,0,0,0.7)]">
            <h5 className="text-[14px] text-(--gray-color)">&copy; 2026 Echo by LOVR. All rights reserved.</h5>
            <div className="ml-auto flex items-center gap-4 text-(--gray-color)">
                <a target="_blank" className="hover:text-(--white-color) transition-all" href="">
                    <i className="fa-brands fa-instagram text-2xl"></i>
                </a>
                <a target="_blank" className="hover:text-(--white-color) transition-all" href="">
                    <i className="fa-brands fa-github text-2xl"></i>
                </a>
                <a target="_blank" className="hover:text-(--white-color) transition-all" href="">
                    <i className="fa-brands fa-x-twitter text-2xl"></i>
                </a>
            </div>
        </div>
    )
}