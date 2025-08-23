"use cline"

import { inputComponent_input } from '@/types/pagesProps';
import React, {  useState } from 'react';
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";


const INPUT = ({ changeHandler , value ,label , type , name , placeholder , textarea , error , style }:inputComponent_input) => {

    const [ newType , setType ] = useState(type)

    const typehandler = () => newType === "password" ? setType("text") : setType("password")

    return (
        <div className='flex flex-col gap-y-2 text-Body-MD-Small'>
            { label ? <label>{ label }</label> : null}
            {
                !textarea ? <div className='flex items-center relative text-Neutral-800 '>
                                <input
                                    className={`${style ? style : ""} w-full text-Body-RL-Small p-3 border border-Neutral-400 rounded-lg focus:text-Neutral-900 focus:border-Neutral-900 focus:outline-none`} 
                                    type={ newType }
                                    value={ value }
                                    name={ name }
                                    dir={type === "email" && value ? "ltr" : "rtl"} 
                                    onChange={ ( event ) => changeHandler( event ) }
                                    placeholder={ placeholder }
                                />
                                { type === "password" ? <span className=' absolute left-5 text-lg' onClick={typehandler}>{newType === "password" ? <IoEyeOffSharp/> : <IoEyeSharp/> }</span> : null}
                            </div> : 
                            <textarea className={`text-Greyscale-400 text-Body-RL-Small p-3 border border-Neutral-400 rounded-lg focus:text-Neutral-900 focus:border-Neutral-900 focus:outline-none`}
                                    value={ value }
                                    name={ name }
                                    rows={5}
                                    onChange={ ( event ) => changeHandler( event ) }
                                    placeholder={ placeholder }
                            />
            }
            { error ? <span className='text-Body-RL-XSmall ml-4 text-Error-400'>{error}</span> : null}
        </div>
    );
};

export default INPUT;