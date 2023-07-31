import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getImage, SOCKET_ENDPOINT } from '../../utils/constants';
import { io } from 'socket.io-client';

const ChatListItem = ({ _id, users, latestMessage,name,avatar }) => {

    const dispatch = useDispatch();
    const params = useParams();
    const [friend, setFriend] = useState({});

    const socket = useRef(null);
    const [isOnline, setIsOnline] = useState(false);

    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        const friendDetails = users.find((u) => u._id !== user._id);
        setFriend(friendDetails)
    }, [users]);

    console.log(friend)

   

    return (
        <Link to={`/direct/t/${_id}/${friend._id}`} className={`${params.chatId === _id && 'bg-gray-100'}
         flex gap-3 items-center py-2 px-4 cursor-pointer hover:bg-gray-500`}>
            <div className="w-14 h-14 relative ">
                <img draggable="false" className="w-full h-full rounded-full object-cover" src={getImage(friend.avatar)} alt="avatar" />
             
                {true && <div className="absolute right-0 bottom-0.5 h-3 w-3 bg-green-500 rounded-full"></div>}
            </div>
            <div className="flex flex-col items-start">
                <span className="text-sm dark:text-white">{friend.username}</span>
                <span className="text-sm truncate w-36 text-gray-400 dark:text-white">{'This is Last Message'}</span>
            </div>
        </Link>
    )
}

export default ChatListItem