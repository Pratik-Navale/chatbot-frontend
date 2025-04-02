import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Userdata } from '../context/userContext';
import { LoadingSpinner } from '../components/Loading';
import { ChatData } from '../context/ChatContext';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { verifyUser, btnLoading } = Userdata();
    const { fetchChats } = ChatData();

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyUser(Number(otp), navigate, fetchChats);
    };

    return (
        <div className='flex justify-center items-center min-h-screen '>
            <form 
                className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'
                onSubmit={handleSubmit}
            >
                <h2 className='text-2xl font-semibold mb-6 text-center'>Verify OTP</h2>
                <div className='mb-4'>
                    <label 
                        htmlFor='otp' 
                        className='block text-gray-700 font-medium mb-2'
                    >
                        OTP:
                    </label>
                    <input 
                        type='text' 
                        id='otp' 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        required 
                        className='border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <button 
                    type='submit' 
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-400'
                    disabled={btnLoading}
                >
                    {btnLoading ? <LoadingSpinner /> : 'Verify'}
                </button>
            </form>
        </div>
    );
};

export default Verify;
