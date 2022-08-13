import { useState } from "react"
import TokenAbi from "./tokenabi";
import {ethers} from 'ethers'




export default function Token(){
    const[tokenTransfer,setTokenTransfer] = useState({
      address:"",
      amount:"",
    }); 
    const[signer,setSigner] = useState();
    const tokenAddress = " 0x9c249E65876E50ae2061495fACa93B2974A3639A";
    const tabi = TokenAbi;
    const contract = new ethers.Contract(tokenAddress,tabi,signer);









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
      
  
      const camPledge = await contract.transfer(tokenTransfer.address,tokenTransfer.amount).then((r)=>{
        console.log(r);
      });
      contract.on("Transfer",(from,amount)=>{
        console.log(from,amount);
  
      });
    }


    return(
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
   

    )
}