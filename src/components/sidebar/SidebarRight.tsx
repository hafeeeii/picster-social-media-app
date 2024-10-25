import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
  } from "@/components/ui/sidebar"


const SidebarRight = () => {

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
        <Sidebar collapsible="icon" side="right"  className="mr-20">
        <SidebarContent  className="bg-card" > 
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* {list.map((val) => (
                  <SidebarMenuItem key={val.title}>
                    <SidebarMenuButton asChild size={"lg"} >
                      <a href='/'>
                        {val.icon}
                        <span>{val.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))} */}
                other stuffs here
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
}

export default SidebarRight