import { UserRole } from '@/types/enums/generalEnums';
import { DashboardItem_interface } from '@/types/generalTypes';
import Link from 'next/link';
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';

const RenderDashboardNavbarItem = ({item , role} : {item: DashboardItem_interface , role:string}) => {

      let numOfValidChild = 0
        for( const ch of item?.children ) {
            if(ch.accessibility.includes(UserRole.ALL) || ch.accessibility.includes(role as UserRole) ) numOfValidChild++
        }   
    
        let validChild = numOfValidChild === 0 ? false : true
    return (
        <div className=''>
           {
                (item?.children.length && validChild )  ? <details className="group">
                {/* Summary section, clickable to toggle the dropdown */}
                <summary className="flex items-center justify-between cursor-pointer">
                    {/* Link to the main menu item */}
                    <Link className='p-1 flex items-center gap-x-1' href={item.href}>{item.icon}{item.name}</Link>
                    {/* Dropdown icon that rotates when the menu is open */}
                    <span className="text-2xl lg:text-3xl mr-3 transition-transform duration-500 group-open:rotate-45">
                        <MdArrowDropDown />
                    </span>
                </summary>
                {/* Submenu items, rendered if there are any children */}
                <div className='mr-8 my-3 scale-up-ver-top'>
                    <ul className='flex flex-col gap-y-3 '>
                        {/* Loop through each child item and render a list item with a link */}
                        {
                            item?.children.map(ch => 
                                <li className='hover:cursor-pointer' key={ch.href}>
                                    <Link className={`p-1 flex items-center gap-x-1`} href={ch.href}>{ch.icon}{ch.name}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </details> : <Link className='p-1 flex items-center gap-x-1' href={item.href}>{item.icon}{item.name}</Link> 
           }
        </div>
    );
};

export default RenderDashboardNavbarItem;