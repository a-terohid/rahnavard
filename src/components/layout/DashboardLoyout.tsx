import { UserRole } from "@/types/enums/generalEnums";
import { DashboardLoyout_prop } from "@/types/pagesProps";
import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs"
import { DashboardItem_interface } from "@/types/generalTypes";
import RenderDashboardMenuItem from "@/elements/RenderDashboardMenuItem";
import { DashboardItems } from "@/constants/DashboardItems";
import { roleStyles } from "@/constants/roleStyle";


const DashboardLoyout = ({ children , role , fullName } : DashboardLoyout_prop) => {

    let roletext = ''

    if( role == "Owner" ) roletext = "مدیر"
    else if ( role == "Admin" ) roletext = "ادمین"
    
    return (
        <div>
            {/* Dashboard content section */}
            <div className=' container flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-0 gap-y-6 pt-44 pb-10'>
                {/* Sidebar menu */}
                <div className='lg:flex hidden overflow-auto gap-x-2 flex-col gap-y-3 h-fit w-fit text-primary-800 min-w-[248px] py-4 px-4 rounded-xl shadow-xl bg-primary-300'>
                    {/* User info display */}
                    <div className='flex flex-col items-center border-b-2 pb-3'>
                        <BsPersonCircle className=" text-4xl mb-2 " /> {/* User icon */}
                        <p className=' mb-3'>{ fullName }</p> {/* Display user full name */}
                        { role && roleStyles[role] &&  // Check if the user role exists in the role styles
                            <p className={`px-3 py-[2px] text-Regular-Normal-text-1 rounded-md ${roleStyles[role].labelClass}  `}>
                                {roletext} {/* Display the user role */}
                            </p>
                        }
                    </div>
                    <div>
                        <ul>
                            {/* Render menu items based on accessibility */}
                            {
                                DashboardItems.map( (item: DashboardItem_interface) => 
                                    item.accessibility.includes(UserRole.ALL) || item.accessibility.includes(role as UserRole) ? 
                                    <li key={item.href}>
                                        {/* render using RenderDashboardMenuItem */}
                                        {
                                             <RenderDashboardMenuItem item={item} role={role} />  
                                            
                                        }
                                    </li> : null)  /* Only show items that the user has access to */
                            }
                        </ul>
                    </div>
                </div>

                {/* Main content area */}
                <div className='w-full rounded-xl shadow-xl bg-Neutral-100 '>
                    { children }  {/* Render the child content passed to the dashboard */}
                </div>
            </div>
        </div>
    );
};

export default DashboardLoyout;