import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { useContract } from './hooks/useContract';
import { Button } from 'semantic-ui-react';
import { ethers } from 'ethers';
import useWallet from 'use-wallet';
import Body from './pages/body';
import { toast } from 'react-toastify';
import Footer from './components/Footer';


toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
})

function App() {

  const { getBullTycoonsFactoryContract } = useContract();
  const { account } = useWallet();

  const mintNFT = async () => {
    try {
      const bullTycoonsFactory = getBullTycoonsFactoryContract();
      const response = await bullTycoonsFactory.mint(0, account);
      console.log(response, "<== Response");
    } catch (err) {
      console.log(err, "<== Error");
    }
  }

  return (
    <div className="App">
      <Header id="header" />
      {/* <Button onClick={mintNFT}>Mint</Button> */}
      <Body style={{minHeight:'75vh'}} />
      <Footer />
    </div>
  );
}

export default App;
