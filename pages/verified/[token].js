import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import API_URL from "../../helpers/apiurl";
import useUser from "../../hooks/useUser";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";
import Link from "next/link";

const Verified = () => {
  
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(0);
  const [loading, setloading] = useState(true);
  const { isLogin, username, id, email } = useUser();
  const dispatch = useDispatch();
  // 0 loading 2: gagal 1:berhasil
  useEffect(async () => {
    try {
      console.log(API_URL)
      console.log(token)
      let res = await axios.get(`${API_URL}/auth/verified`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      //   kalo register langsung login better kriim datanya ke redux
      dispatch({ type: "LOGIN", payload: res.data });
      console.log(res.data)
      setstatus(1);
    } catch (error) {
      console.log(error);
      setstatus(2);
    } finally {
      setloading(false);
    }
  }, []);

  const sendEmail = async () => {
    try {
      setloading(true);
      await axios.post(`${API_URL}/auth/sendemail-verified`, {
        id: id,
        username,
        email
      });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid justify-center pt-44 bg-black min-h-screen">
        <div className="text-white flex flex-col items-center space-y-6">
          <div className="text-5xl font-bold pt-6 text-pinktertiary">Loading . . .</div>
        </div>
      </div>
    );
  }

  if (status === 1) {
    return (
      <div className="grid justify-center pt-28 bg-black min-h-screen">
        <div className="text-white flex flex-col items-center space-y-6">
          <div className="text-9xl text-pinktertiary rounded-full"><BsFillCheckCircleFill/></div>
          <div className="text-3xl font-bold pt-6">You have been successfully verified!</div>
          <div className="text-2xl">Head back to your <span className="text-pinktertiary font-bold hover:underline"><Link href="/home">Home</Link></span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid justify-center pt-28 bg-black min-h-screen">
      <div className="text-white flex flex-col items-center space-y-6">
        <div className="text-9xl text-pinktertiary rounded-full"><BsFillXCircleFill/></div>
        <div className="text-3xl font-bold pt-6">Failed to verify</div>
        <div className="text-2xl">Click the button to re- <button onClick={sendEmail} className="text-2xl bg-pinktertiary px-3 py-1 rounded-full hover:bg-pinksecondary duration-700">Verify</button></div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Verified;