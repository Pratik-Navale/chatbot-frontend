import React, { useEffect, useRef, useState } from 'react'
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from '../components/Header';
import { ChatData } from '../context/ChatContext';
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoSend } from "react-icons/io5";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglesidebar = () => {
        setIsOpen(!isOpen);
    }

    const { fetchresponse, messages, prompt, setPrompt, newrquestloading ,loading,chats} = ChatData();

    const submithandler = (e) => {
        e.preventDefault();
        fetchresponse();
    }

    const messagecontainerRef = useRef();

    useEffect(()=>{
        if(messagecontainerRef.current){
            messagecontainerRef.current.scrollTo(
                {
                    top:messagecontainerRef.current.scrollHeight,
                    behavior:"smooth",
                }
            )
        }
    },[messages])

    return (
        <div className="flex h-screen bg-gray-900 text-white flex-col md:flex-row">
            <Sidebar isOpen={isOpen} togglesidebar={togglesidebar} />

            <div className="flex  flex-col w-full md:w-auto">
                <button
                    onClick={togglesidebar}
                    className="md:hidden p-4 bg-gray-800 text-2xl"
                >
                    <GiHamburgerMenu />
                </button>
            </div>
            <div className="flex-1 p-6 md:p-6 mb-20 md:mb-0 ">
                <Header />
                {
                    loading ? <LoadingBig/> :(
                    <div className="flex-1 p-6 max-h-[600px] md:max-h-[600px] md:p-6 overflow-y-auto mb-20 md:mb-0 thin-scrollbar" ref={messagecontainerRef}>
                    {
                        messages && messages.length > 0 ?
                            messages.map((e, i) => (
                                <div key={i}>
                                    <div className="mb-4 p-4 rounded bg-blue-700 text-white flex gap-1">
                                        <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                                            <CgProfile />
                                        </div>
                                        {e.question}
                                    </div>
                                    <div className="mb-4 p-4 rounded bg-gray-700 text-white flex gap-1">
                                        <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                                            <FaRobot />
                                        </div>
                                        <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                                    </div>
                                </div>
                            )) : (<p>No chat yet </p>)
                    }

                    {newrquestloading && <LoadingSmall />}
                </div>
                )}
            </div>
            
            {
               chats && chats.length ===0 ? (""): (
                    <div className='fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]'>
                <form className='flex justify-center  items-center' onSubmit={submithandler}>
                    <input
                        className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
                        type="text"
                        placeholder="Enter a promp here"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    />
                    <button className='p-4 bg-gray-700 rounded-r  text-2xl text-white'><IoSend /></button>
                </form>
            </div>
                )
            }

        </div>
    )
}

export default Home