import { BiBookAlt } from "react-icons/bi";
import { BsFolder2, BsFolderPlus } from "react-icons/bs";

import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";

const AdminMenus = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/homepage",
  },
  { title: "Classes", icon: <SiGoogleclassroom />, path: "/activity" },

  {
    title: "Courses",
    icon: <BiBookAlt />,
    path: "/personal",
  },
  { title: "Projects", icon: <BsFolderPlus />, path: "/transactions" },
  { title: "Documents", icon: <BsFolder2 />, path: "/documents" },
];

export default AdminMenus;
