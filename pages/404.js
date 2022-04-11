import Link from "next/link";
import { useSelector } from "react-redux";

const NotFound = () => {

    const { isLogin } = useSelector((state) => state.user);

    if(!isLogin){
        return (
            <div className="bg-darkprimary min-h-screen text-white">
                <div className="grid justify-center mx-auto pt-20 gap-y-10">
                    <div className="text-7xl text-pinktertiary font-bold">Oops...</div>
                    <div className="text-3xl font-bold">That page can not be found</div>
                    <div className="text-xl">Go back to the <span className="font-bold text-pinktertiary hover:underline"><Link href="/login">Login</Link></span> page</div>
                </div>
            </div>
        )
    };

    return (
        <div className="bg-darkprimary min-h-screen text-white">
            <div className="grid justify-center mx-auto pt-20 gap-y-10">
                <div className="text-7xl text-pinktertiary font-bold">Oops...</div>
                <div className="text-3xl font-bold">That page can not be found</div>
                <div className="text-xl">Go back to the <span className="font-bold text-pinktertiary hover:underline"><Link href="/home">Home</Link></span> page</div>
            </div>
        </div>
    );
}
 
export default NotFound;