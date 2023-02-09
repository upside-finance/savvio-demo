import React from "react";

import { IconContext } from "react-icons";
import { IoHome, IoWallet, IoInformationCircle } from "react-icons/io5";
import { HiCode } from "react-icons/hi";
import { FaSwimmingPool, FaTrophy } from "react-icons/fa";

export default function Portfolio() {
  return (
    <>
      <div className="text-left text-green my-5 p-5 w-64">
        <div className="sidebar-item">
          <IconContext.Provider
            value={{ size: "1.3rem", className: "icon-context-sidebar" }}
          >
            <div>
              <IoHome />
            </div>
          </IconContext.Provider>
          Portfolio
        </div>
        <div className="sidebar-item">
          <IconContext.Provider
            value={{ size: "1.3rem", className: "icon-context-sidebar" }}
          >
            <div>
              <IoWallet />
            </div>
          </IconContext.Provider>
          Smart Savings
        </div>
        <div className="sidebar-item">
          <IconContext.Provider
            value={{ size: "1.3rem", className: "icon-context-sidebar" }}
          >
            <div>
              <FaSwimmingPool />
            </div>
          </IconContext.Provider>
          Liquidity
        </div>
        <div className="sidebar-item">
          <IconContext.Provider
            value={{ size: "1.3rem", className: "icon-context-sidebar" }}
          >
            <div>
              <FaTrophy />
            </div>
          </IconContext.Provider>
          Rewards
        </div>
        <div className="sidebar-item">
          <IconContext.Provider
            value={{ size: "1.3rem", className: "icon-context-sidebar" }}
          >
            <div>
              <HiCode />
            </div>
          </IconContext.Provider>
          Developers
        </div>
        <div className="sidebar-item">
          <IconContext.Provider
            value={{ size: "1.3rem", className: "icon-context-sidebar" }}
          >
            <div>
              <IoInformationCircle />
            </div>
          </IconContext.Provider>
          Help
        </div>
      </div>
    </>
  );
}
