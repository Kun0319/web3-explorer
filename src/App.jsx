import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, ConnectKitButton } from "connectkit";
import { 
  useAccount, 
  useBalance, 
  useBlockNumber
} from 'wagmi';
import './App.css';

const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function WalletInfo() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const { data: blockNumber } = useBlockNumber();

  if (!isConnected) {
    return (
      <div style={{ margin: '20px 0' }}>
        <p>👆 請先連接您的錢包來開始Web3之旅！</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '20px 0', textAlign: 'left', maxWidth: '600px' }}>
      <h3>📊 錢包資訊</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
        <strong>地址:</strong> <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{address}</span>
        <strong>網路:</strong> <span>{chain?.name}</span>
        <strong>餘額:</strong> <span>{balance?.formatted} {balance?.symbol}</span>
        <strong>當前區塊:</strong> <span>{blockNumber?.toString()}</span>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h4>🎓 學習提示：</h4>
        <ul style={{ textAlign: 'left' }}>
          <li>地址是您的錢包公開標識符</li>
          <li>切換到 Sepolia 測試網來免費練習</li>
          <li>區塊號碼會持續增長，每個區塊約15秒</li>
          <li>餘額會即時更新</li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <div className="App">
            <header className="App-header">
              <h1>🚀 Web3 學習實驗室</h1>
              <p>從這裡開始您的Web3開發之旅</p>
              
              <ConnectKitButton />
              
              <WalletInfo />
              
              <div style={{ marginTop: '30px', fontSize: '14px', opacity: 0.8 }}>
                <p>💡 下一步學習目標：</p>
                <p>1. 學習 Solidity 智能合約語言</p>
                <p>2. 嘗試與智能合約互動</p>
                <p>3. 創建您的第一個DApp</p>
              </div>
            </header>
          </div>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;