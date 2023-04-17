import { MdSpaceDashboard } from "react-icons/md";
import { BsCurrencyRupee } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import { FiActivity } from "react-icons/fi";
import { BiTachometer } from "react-icons/bi";

const Menus = [
  {
    title: "Home",
    icon: <BiTachometer />,
    path: "/homepage",
  },
  {
    title: "Personal",
    icon: <MdSpaceDashboard />,
    path: "/personal",
  },
  { title: "Transactions", icon: <BsCurrencyRupee />, path: "/transactions" },
  { title: "Documents", icon: <FcDocument />, path: "/documents" },
  { title: "Activity", icon: <FiActivity />, path: "/activity" },
];

export default Menus;
