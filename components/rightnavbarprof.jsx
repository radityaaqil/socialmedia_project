import { Input, InputLeftElement, InputGroup } from '@chakra-ui/react'
import { FiSearch} from "react-icons/fi";
import { FiMoreHorizontal} from "react-icons/fi";

const RightBarProfile = () => {
    return(
        <div className="bg-black min-h-screen border-l-2 border-darksecondary w-4/12 relative">
            <div className='fixed right-0 top-0 bottom-0 pt-6 pr-16 space-y-10 text-4xl text-white'>
                <div>
                <InputGroup w={"xs"}>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<FiSearch/>}
                    />
                    <Input focusBorderColor='pinktertiary' type='tel' placeholder='Search Twatter' />
                </InputGroup>
                </div>
                <div className='text-2xl flex flex-col bg-darkprimary pt-2 pb-4 px-4 rounded-2xl space-y-6'>
                    <div>Trends for you</div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-sm font-thin'>Trending in Indonesia</div>
                            <div className='text-lg'>Barbara Palvin</div>
                        </div>
                        <div><FiMoreHorizontal/></div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-sm font-thin'>Trending in Indonesia</div>
                            <div className='text-lg'>Barbara Palvin</div>
                        </div>
                        <div><FiMoreHorizontal/></div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-sm font-thin'>Trending in Indonesia</div>
                            <div className='text-lg'>Barbara Palvin</div>
                        </div>
                        <div><FiMoreHorizontal/></div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-sm font-thin'>Trending in Indonesia</div>
                            <div className='text-lg'>Barbara Palvin</div>
                        </div>
                        <div><FiMoreHorizontal/></div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='text-sm font-thin'>Trending in Indonesia</div>
                            <div className='text-lg'>Barbara Palvin</div>
                        </div>
                        <div><FiMoreHorizontal/></div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default RightBarProfile