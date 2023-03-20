import React from "react";

import OldNftModule from "./oldNftModule";
import { HiUserCircle } from "react-icons/hi2";

const portfolio = {
  totalBalance: 949103,
  deposits: {
    total: 40311,
  },
};

export default function Portfolio() {
  return (
    <>
      <section className="section gradient-border z-10 relative max-w-screen-xl rounded-xl my-10 mx-2 md:mx-auto shadow-small">
        <div className="flex flex-col lg:flex-row mx-12 my-6 justify-between">
          <HiUserCircle className="w-20 h-20 lg:w-36 lg:h-36 mx-auto my-5 lg:m-0 fill-green-aqua stroke-green-aqua hover:filter-none" />
          <div className="flex flex-col items-center lg:flex-row gap-8 lg:gap-16">
            <div>
              <p className="text-2xl text-green-aqua">Total Balance</p>
              <p className="text-4xl lg:text-6xl text-gray">
                ${" "}
                {portfolio.totalBalance != null
                  ? Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 2,
                    }).format(portfolio.totalBalance)
                  : "-"}{" "}
              </p>
            </div>
            <div>
              <p className="text-2xl text-green-aqua">Deposits</p>
              <p className="text-4xl lg:text-6xl text-gray">
                ${" "}
                {portfolio.totalBalance != null
                  ? Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 2,
                    }).format(portfolio.deposits.total)
                  : "-"}{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="mx-5 md:mx-16 my-10 ">
          <div className="mb-20">
            <h2 className="md:ml-5 text-green-aqua text-3xl">
              Participated Draws
            </h2>
            <p className="md:ml-5 md:my-5 text-2xl">
              View all your recent draws,{" "}
              <span className="italic text-green-aqua font-semibold">
                check if you’re a winner,
              </span>{" "}
              and withdraw with ease below.
            </p>
          </div>

          <OldNftModule />
        </div>
      </section>
    </>
  );
}
