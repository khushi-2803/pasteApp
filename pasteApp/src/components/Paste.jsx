import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { Eye, FilePenLine, Trash, CalendarDays, ExternalLink, Copy } from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="">
      <input
        className="p-2 rounded-2xl w-full border "
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5 border border-[#ccc] p-5 rounded-xl">
        <h2 className="text-[28px] font-semibold">All Pastes</h2>
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className=" rounded-2xl p-5  bg-[#00667e]">
                
                <div className="flex md:flex-row flex-col place-content-between items-center">
                  <div
                    className=" text-[25px] md:text-[40px] text-center md:text-left font-semibold uppercase text-[white]
">
                    {paste.title}
                  </div>
                  <div className="flex flex-row gap-2 place-content-evenly flex-wrap mt-2 lg:mt-0">
                    <button className="bg-[#353535] rounded-xl p-2">
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        <FilePenLine className="text-rose-100 " />
                      </NavLink>
                    </button>

                    <button className="bg-[#353535] rounded-xl p-2">
                      <NavLink to={`/pastes/${paste?._id}`}>
                        <Eye className="text-rose-100" />
                      </NavLink>
                    </button>
                    <button className="bg-[#353535] rounded-xl p-2" onClick={() => handleDelete(paste?._id)}>
                      <Trash className="text-rose-100" />
                    </button>
                    <button className="bg-[#353535] rounded-xl p-2"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);

                        toast.success("copied to clipboard");
                      }}
                    >
                      <Copy className="text-rose-100" />
                    </button>

                    <button className="bg-[#353535] rounded-xl p-2"
                      onClick={() => {
                        const link = `${window.location.origin}/pastes/${paste?._id}`;
                        navigator.clipboard.writeText(link);
                        toast.success("Link copied successfully!");
                      }}
                    >
                      <ExternalLink className="text-rose-100" />
                    </button>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col place-content-between items-center mt-4">
                        <div className="text-[18px] md:text-left text-center mt-3 mb-3 md:mt-0 md-mb-0 text-stone-800 font-medium w-[80%]">{paste.content}</div>

                <div className="rounded-xl bg-[white] p-2 text-[#353535] flex flex-row">
                  <CalendarDays className="me-1" />
                      {format(new Date(paste.createdAt), "dd MMM yyyy")}
                
                  </div>
                </div>
              
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
