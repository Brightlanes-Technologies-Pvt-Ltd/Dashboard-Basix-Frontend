import { MdSpaceDashboard } from "react-icons/md";
import { BsCurrencyRupee } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import { FiActivity } from "react-icons/fi";

const Menus = [
  {
    title: "Personal",
    icon: <MdSpaceDashboard />,
  },
  { title: "Transactions", icon: <BsCurrencyRupee /> },
  { title: "Documents", icon: <FcDocument /> },
  { title: "Activity", icon: <FiActivity /> },
];

export default Menus;
