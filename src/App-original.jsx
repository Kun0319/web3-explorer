import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { ConnectKitProvider, ConnectKitButton } from "connectkit";
import './App.css';

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
        <ConnectKitProvider>
            <div className="App">
                <header className="App-header">
                    <ConnectKitButton />
                </header>
            </div>
        </ConnectKitProvider>
    </WagmiProvider>
  );
}

export default App;