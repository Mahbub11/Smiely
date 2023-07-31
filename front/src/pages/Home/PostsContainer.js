import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import UsersDialog from '../../components/common/UsersDialog'
// import PostItem from './PostItem'
import StoriesContainer from './StoriesContainer'
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonPost from '../../components/Skeleton/SkeletonPost'
import { getPostsOfFollowing, postsOfFollowingReset } from '../../redux/slices/post'
import SpinLoader from '../../layouts/SpinLoader'
import PostItem from './PostItem'

const PostsContainer = () => {

    const dispatch = useDispatch();

    const [usersList, setUsersList] = useState([]);
    const [usersDialog, setUsersDialog] = useState(false);
    const [page, setPage] = useState(2);
    const { loading, error, post,totalPosts,message } = useSelector((state) => state.post)
    
    
    const handleClose = () => setUsersDialog(false);


    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        // toast.success(message)
        
        dispatch(getPostsOfFollowing())
        dispatch(postsOfFollowingReset())
    }, [dispatch, error]);
    console.log(post)

    const fetchMorePosts = () => {
        setPage((prev) => prev + 1)
        // console.log(page)
        dispatch(getPostsOfFollowing(page));
    }

    return (
        <>
            <div className="flex flex-col justify-between h-screen w-full lg:w-2/3 sm:mt-6 sm:px-8 mb-8 gap-[5rem] scroll-smooth">

               <div className='h-[3rem]'>
               <StoriesContainer />
               </div>

                {loading &&
                    Array(5).fill("").map((el, i) => (<SkeletonPost key={i} />))
                }
                <InfiniteScroll
                    dataLength={10}
                    next={fetchMorePosts}
                    // hasMore={post.length !== totalPosts}
                    loader={<SpinLoader />}
                 >
                    <div className="w-full h-full mt-1 sm:mt-6 flex flex-col space-y-4">
                        {post?.map((post,i) => (
                            <PostItem key={post._id} {...post} setUsersDialog={setUsersDialog} setUsersList={setUsersList} />
                        ))}
                    </div>
                </InfiniteScroll>

                {/* <UsersDialog title="Likes" open={usersDialog} onClose={handleClose} usersList={usersList} /> */}

            </div>
        </>
    )
}

export default PostsContainer