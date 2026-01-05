import SliderButton from "./SliderButton";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarIcon from "../svgs/SidebarIcon";
import Logo from "../../assets/logo.png";

const Sidebar = ({ data, isCollapsed, handleToggle }) => {
  // const n = data?.length - 1 === 0 ? 1 : data?.length - 1;
  const location = useLocation();
  const activeTab = data.find((tab) => {
    const pathKey = location.pathname.split("/")[1];
    // const subModule = location.pathname.split("/")[2];
    // console.log({ subModule });
    // console.log({ pathKey });
    return [...(tab?.children || [])].includes(pathKey);
  });

  // console.log({ activeTab });

  const [active, setActive] = useState(null);

  // console.log({ active });

  const navigate = useNavigate();

  const navigateSidebar = (to, id, onClick) => {
    if (to) {
      navigate(to);
      setActive(id);
    }
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (activeTab?.id) {
      setActive(activeTab?.id);
    }
  }, [activeTab?.id]);

  return (
    <div
      className={`bg-warning/50 z-50 text-xs lg:text-sm h-[100vh] bg-accent overflow-y-scroll scrollbar-hide transition-all duration-300
        ${
          isCollapsed
            ? "w-[60px] lg:w-[90px] items-center"
            : "w-[170px] lg:w-[240px]"
        }
      `}
    >
      <div
        className={`flex gap-2 items-center p-4 justify-end w-full border-b border-accent/50 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        {!isCollapsed && (
          <img
            src={Logo}
            alt="logo"
            className="h-[35px] lg:h-[46px] min-w-auto m-auto"
          />
        )}
        <span
          className="cursor-pointer p-2 bg-accent rounded-xl"
          onClick={handleToggle}
        >
          <SidebarIcon />
        </span>
      </div>

      <>
        <div className="flex flex-col p-2 lg:p-4 gap-2">
          {data.map((item) => (
            <SliderButton
              key={item.id}
              {...item}
              isActive={active}
              navigateSidebar={navigateSidebar}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
        {/* <div className="sticky left-5 right-5 top-full flex flex-col gap-2 p-2 lg:p-4">
          {data.slice(n).map((item) => (
            <SliderButton
              key={item.id}
              {...item}
              isActive={active}
              navigateSidebar={navigateSidebar}
              isCollapsed={isCollapsed}
            />
          ))}
        </div> */}
      </>
    </div>
  );
};

export default Sidebar;
