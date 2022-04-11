import LeftNavBar from '../components/leftnavbar'
import Feed from '../components/feed'
import RightNavBar from '../components/rightnavbar'
import useUser from '../hooks/useUser'

const Home = () => {


    return(
            <div className='flex'>
                <LeftNavBar/>
                <Feed/>
                <RightNavBar/>
            </div>
    )
}

export default Home