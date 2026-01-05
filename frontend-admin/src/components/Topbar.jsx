import { useMemo, useState } from "react";
import ActionDropdown from "./ActionDropdown";
import ProfileIcon from "./svgs/ProfileIcon";
import { ROUTES } from "../routes/helper";
import useNavigateTo from "../hooks/useNavigateTo";
import { useDispatch } from "react-redux";
import { resetApiStateFromUser } from "../slices/usersSlice";

const Topbar = () => {
  const goTo = useNavigateTo();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken");
      dispatch(resetApiStateFromUser("verifyAuthApi"));
    } catch (_e) {
      console.warn("Logout API error", _e);
    } finally {
      goTo(ROUTES.AUTH);
    }
  };

  const options = useMemo(() => {
    const actions = [
      {
        label: "View Profile",
        onClick: () => { },
      },
    ];

    actions.push({
      label: "Logout",
      onClick: handleLogout,
    });

    return actions;
  }, []);

  return (
    <div className="sticky text-primary top-0 z-[39] px-4 py-2  w-full bg-background justify-between rounded-lg border-b  border border-accent/50 flex items-center">
      <p className="font-medium text-xs lg:text-sm"></p>
      <div className="flex items-center gap-3">
        <span className="font-medium text-xs lg:text-sm">
          {"Hello, Super Admin"}
        </span>
        <div className="cursor-pointer rounded-md p-1">
          <ActionDropdown
            actions={options}
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            className="flex items-center"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((open) => !open);
              }}
              className="cursor-pointer"
            >
              <ProfileIcon variant="dark" />
            </button>
          </ActionDropdown>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
