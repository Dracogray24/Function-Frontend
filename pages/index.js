import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;
  let Ethval;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const resetRows = () => {
    // Reset all rows to default
    const rows = [
      '#firstrow1', '#firstrow2', '#firstrow3',
      '#secondrow4', '#secondrow5', '#secondrow6',
      '#thirdrow7', '#thirdrow8', '#thirdrow9'
    ];
  
    rows.forEach((row, index) => {
      document.querySelector(row).style.background = 'white';
      document.querySelector(row).value = index + 1;  
    });
  };

  const Deposit = async () => {
    const randomInt = getRandomInt(1, 9);
    let luckynumber;
    let Ethval;
    resetRows();
    if (randomInt === 1) {
        luckynumber = 1;
        Ethval = 100;
        document.querySelector('#firstrow1').style.background = 'green';
        document.querySelector('#firstrow1').value = 100;
    } else if (randomInt === 2) {
        luckynumber = 2;
        Ethval = 200;
        document.querySelector('#firstrow2').style.background = 'green';
        document.querySelector('#firstrow2').value = 200;
    } else if (randomInt === 3) {
        luckynumber = 3;
        Ethval = 300;
        document.querySelector('#firstrow3').style.background = 'green';
        document.querySelector('#firstrow3').value = 300;
    } else if (randomInt === 4) {
        luckynumber = 4;
        Ethval = 400;
        document.querySelector('#secondrow4').style.background = 'green';
        document.querySelector('#secondrow4').value = 400;
    } else if (randomInt === 5) {
        luckynumber = 5;
        Ethval = 500;
        document.querySelector('#secondrow5').style.background = 'green';
        document.querySelector('#secondrow5').value = 500;
    } else if (randomInt === 6) {
        luckynumber = 6;
        Ethval = 600;
        document.querySelector('#secondrow6').style.background = 'green';
        document.querySelector('#secondrow6').value = 600;
    } else if (randomInt === 7) {
        luckynumber = 7;
        Ethval = 700;
        document.querySelector('#thirdrow7').style.background = 'green';
        document.querySelector('#thirdrow7').value = 700;
    } else if (randomInt === 8) {
        luckynumber = 8;
        Ethval = 800;
        document.querySelector('#thirdrow8').style.background = 'green';
        document.querySelector('#thirdrow8').value = 800;
    } else if (randomInt === 9) {
        luckynumber = 9;
        Ethval = 999;
        document.querySelector('#thirdrow9').style.background = 'green';
        document.querySelector('#thirdrow9').value = 999;
    }

    document.querySelector('#numbertext').textContent = luckynumber;

    if (typeof atm?.deposit === 'function') {
      try {
          let tx = await atm.deposit(Ethval); 
          await tx.wait(); 
          getBalance(); 
      } catch (error) {
          console.error("Transaction failed:", error); 
      }
  } else {
      console.error("ATM deposit function is not available."); 
  }
  return { randomInt, luckynumber, Ethval }; 
  }

  const withdraw = async() => {
    const randomInt = getRandomInt(1, 9);
    let luckynumber;
    let Ethval;
    resetRows();
    if (randomInt === 1) {
        luckynumber = 1;
        Ethval = 100;
        document.querySelector('#firstrow1').style.background = 'red';
        document.querySelector('#firstrow1').value = 100;
    } else if (randomInt === 2) {
        luckynumber = 2;
        Ethval = 200;
        document.querySelector('#firstrow2').style.background = 'red';
        document.querySelector('#firstrow2').value = 200;
    } else if (randomInt === 3) {
        luckynumber = 3;
        Ethval = 300;
        document.querySelector('#firstrow3').style.background = 'red';
        document.querySelector('#firstrow3').value = 300;
    } else if (randomInt === 4) {
        luckynumber = 4;
        Ethval = 400;
        document.querySelector('#secondrow4').style.background = 'red';
        document.querySelector('#secondrow4').value = 400;
    } else if (randomInt === 5) {
        luckynumber = 5;
        Ethval = 500;
        document.querySelector('#secondrow5').style.background = 'red';
        document.querySelector('#secondrow5').value = 500;
    } else if (randomInt === 6) {
        luckynumber = 6;
        Ethval = 600;
        document.querySelector('#secondrow6').style.background = 'red';
        document.querySelector('#secondrow6').value = 600;
    } else if (randomInt === 7) {
        luckynumber = 7;
        Ethval = 700;
        document.querySelector('#thirdrow7').style.background = 'red';
        document.querySelector('#thirdrow7').value = 700;
    } else if (randomInt === 8) {
        luckynumber = 8;
        Ethval = 800;
        document.querySelector('#thirdrow8').style.background = 'red';
        document.querySelector('#thirdrow8').value = 800;
    } else if (randomInt === 9) {
        luckynumber = 9;
        Ethval = 999;
        document.querySelector('#thirdrow9').style.background = 'red';
        document.querySelector('#thirdrow9').value = 999;
    }
 
 document.querySelector('#numbertext').textContent = luckynumber;

 if (atm) {
    try {
        const tx = await atm.withdraw(Ethval);
        await tx.wait(); 
        getBalance(); 
    } catch (error) {
        console.error("Error during withdrawal:", error); 
    }
}

 return { randomInt, luckynumber, Ethval };
};

const resetBalance = async () => {
  resetRows();
  if (atm) {
      try {
          let tx = await atm.resetBalance();
          await tx.wait();
          getBalance();
      } catch (error) {
          console.error("Error resetting balance:", error);
      }
  }
}



  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={Deposit}>Deposit ETH</button>
        <button onClick={withdraw}>Withdraw ETH</button>
        <button onClick={resetBalance}>Reset Balance</button>
        <div><p></p></div>
        <div>
        <p></p>
        <header>Your Lucky Number is </header>
        <div>
        <p></p>
          <button id="numbertext"> 0 </button>
        </div>
        </div>
        <div>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <textarea id="firstrow1" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          1 
        </textarea>
        <textarea id="firstrow2" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          2
        </textarea>
        <textarea id="firstrow3" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          3 
        </textarea>
        <p></p>
        <textarea id="secondrow4" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          4 
        </textarea>
        <textarea id="secondrow5" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          5
        </textarea>
        <textarea id="secondrow6" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          6 
        </textarea>
        <p></p>
        <textarea id="thirdrow7" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          7 
        </textarea>
        <textarea id="thirdrow8" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          8
        </textarea>
        <textarea id="thirdrow9" style={{width: '200px', fontSize: '14px', resize: 'none', textAlign: 'center', alignContent: 'center'}} readOnly>
          9 
        </textarea>
        <p></p>
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>WELCOME TO LUCKY ETHEREUM GENERATOR</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}

