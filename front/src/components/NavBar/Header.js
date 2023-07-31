import React, { useEffect, useState } from 'react'
import { exploreOutline, homeFill,homeFillDark,homeOutlineDark, homeOutline, likeFill, likeOutline, messageFill, messageOutline, postUploadOutline } from './SvgIcons'
import { Link, useLocation } from 'react-router-dom';
// import ProfileDetails from './ProfileDetails';
// import NewPost from './NewPost';
import { useSelector } from 'react-redux';
import SearchBox from './SearchBar/SearchBox';
import { ClickAwayListener } from '@mui/material';
import { getImage } from '../../utils/constants';
import Switcher from './Switcher';
import useSettings from '../../hooks/useSettings';
import NewPost from './NewPost';
import ProfileDetails from './ProfileDetails';


const Header = () => {

    const { user } = useSelector((state) => state.auth);
    const {dark}= useSelector(state=> state.app.common)
 
    const [profileToggle, setProfileToggle] = useState(false)
    const [newPost, setNewPost] = useState(false);
   
    
    const location = useLocation();
    const [onHome, setOnHome] = useState(false);
    const [onChat, setOnChat] = useState(false);
    

    useEffect(() => {
        setOnHome(location.pathname === "/")
        setOnChat(location.pathname.split('/').includes("direct"))
        
       
    }, [location]);

    return (
        <nav className="fixed top-0 w-full border-b dark:bg-gray-600 bg-white z-10 ">
            {/* <!-- navbar container --> */}
            <div className="flex flex-row justify-between items-center py-2 px-3.5 sm:w-full sm:py-2 sm:px-4 md:w-full md:py-2 md:px-6 xl:w-4/6 xl:py-3 xl:px-8 mx-auto">

                {/* <!-- logo --> */}
                <div className=' w-[10%] dark:rounded-md'>
                <Link className='bg-dark' to="/">
                    <img draggable="false" className="mt-1.5 w-[30%] rounded-md h-[13%] object-contain opacity-95 dark:bg-gray-700" src="https://thumbs.dreamstime.com/z/print-198934577.jpg" alt="" 
                />
                
                </Link>
                </div>


              
              <SearchBox />
          

                {/* <!-- icons container  --> */}
                <div className="flex items-center space-x-6 sm:mr-5">
                    
                    { !dark?<Link to="/">{profileToggle || !onHome ? homeOutline : homeFill}</Link> :
                     <Link to="/">{profileToggle || !onHome ? homeOutlineDark : homeFillDark}</Link>}

                    <Link to="/direct/inbox">{onChat ? messageFill : messageOutline}</Link>

                    <div onClick={() => setNewPost(true)} className="cursor-pointer">{postUploadOutline}</div>

                    <span className="hidden sm:block">{exploreOutline}</span>
                    <span className="hidden sm:block">{likeOutline}</span>

                    <div onClick={() => setProfileToggle(!profileToggle)} className={`${profileToggle && 'border-black border dark:border-green-400' || (!onHome && !onChat) && 'border-black border'} rounded-full cursor-pointer h-7 w-7 p-[0.5px] shadow-md border border-w-[2px]`}><img draggable="false" loading="lazy" className="w-full h-full rounded-full object-cover" src={getImage(user.avatar)} alt="" /></div>
                </div>

                 {profileToggle &&
                    <ProfileDetails setProfileToggle={setProfileToggle} />
                }

                <NewPost  newPost={newPost} setNewPost={setNewPost} /> 
             <div className='h-[28px]'>
             <Switcher></Switcher>
             </div>
            </div>
       
          
     
        </nav>
    )
}

export default Header