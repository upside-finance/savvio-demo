import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
const tokenList = [
  {
    name: "apt",
    walletAmt: 251.24,
  },
];

export default function NavbarItems() {
  const [valueVisibility, setValueVisibility] = useState(false);

  return (
    <div className="uppercase font-bold flex">
      <button onClick={() => setValueVisibility(!valueVisibility)}>
        <IconContext.Provider
          value={{
            className: "text-dark-grey md:text-green-aqua svg-green-aqua mx-2",
            size: "1.5rem",
          }}
        >
          {valueVisibility ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </IconContext.Provider>
      </button>
      {tokenList.map((token) => (
        <>
          <div className="text-gray">
            {valueVisibility ? token.walletAmt : "***"}
          </div>
          <div className="text-gray md:text-green-aqua">&nbsp;{token.name}</div>
        </>
      ))}
    </div>
  );
}
