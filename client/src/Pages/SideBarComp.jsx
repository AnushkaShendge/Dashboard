import Sidebar, { SidebarItem } from "./Sidebar";
import { FaHome } from "react-icons/fa";
import { IoSettings, IoDocumentText } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoMdHelp } from "react-icons/io";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { FaFileVideo } from "react-icons/fa";

function SideBarComp({ sidebarOpen, toggleSidebar }) {
    return (
        <div className="flex">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}>
                <SidebarItem icon={<FaHome size={25} className="rounded-md p-1 text-blue-600 my-1" />} text="Home" to="/dashboard" active />
                <SidebarItem icon={<LiaUserFriendsSolid size={20} className="rounded-md text-blue-600 my-1" />} text="Records" to="/connect" alert />
                <SidebarItem icon={<IoDocumentText size={20} className="rounded-md text-blue-600 my-1" />} text="Test Series" to="/test" />
                <SidebarItem icon={<FaFileVideo size={20} className="rounded-md text-blue-600 my-1" />} text="Resources" to="/resource" />
                <SidebarItem icon={<FaFilePdf size={20} className="rounded-md text-blue-600 my-1" />} text="Chat-pdf" to="/dashboard/pdf" />
                <hr className="my-3" />
                <SidebarItem icon={<IoSettings size={20} />} text="Settings" to="/dashboard/settings" />
                <SidebarItem icon={<IoMdHelp size={20} />} text="Help" to="/dashboard/help" />
            </Sidebar>
        </div>
    );
}

export default SideBarComp;
