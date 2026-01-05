// import { useRef, useEffect } from "react";

// const ActionDropdown = ({
//   actions = [],
//   className = "",
//   children = null,
//   open = false,
//   onOpenChange = () => {},
// }) => {
//   const ref = useRef();

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) onOpenChange(false);
//     };
//     if (open) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [open]);

//   return (
//     <div className={`relative ${className}`} ref={ref}>
//       {children}
//       {open && (
//         <ul className="absolute right-0 top-full mt-1 bg-white border border-accent/20 rounded-lg shadow-lg z-50 text-base min-w-[200px] py-2">
//           {actions.map((action) => (
//             <li
//               key={action.label}
//               onClick={() => {
//                 action.onClick();
//                 onOpenChange(false);
//               }}
//               className="flex items-center gap-3 px-4 py-3 text-accent hover:bg-accent/5 cursor-pointer"
//             >
//               {action.icon && (
//                 <span className="w-5 h-5 flex items-center justify-center text-accent">
//                   {action.icon}
//                 </span>
//               )}
//               <span>{action.label}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ActionDropdown;

import { useRef, useEffect } from "react";

const ActionDropdown = ({
  actions = [],
  className = "",
  children,
  open = false,
  onOpenChange = () => {},
}) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOpenChange(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  return (
    <div className={`relative ${className}`} ref={ref}>
      {/* Use children as trigger */}
      {children}
      {open && (
        <ul className="absolute right-0 top-full mt-1 bg-white border border-accent/20 rounded-lg shadow-lg !z-50 min-w-[150px] py-2">
          {actions.map((action) => (
            <li
              key={action.label}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
                onOpenChange(false);
              }}
              className="flex text-sm items-center gap-3 px-4 py-2 text-accent hover:bg-accent/5 cursor-pointer"
            >
              {action.icon && (
                <span className="w-5 h-5 flex items-center justify-center text-accent">
                  {action.icon}
                </span>
              )}
              <span className="text-nowrap">{action.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActionDropdown;
