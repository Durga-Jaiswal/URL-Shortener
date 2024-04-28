import { useState } from 'react'
import { FaLink } from "react-icons/fa6";

import axios from 'axios';


function UrlSearch() {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);


  const handleChange = (event) => {
    setLongUrl(event.target.value)
  }

    

  const handleClick = async (event) => {
    event.preventDefault();
    try {
        const url = await shortenUrl(longUrl);
         setShortenedUrl(url);
         setLongUrl("")
        }catch (error) {
        console.error('Error shortening URL:', error);
        }
    }
   const copyToClipBoard = (shortenedUrl) => {
    navigator.clipboard.writeText(shortenedUrl)
        .then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000)
        })
   } 

  const shortenUrl = async ( longUrl ) => {
    const url = 'https://spoo.me/';

    const data = new URLSearchParams();
    data.append('url', longUrl);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept', 'application/json');
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response.short_url);
                setShortenedUrl(response.short_url);
                
            } else {
                console.error(`HTTP error! Status: ${xhr.status}`);
            }
        }
    return xhr.responseText
    };
    
    xhr.send(data);
    

     
    }

   

  return (
    <>
    <div className="flex justify-center items-center  flex-col">
         {/* Search */}
        <h1 className="font-sans text-6xl protest-riot tracking-wide pb-10 text-zinc-200 mt-32">URL Shortener</h1>
        <form className="w-full ">   
            <label htmlFor="search" className="mb-2 text-sm font-medium text-zinc-800 sr-only dark:text-white"></label>
            <div className="relative">
                <div className="absolute inset-y-0 start-1/4 flex items-center ps-3 pointer-events-none">
                    {/* <svg className="w-6 h-6 text-zinc-800 dark:text-zinc-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg> */}
                    <FaLink className="size-9 text-zinc-800"/>

                </div>
                <input type="search" id="search" className="block mx-auto w-1/2 p-4 ps-14 text-lg text-gray-900 border border-gray-300 rounded-lg bg-zinc-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Shorten a link here..." required onChange={handleChange} value={longUrl}/>
                <button type="submit" className="text-base text-zinc-200 mr-4 absolute end-1/4 bottom-2 bg-zinc-800 hover:bg-zinc-200 hover:text-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-500 font-medium rounded-lg px-7 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>Shorten it</button>
            </div>
        </form>


    {/* input */}
    <div id="toast-undo" className="flex items-center w-1/2 my-5  p-4 text-zinc-100 bg-zinc-700 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div className="text-xl font-normal">
            {shortenedUrl}        
        </div>
        <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
            <button className="text-lg font-medium text-zinc-200 bg-zinc-800 px-4 py-2 hover:bg-zinc-200 hover:text-zinc-800 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700" href="#" 
            onClick={() => copyToClipBoard(shortenedUrl)}>{isCopied ? 'Copied' : 'Copy'}</button>
            {/* <button type="button"
             className="ms-auto -mx-1.5 -my-1.5 bg-zinc-100 text-zinc-800 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-undo" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button> */}
        </div>
    </div>

    </div>
    </>
  )
}

export default UrlSearch
