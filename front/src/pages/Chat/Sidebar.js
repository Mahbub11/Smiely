import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_LEVEL } from '../../config';
import { getMyChatList } from '../../redux/slices/chat';
import axios from '../../utils/axios';
// import { clearErrors, getAllChats } from '../../actions/chatAction';
import ChatListItem from './ChatListItem';
// import SkeletonUserItem from '../Layouts/SkeletonUserItem';
// import { Skeleton } from '@mui/material';

const Sidebar = ({ openModal, socket }) => {

    const dispatch = useDispatch();
    const params = useParams();
    const [users,setUsers]= useState()

    const { user } = useSelector((state) => state.auth)
    const {chatUserList,error}=useSelector((state)=> state.chat)
    // const { loading, error, chats } = useSelector((state) => state.allChats)
    const [chatUser, setChatUser]= useState([])

    useEffect( ()=>{
   

        //     async function fetchData(){
        //      await axios.get(`${API_LEVEL}/user/all-user`)
        //     .then((res)=>{
        //    setUsers(res.data.users.filter((u)=> u._id !== user._id))
        //     });
        //     }
        // fetchData()
        dispatch(getMyChatList())
    },[])

    
    

    return (
        <>
            <div className=" sm:flex flex-col h-full w-2/6 border-r">

                <div className="flex items-center justify-between border-b p-4">
                    <span className="mx-auto font-medium cursor-pointer dark:text-white">{user.username}</span>
                    <svg onClick={openModal} className="cursor-pointer" aria-label="New Message" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line></svg>
                </div>

                <div className="flex flex-col overflow-y-auto overflow-x-hidden">

                    <span className="px-4 py-2 font-medium dark:text-white">Messages</span>

                    {/* {loading &&
                        Array(10).fill("").map((el, i) => (
                            <div className="flex items-center gap-2 py-2 px-4" key={i}>
                                <Skeleton animation="wave" variant="circular" width={65} height={50} />
                                <div className="flex flex-col gap-0 w-full">
                                    <Skeleton height={23} width="85%" animation="wave" />
                                    <Skeleton height={23} width="60%" animation="wave" />
                                </div>
                            </div>
                        ))
                    } */}

                    {chatUserList?.map((c) => (
                        <ChatListItem {...c} key={c._id} />
                    ))}

                </div>

            </div>

        </>
    )
}

export default Sidebar