import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const Home = () => {

  const [title,setTitle] = useState('');
  const [value,setValue]= useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state)=> state.paste.pastes);

  useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
    }, [pasteId])


  //dispatch to send the data to slice
  const dispatch = useDispatch();
  function createPaste(){
    const paste = {
      title: title,
      content : value,
      _id : pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    

    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{ 
      //create
      dispatch(addToPastes(paste));
    }

    //after creation and updation , clean title and text box
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input 
      className='p-2  rounded-xl bg-[#00667e] mt-2 w-[60%] text-[white] pl-4'
      type="text"
      placeholder='Enter title here'
      value={title}
      onChange={(e) =>setTitle(e.target.value) }
      />

      {/* if paste id exists means update the paste else create the paste */}
      <button className='p-2 rounded-xl bg-[#363535] text-white font-medium mt-2' onClick={createPaste}>
        {
          pasteId ? "Update My paste" : "Create My Paste"
        }
      </button>
    </div>
    <div className="mt-8 bg-[#383a43] rounded-2xl"> 
      <textarea
      className='rounded-2xl w-full p-5 pt-4 bg-[#363535] text-white'
      value={value}
      placeholder='enter content here...'
      onChange={(e)=>setValue(e.target.value)}
      rows={20}></textarea>
    </div>
    </div>
  )
}

export default Home
