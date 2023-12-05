import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { configureChains, createConfig, sepolia } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";

export const walletConnectProjectId = "4af4492230df1c074def2de12bdbbb0a";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [w3mProvider({ projectId: walletConnectProjectId })]
);

export const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    chains,
    projectId: walletConnectProjectId,
    version: 2,
  }),
  publicClient,
  webSocketPublicClient,
});

export { chains };
