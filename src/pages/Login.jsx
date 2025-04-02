import React, { useState } from 'react'
import { Userdata } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/Loading';

const Login = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { loginUser, btnLoading } = Userdata();
    const submithandler = (e) => {
        e.preventDefault();
        loginUser(email, navigate);
    }

    return (
        <div className='flex justify-center items-center h-screen min-h-screen '>

            <form className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md' onSubmit={submithandler}>
                <h2 className='text-2xl font-semibold mb-6 text-center '>Login</h2>
                <div className="mb-4">

                    <label className="block text-gray-700 font-medium mb-2" htmlFor="Email"

                    >Email:</label>

                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500" />

                </div>

                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-400" disabled={btnLoading}>
                    {btnLoading ? <LoadingSpinner /> : "Submit"}
                </button>

            </form>


        </div>
    )
}

export default Login