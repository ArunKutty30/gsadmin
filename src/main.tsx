import { EthereumClient } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import "./index.scss";
import App from "./App";
import { chains, config, walletConnectProjectId } from "./wagmi";
import { BrowserRouter } from "react-router-dom";

const ethereumClient = new EthereumClient(config, chains);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={config}>
        <App />
        <Web3Modal projectId={walletConnectProjectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
