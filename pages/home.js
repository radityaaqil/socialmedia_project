import LeftNavBar from '../components/leftnavbar'
import Feed from '../components/feed'
import RightNavBar from '../components/rightnavbar'
import useUser from '../hooks/useUser'

const Home = () => {

    const { username } = useUser()


    return(
        <div className='flex'>
            <LeftNavBar username = {username}/>
            <Feed/>
            <RightNavBar/>
        </div>
    )
}

export default Home