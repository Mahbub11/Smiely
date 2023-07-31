import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostItem from './PostItem'

const PostContainer = ({ posts, id }) => {


    console.log(posts)
    

    return (
        <div className="grid grid-cols-3 gap-1 sm:gap-8 my-1 mb-8" id={id}>
            {posts?.map((post, i) => (
                <PostItem {...post} key={i} />
            )).reverse()
            }
        </div>
    )
}

export default PostContainer