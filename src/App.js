import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import { ReactComponent as Savvio } from "./assets/savvio.svg";

import EthCoin from "./assets/eth-coin.svg";
import SavCoin from "./assets/sav-coin.svg";
import AptCoin from "./assets/aptos-coin.svg";

import "./App.css";
import "./input.css";
import NftModule from "./components/nftDisplayModule";
import Navbar from "./components/navbar";
import NavbarItems from "./components/navbarItems";
import WinnerHistory from "./components/winnerHistory";
import TicketsModule from "./components/ticketsModule";
import CheckWinnerModule from "./components/checkWinnerModule";
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from "react-parallax-mouse";

function App() {
  const [menuVis, setMenuVis] = useState(false);
  const [ticModVis, setTicModVis] = useState(false);
  const [checkModVis, setCheckModVis] = useState(false);

  var menuClass = menuVis
    ? "z-10 fixed  ease-in-out duration-300 translate-x-0 opacity-100 w-full h-full bg-neutral-900  "
    : "z-10 fixed  ease-in-out duration-300 -translate-x-full opacity-0 w-full h-full bg-neutral-900 ";
  return (
    <div className="App overflow-hidden text-left md:text-center bg-[url('./assets/background-gradient.svg')] bg-cover pb-56 ">
      <header className="bg-[#257df0]/50 backdrop-blur-lg z-10 top-0 md:h-24 ">
        <Navbar toggleMenuVis={setMenuVis} />

        <div className={menuClass}>
          <IconContext.Provider
            value={{
              className: "ml-auto mr-5 h-20 text-lemon text-2xl svg-lemon",
            }}
          >
            <div onClick={() => setMenuVis(false)}>
              <IoClose />
            </div>
          </IconContext.Provider>
          <NavbarItems />
        </div>
      </header>
      <section>
        <TicketsModule open={ticModVis} onClose={() => setTicModVis(false)} />
        <CheckWinnerModule
          open={checkModVis}
          onClose={() => setCheckModVis(false)}
        />
        <div className="p-5 mt-12">
          <h1 className="text-6xl md:text-8xl">
            Self Owned, Self Managed
            <br />
            <span className="font-bold">Savings & Rewards Protocol</span>
          </h1>
          <p className="my-7 md:mx-32 text-3xl ">
            Take complete ownership of your own Web3 savings account. Create,
            deposit & withdraw incredible savings returns + bonus rewards
            anytime.
          </p>
        </div>
        <p className="px-4 md:px-0 text-white font-semibold text-3xl my-7 drop-shadow">
          Aptos NFTs
        </p>
        <NftModule />
        <div className="flex relative z-10 justify-between h-2 mx-10 top-40 md:top-0">
          <MouseParallaxContainer
            globalFactorX={0.1}
            globalFactorY={0.1}
            resetOnLeave
            containerStyle={{ overflow: "visible", scale: "2" }}
            className="px-10 md:h-5"
          >
            <MouseParallaxChild
              factorX={0.7}
              factorY={0.8}
              className="h-12 md:h-24 w-12 md:w-24 "
            >
              <img src={AptCoin} alt="" className="w-full h-full -rotate-90" />
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.5}
              factorY={0.5}
              className="relative bottom-10 left-20 h-16 md:h-32 w-16 md:w-32 -rotate-45 "
            >
              <img src={EthCoin} alt="" className="w-full h-full -rotate-90" />
            </MouseParallaxChild>
            <MouseParallaxChild
              factorX={0.5}
              factorY={0.4}
              className="relative bottom-32 left-2 h-16 md:h-32 w-14 md:w-28 "
            >
              <img src={SavCoin} alt="" className="w-full h-full" />
            </MouseParallaxChild>
          </MouseParallaxContainer>

          <MouseParallaxContainer
            globalFactorX={0.1}
            globalFactorY={0.1}
            resetOnLeave
            containerStyle={{ overflow: "visible", scale: "2" }}
            className="px-10 md:h-5"
          >
            <MouseParallaxChild
              factorX={0.7}
              factorY={0.8}
              className="relative bottom-12 -left-10 h-12 md:h-24 w-12 md:w-24"
            >
              <img src={AptCoin} alt="" className="w-full h-full rotate-45" />
            </MouseParallaxChild>

            <MouseParallaxChild
              factorX={0.5}
              factorY={0.5}
              className="relative bottom-10 left-30 h-16 md:h-32 w-16 md:w-32 -rotate-45 "
            >
              <img src={EthCoin} alt="" className="w-full h-full -rotate-45" />
            </MouseParallaxChild>
            <MouseParallaxChild
              factorX={0.5}
              factorY={0.4}
              className="relative -left-28 bottom-48 left-2 h-16 md:h-32 w-14 md:w-28 "
            >
              <img src={SavCoin} alt="" className="w-full h-full" />
            </MouseParallaxChild>
          </MouseParallaxContainer>
        </div>
        <div className="relative z-20 text-center mt-24">
          <div
            onClick={() => setTicModVis(true)}
            className="w-max-xs md:w-80 mx-5 md:mx-auto my-4 px-5 py-2 uppercase text-2xl bg-blue-dark/80 border border-blue hover:border-slate-900 rounded text-blue hover:text-slate-900 items-center hover:shadow-blue hover:cursor-pointer hover:bg-blue/10 transition-all"
          >
            Enter Now
          </div>
          <div
            onClick={() => setCheckModVis(true)}
            className="w-max-xs md:w-80 mx-5 md:mx-auto my-4 px-5 py-2 uppercase text-2xl bg-blue-dark/80  border border-lemon hover:border-slate-900 rounded text-lemon hover:text-slate-900 items-center hover:shadow-lemon hover:cursor-pointer hover:bg-lemon/10 transition-all"
          >
            Am I a winner?
          </div>
        </div>
      </section>
      <section className="mx-5 xl:mx-48 mt-36">
        <h2 className="relative z-30 text-2xl text-lemon font-bold text-left drop-shadow">
          Winner History
        </h2>
        <WinnerHistory />
      </section>
      <section>
        <div>
          <Savvio className="h-24 mt-14 mb-10 m-auto fill-slate-900" />
          <p className="mx-auto text-center text-slate-800 max-w-md">
            We're bringing together esports teams, fans and{" "}
            <span className="text-[#257df0] font-bold">
              crypto natives to move esports
            </span>{" "}
            forward.
          </p>
        </div>
        <div className="w-max-xs md:w-80 mx-5 md:mx-auto mt-8 px-5 py-2 text-lg text-center bg-blue-dark/80 border border-blue hover:border-slate-900 rounded text-blue hover:text-slate-900 items-center hover:shadow-blue hover:cursor-pointer hover:bg-blue/10 transition-all">
          Explore Marketplace
        </div>
      </section>
    </div>
  );
}

export default App;
