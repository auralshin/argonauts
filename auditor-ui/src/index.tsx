import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import GlobalContextProvider, { useGlobalContext } from "./context/index";
const { chains, provider } = configureChains(
  [chain.hardhat],
  [infuraProvider({ apiKey: process.env.REACT_INFURA || "" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GlobalContextProvider>
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
  </GlobalContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
