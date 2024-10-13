import { Bell, Compass, House, MessageCircle, Play, Plus, Search } from "lucide-react"


const list = [
    {title: 'Home', icon:<House />},
    {title: 'Search', icon:<Search/>},
    {title: 'Explore', icon:<Compass/>},
    {title: 'Reels', icon:<Play/>},
    {title: 'Messages', icon:<MessageCircle/>},
    {title: 'Notifications', icon:<Bell/>},
    {title: 'Create', icon:<Plus/>},
]
const SidebarLeft = () => {

    return (
        <div className=" h-full w-full flex flex-col gap-8 ">
            <ul className="flex flex-col gap-10 h-full p-10" >
            {list.map((val,index) => (
                    <li  key={index} className="flex gap-4 cursor-pointer" >
                    {val.icon}{val.title} 
                    </li>
            ))}
            </ul>
        </div>
    )
}

export default SidebarLeft