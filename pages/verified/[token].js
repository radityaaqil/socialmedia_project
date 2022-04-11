import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router'
import API_URL from "../../helpers/apiurl";
import useUser from "../../hooks/useUser";

const Verified = () => {
  
  const router = useRouter();
  const { token } = router.query;
  const [status, setstatus] = useState(0);
  const [loading, setloading] = useState(true);
  const { isLogin, username, id } = useUser();
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
      });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div>Loading bro....</div>
      </div>
    );
  }

  if (status === 1) {
    return (
      <div className="flex justify-center items-center">
        <div>yeayy berhasill verified</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>gagal verified</div>
      <div>
        {/* {kalo belum login jangan sediakan button} */}
        {isLogin ? (
          <button className="bg-slate-300" onClick={sendEmail}>
            kriim ulang bro
          </button>
        ) : null}
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