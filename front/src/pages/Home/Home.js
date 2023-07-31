import PostsContainer from './PostsContainer'
import Sidebar from './Sidebar/Sidebar'
// import MetaData from '../Layouts/MetaData';

const Home = () => {
  return (
    <div className='overflow-y-scroll'>
      {/* <MetaData title="Instagram" /> */}

      <div className="flex h-[100%] md:w-4/5 lg:w-4/6 mt-14 mx-auto">
        <PostsContainer />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home