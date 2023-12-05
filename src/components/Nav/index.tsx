import React, { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import bscLogo from "../../assets/icons/bsc.png";
import "./Navigation.scss";

import MenuIcon from "../../assets/icons/menu.svg";
import { useChainId } from "wagmi";
import Close from "../../assets/icons/close.svg";

import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import Loogo from "../../assets/images/patrick-logo.png";

import styled from "styled-components";

const Button = styled.button`
  background-color: #0a090256;
  color: #ffba00;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  transform: translateY(0px); /* Reset the translateY */
  transition: transform 0.2s, box-shadow 0.2s; /* Add smooth transition effects */

  &:hover {
    transform: translateY(-2px); /* Move the button up slightly on hover */
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3); /* Increase the box shadow on hover for a more pronounced 3D effect */
  }
`;

const lists = [
  {
    label: "",
    leftIcon: bscLogo,
    chainId: 80001,
  },
];

const Navigation: React.FC = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const [openClose, setOpenClose] = useState(false);
  const [openCloses, setOpenCloses] = useState(false);
  const { open } = useWeb3Modal();
  const chain = useChainId();
  const [activeLink, setActiveLink] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState("Testnet"); // Initially selected option

  // Get the current location using useLocation hook

  const [isOpen, setIsOpen] = useState(false);

  const [selectedList, setSelectedList] = useState<{
    label: string;
    leftIcon?: string;
    chainId: number;
  } | null>({
    label: "",
    leftIcon: bscLogo,
    chainId: 80001,
  });

  useEffect(() => {
    setSelectedList(lists.find((f) => f.chainId === chain) ?? null);
  }, [chain]);

  useEffect(() => {
    // Get the current URL pathname
    const currentUrlPathname = window.location.pathname;

    // Set the active link based on the current URL pathname
    setActiveLink(currentUrlPathname);
  }, []);

  useEffect(() => {
    if (openClose) {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflowY = "initial";
      document.body.style.height = "initial";
    }
  }, [openClose]);

  useEffect(() => {
    if (isDarkMode) {
      if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
      }
      document.body.classList.add("dark");
    } else {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
      }
      document.body.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div className="navigation-wrapper">
      <div className="mx">
        <div className="desktophead">
          <div>
            <img src={Loogo} className="logoo" style={{ borderRadius: "50%" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <nav className="site-navigation">
              <ul
                className="nav"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <li>
                  <NavLink to="/">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/tokens">Tokens</NavLink>
                </li>

                {/* // <li>
                //   <Link
                //     to="/create-token"
                //     className={`navlink ${location.pathname === "/create-token" ? "active" : ""}`}
                //   >
                //     Create Token
                //   </Link>
                // </li> */}

                <li>
                  <div className="web3-btn">
                    <Web3Button />
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mobilehead">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              src={Loogo}
              className="logoo"
              style={{ width: 70, maxHeight: 70, borderRadius: "50%" }}
            />
          </div>
          <div className="web3-btn">
            <Web3Button />
          </div>
          <div>
            <div className="circlebg newmwnu" onClick={() => setOpenClose((m) => !m)}>
              <img src={MenuIcon} alt="" />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openClose && (
            <motion.div
              className="sidebar-backdrop"
              onClick={() => setOpenClose(false)}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <motion.div
                className="bar"
                onClick={(e: any) => e.stopPropagation()}
                animate={{ right: 0, transitionDelay: "-200ms" }}
                exit={{ right: -300 }}
                initial={{ right: -300 }}
              >
                <div className="header-side-bar">
                  <div className="close-icon" onClick={() => setOpenClose(false)}>
                    <img src={Close} alt="" />
                  </div>

                  <div style={{ flex: 1 }}>
                    <nav>
                      <NavLink
                        to="/"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Create Token</span>
                      </NavLink>
                      {/* <NavLink
                        to="/create-token"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Create Token</span>
                      </NavLink> */}
                      <NavLink
                        to="/swap"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Swap</span>
                      </NavLink>
                      <NavLink
                        to="/staking"
                        className="list flex-item"
                        onClick={() => setOpenClose(false)}
                      >
                        <span>Staking</span>
                      </NavLink>
                    </nav>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navigation;
