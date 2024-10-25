import { Bell, Compass, House, MessageCircle, Play, Plus, Search } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import Link from "next/link"


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
        // <div className=" h-full w-full flex flex-col gap-8 ">
        //     <ul className="flex flex-col gap-10 h-full p-10" >
        //     {list.map((val,index) => (
        //             <li  key={index} className="flex gap-4 cursor-pointer" >
        //             {val.icon}{val.title} 
        //             </li>
        //     ))}
        //     </ul>
        // </div>
        <Sidebar collapsible="icon" className="ml-20" >
        <SidebarContent  className="bg-card " > 
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="mt-10 space-y-4">
                {list.map((val) => (
                  <SidebarMenuItem key={val.title}>
                    <SidebarMenuButton asChild size={"lg"} className="text-xl flex items-center gap-4" >
                      <Link href='/home'>
                      <div className="text-lg">
                        {val.icon}
                      </div>
                        <span>{val.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
}

export default SidebarLeft