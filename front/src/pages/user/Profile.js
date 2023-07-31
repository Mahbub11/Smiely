import { useEffect, useState } from "react";
// import PostContainer from './Posts/PostContainer';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { clearErrors, followUser, getUserDetails } from '../../actions/userAction';
// import { clearErrors as clearChatErrors, addNewChat } from '../../actions/chatAction';
import { toast } from "react-toastify";
import BackdropLoader from "../../layouts/BackdropLoader";
import {
  metaballsMenu,
  postsIconFill,
  postsIconOutline,
  reelsIcon,
  savedIconFill,
  savedIconOutline,
  settingsIcon,
  taggedIcon,
} from "../../components/NavBar/SvgIcons";
// import { FOLLOW_USER_RESET, USER_DETAILS_RESET } from '../../constants/userConstants';
// import UsersDialog from '../Layouts/UsersDialog';
// import { NEW_CHAT_RESET } from '../../constants/chatConstants';
// import MetaData from '../Layouts/MetaData';
// import NotFound from '../Errors/NotFound';
import { getImage } from "../../utils/constants";
import { followUser, getUserDetails, resetUserList } from "../../redux/slices/user";
import PostContainer from "./Post/PostContainer";
import { addNewChat } from "../../redux/slices/chat";

const Profile = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { guestUser, error, loading,posts } = useSelector((state) => state.userDetails);
  const{error:chatError,chat}= useSelector((state)=> state.chat)
  const [savedTab, setSavedTab] = useState(false);
  const [follow, setFollow] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const params = useParams();

  const handleFollow = () => {
    // setFollow(!follow); 
    dispatch(followUser(guestUser._id));
    dispatch(resetUserList())
}
const addToChat = () => {
  dispatch(addNewChat(guestUser._id))
  if(!chatError){
    // navigate(`/direct/t/${chat._id}/${friendId}`);
    navigate(`/direct/t/${chat._id}`);
  }
}
console.log(chat)



  useEffect(() => {
    dispatch(getUserDetails(params.username));
  }, [params.username,dispatch]);

  useEffect(()=>{
   setFollow( guestUser?.followers?.some((u)=> u.id=== loggedInUser.id))
  },[guestUser])

 


  // useEffect(()=>{
  //   setFollow(user?.followers?.some((u)=> u.id === loggedInUser._id))
  // },[user])



  return (
    <>
      {loading && <BackdropLoader></BackdropLoader>}
      {guestUser ? (
        <div className="mt-16 xl:w-2/3 mx-auto">
          <div className="sm:flex w-full sm:py-8">
            {/* profile picture */}
            <div className="sm:w-1/3 flex justify-center mx-auto sm:mx-0">
              <img
                draggable="false"
                className="w-40 h-40 rounded-full object-cover"
                src={getImage(guestUser.avatar)}
                alt="avatar"
              ></img>
            </div>
            {/* profile details */}
            <div className="flex flex-col gap-6 p-4 sm:w-2/3 sm:p-1">
              <div className="flex items-center gap-8 sm:justify-start justify-between">
                <h2 className="text-2xl sm:text-3xl font-thin">
                  {guestUser.username}
                </h2>
                {loggedInUser.username === guestUser.username ? (
                  <div className="flex gap-3 items-center">
                    <Link
                      to="/accounts/edit"
                      className="border font-medium hover:bg-gray-50 text-sm rounded px-2 py-1"
                    >
                      Edit Profile
                    </Link>
                    <Link to="/accounts/edit">{settingsIcon}</Link>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    {follow ? (
                      <>
                        <button onClick={addToChat} className="border rounded px-2.5 py-[0.3rem] text-sm font-medium hover:bg-gray-100">
                          Message
                        </button>
                        <button onClick={handleFollow} className="font-medium text-sm bg-red-50 rounded py-1.5 px-3 text-red-600 hover:bg-red-100 hover:text-red-700">
                          Unfollow
                        </button>
                      </>
                    ) : (
                      <button onClick={handleFollow} className="font-medium bg-primary-blue text-sm text-white hover:shadow rounded px-6 py-1.5">
                        Follow
                      </button>
                    )}
                    <span className="sm:block hidden">{metaballsMenu}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center max-w-[21.5rem]">
                <div className="cursor-pointer">
                  <span className="font-semibold">{guestUser.posts?.length}</span>{" "}
                  posts
                </div>
                <div className="cursor-pointer">
                  <span className="font-semibold">
                    {guestUser.followers?.length}
                  </span>{" "}
                  followers
                </div>
                <div className="cursor-pointer">
                  <span className="font-semibold">
                    {guestUser.following?.length}
                  </span>{" "}
                  following
                </div>
              </div>

              {/* bio */}
              <div className="max-w-full">
                <p className="font-medium">{guestUser.name}</p>
                <p className="whitespace-pre-line">{guestUser.bio}</p>
                {guestUser?.website && (
                  <a
                    href={guestUser.website}
                    target="_blank"
                    className="text-blue-900 font-medium"
                  >
                    {new URL(guestUser.website).hostname}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* {followersModal ?
                        <UsersDialog title="Followers" open={viewModal} onClose={closeModal} usersList={user?.followers} />
                        :
                        <UsersDialog title="Following" open={viewModal} onClose={closeModal} usersList={user?.following} />
                    } */}

          <div className="border-t sm:ml-8 sm:mr-14">
            {/* Tab */}
            <div className="flex gap-12 justify-center">
              <span
                onClick={() => setSavedTab(false)}
                className={`${
                  savedTab ? "text-gray-400" : "border-t border-black"
                } py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium`}
              >
                {savedTab ? postsIconOutline : postsIconFill} posts
              </span>
              {guestUser._id === loggedInUser._id && (
                <span
                  onClick={() => setSavedTab(true)}
                  className={`${
                    savedTab ? "border-t border-black" : "text-gray-400"
                  } py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium`}
                >
                  {savedTab ? savedIconFill : savedIconOutline} saved
                </span>
              )}
              <span className="py-3 flex items-center text-gray-400 text-[13px] uppercase gap-3 tracking-[1px] font-medium">
                {reelsIcon} reels
              </span>
              <span className="py-3 hidden sm:flex items-center text-gray-400 text-[13px] uppercase gap-3 tracking-[1px] font-medium">
                {taggedIcon} tagged
              </span>
            </div>
          </div>
          {savedTab ? (
            <PostContainer posts={guestUser?.saved} id={"saved"} />
          ) : guestUser?.posts?.length > 0 ? (
            <PostContainer posts={guestUser?.posts} id={"posts"} />
          ) : (
            // <div className="bg-white mt-2 mb-10 drop-shadow-sm rounded flex sm:flex-row flex-col sm:gap-0 gap-5 sm:p-0 p-4 items-center justify-between">
            //     <img draggable="false" className="w-2/5 rounded-l" src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg" alt="" />
            //     <div className="mx-auto flex flex-col items-center">
            //         <h4 className="font-medium text-lg sm:text-xl">Start capturing and sharing your moments.</h4>
            //         <p>Get the app to share your first photo or video.</p>
            //     </div>

            // </div>

            <div>No Post yet</div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Profile;
