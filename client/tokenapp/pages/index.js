import { useState } from "react"
import TokenAbi from "./tokenabi";
import {ethers} from 'ethers';




export default function token(){
    const[tokenTransfer,setTokenTransfer] = useState({
      address:"",
      amount:"",
    }); 
    const[signer,setSigner] = useState();
    const tokenAddress = "0x29Ae9edAadFAb4022C9576827B97A9C0E64E8127";
    // const tokenAddress = "0x03BF72b64B4Ef97A156168Bd9f1cE4672708290";
    const tabi = TokenAbi;
    // const contract = new ethers.Contract(tokenAddress,tabi,signer);









    async function connect(){
      if(typeof window.ethereum !== undefined){
        try{
          await ethereum.request({method:  "eth_requestAccounts" });
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          const Provider = new ethers.providers.Web3Provider(window.ethereum);
          // setProvider(Provider);
          setSigner(Provider.getSigner());
  
        }catch(e){
          console.log(e);
        }
      }
    }
    function TokenEvent(event){
      console.log(event.target.value);
      console.log(event.target.name);
      const {name,value} = event.target;
  
      setTokenTransfer((prevalue)=>{
        console.log(prevalue);
  
        return {
          ...prevalue,
          [name]:value,
  
        };
  
      })
    }
    async function Transfert(e){
      e.preventDefault();
      const contract = new ethers.Contract(tokenAddress,tabi,signer);
      const camPledge = await contract.transfer(tokenTransfer.address,tokenTransfer.amount).then((r)=>{
        console.log(r);
      });
      
  
      
      contract.on("Transfer",(from,to,amount)=>{
        console.log(from,to,amount.toNumber());
  
      });
    }
    async function balance(e){
      e.preventDefault();
      const contract = new ethers.Contract(tokenAddress,tabi,signer);
      // const addr = "0x2BBA83D5a34211fFAe295aB3499C98D6423839cA";
      const addr = "0xefaE649b8901f4834547634600D284D4fb2cc5F8";

      const camledge = await contract.balanceOf(addr);
      const bal = ethers.utils.formatUnits(camledge)
     
      console.log(bal);
      // console.log(camledge);
      // return camledge;

    

    }
    return(
    <>  
    <div>
     <form onSubmit={Transfert}>  
          <input
      
             placeholder='Enter address'
             name='address'
             onChange={TokenEvent}
             value={tokenTransfer.address}
          />
          <br/>
          <input
            type = "number"
      
            placeholder='Enter your amount'
            name='amount'
             onChange={TokenEvent} 
            value={tokenTransfer.amount}
          />
   
   
         <br/>
         <button type = "submit">transfer</button>  
  
  

     </form>
   
   </div>
   <button type = "submit" onClick={connect}> connect </button>
   <br/>
   <button type = "submit" onClick={balance}> balance </button>
   
  </>  )
}


