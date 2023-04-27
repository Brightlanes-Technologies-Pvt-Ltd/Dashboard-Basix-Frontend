import { CgProfile } from "react-icons/cg";
import { BsCurrencyRupee, BsFolder2 } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";

const Menus = [
  {
    title: "Home",
    icon: <AiOutlineHome />,
    path: "/homepage",
  },
  { title: "My classes", icon: <SiGoogleclassroom />, path: "/activity" },

  {
    title: "Personal",
    icon: <CgProfile />,
    path: "/personal",
  },
  { title: "Transactions", icon: <BsCurrencyRupee />, path: "/transactions" },
  { title: "Documents", icon: <BsFolder2 />, path: "/documents" },
  { title: "adminsidebar", icon: <FcDocument />, path: "/adminsidebar" },
];

export default Menus;
