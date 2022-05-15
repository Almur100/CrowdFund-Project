import Head from 'next/head'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import styles from '../styles/Home.module.css'
import {ethers} from 'ethers';
import cfundabi from './abi'
import moment from 'moment'
import token from './Token';
import TokenAbi from './tokenabi';


export default function Home(){
  // const[hasMetamask,setHasMetamask] = useState(false);
  const[signer,setSigner] = useState();
  const[cancelId,setCancelId] = useState("");
  const[claimId,setClaimId] = useState("");
  const[refundId,setRefundId] = useState("");
  const[tokenTransfer,setTokenTransfer] = useState({
    address:"",
    amount:"",
  }); 
  // const[transfertoken,setTransfertoken]= useState("");
  const[pledge1,setPledge1] = useState({
    pid:"",
    pAmount:"",
  });
  const[unPledge1,setUnPledge1] = useState({
    uid:"",
    uValue:"",

  });
  // const[provider,setProvider] = useState();
  const [launch1,setLaunch1] = useState({
    targetGoal:"",
    startTime:"",
    endTime:"",


  });
  // const provider1 = new ethers.providers.Web3Provider(window.ethereum);
  const tokenAddress = "0x693C7e8B22467404D6Ee36Fe140A0513F886A215";
  // 0x2BBA83D5a34211fFAe295aB3499C98D6423839cA
    
  // const contractAddress = "0x2F01a521a56a5774446050f7ae2EA699104Dd267";
  // const abi = cfundabi;
  const tabi = TokenAbi;
  // const tokencontract = new ethers.Contract(tokenAddress,tabi,signer);
  // const contract = new ethers.Contract(contractAddress,abi,signer);
  // const readContract = new ethers.Contract(contractAddress,abi,provider);



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
  function InputEvent(event){
    console.log(event.target.value);
    console.log(event.target.name);
    const {name,value} = event.target;

    setLaunch1((prevalue)=>{
      console.log(prevalue);

      return {
        ...prevalue,
        [name]:value,

      };

    })
  }
  function PledgeEvent(event){
    console.log(event.target.value);
    console.log(event.target.name);
    const {name,value} = event.target;

    setPledge1((prevalue)=>{
      console.log(prevalue);

      return {
        ...prevalue,
        [name]:value,

      };

    })
  }
  function UnPledgeEvent(event){
    console.log(event.target.value);
    console.log(event.target.name);
    const {name,value} = event.target;

    setUnPledge1((prevalue)=>{
      console.log(prevalue);

      return {
        ...prevalue,
        [name]:value,

      };

    })
  }
  function CancelEvent(e){
    e.persist();
    console.log(e.target.value);
    
    // console.log(e.currentTarget.checked);
    setCancelId(e.target.value);
  }
  function ClaimEvent(e){
    e.persist();
    console.log(e.target.value);
    
    // console.log(e.currentTarget.checked);
    setClaimId(e.target.value);
  }
  function RefundEvent(e){
    e.persist();
    console.log(e.target.value);
    
    // console.log(e.currentTarget.checked);
    setRefundId(e.target.value);

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
 


  async function Launch(e){
    e.preventDefault();
    if(typeof window.ethereum !== "undefined"){
      // const contractAddress = "0x98733057c72553b920e7965dcd3032277a2513ba";
      const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
      const abi = cfundabi;
      const contract = new ethers.Contract(contractAddress,abi,signer);
      try{
        const tgoal = launch1.targetGoal;
        // const stime = launch1.startTime.getTime()/1000;
        const etime = launch1.endTime;
        const stime = launch1.startTime;
        const stime1 = new Date(stime).getTime()/1000;
        const etime1 = new Date(etime).getTime()/1000;

        // const stime =1647078912+1000;
        // const etime =1647078912+2000;
        const camLaunch = await contract.launch(tgoal,stime1,etime1).then((r)=>{
          console.log(r);
        });
        contract.on("Launch", (gount, signer, _goal, _startAt, _endAt) => {
          console.log({
              gount: gount.toNumber(),
              signer: signer,
              _goal: _goal.toNumber(),
              _startAt: _startAt,
              _endAt:_endAt,
          });
      });




      }catch(e){
        console.log(e);

      }
      



    }else{
      console.log("pls install metamask");
    }

  }
  async function Pledge(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    const tokencontract = new ethers.Contract(tokenAddress,tabi,signer);
    await tokencontract.approve(contractAddress,pledge1.pAmount);
    

    const camPledge = await contract.pledge(pledge1.pid,pledge1.pAmount).then((r)=>{
      console.log(r);
    });
    contract.on("Pledge",(id,signer,amount)=>{
      console.log(id,signer,amount);

    });
  }
  async function UnPledge(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    

    const camunpledge = await contract.unpledge(unPledge1.uid,unPledge1.uValue).then((r)=>{
      console.log(r);
    });
    contract.on("Unpledge",(id,signer,amount)=>{
      console.log(id,signer,amount);

    });
  }
  async function cancel(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    

    const camCancel = await contract.cancel(cancelId).then((r)=>{
      console.log(r);
    });
    contract.on("Cancel",(id)=>{
      console.log(id);

    });
  }
  async function claim(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    

    const camclaim = await contract.claim(claimId).then((r)=>{
      console.log(r);
    });
    contract.on("Claim",(id)=>{
      console.log(id);

    });
  }
  async function refund(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    

    const camrefund = await contract.refund(refundId).then((r)=>{
      console.log(r);
    });
    contract.on("Refund",(id)=>{
      console.log(id);

    });
  }
  async function Transfert(e){
    e.preventDefault();
    const tokencontract = new ethers.Contract(tokenAddress,tabi,signer);
    

    const camPledge = await tokencontract.transfer(tokenTransfer.address,tokenTransfer.amount).then((r)=>{
      console.log(r);
    });
    tokencontract.on("Transfer",(from,to,amount)=>{
      console.log(from,to,amount);

    });
  }
  async function getb(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934"; 
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    const addr = "0xefaE649b8901f4834547634600D284D4fb2cc5F8";
    const gb = await contract.pledgedAmount(3,addr);
    // const bal = ethers.utils.formatUnits(gb);
    console.log(gb.toNumber());

  }
  async function count(e){
    e.preventDefault();
    const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934"; 
    const abi = cfundabi;
    const contract = new ethers.Contract(contractAddress,abi,signer);
    const gb = await contract.count();
    // const bal = ethers.utils.formatUnits(gb);
    console.log(gb.toNumber());

  }
  async function balance(e){
    e.preventDefault();
    const tokencontract = new ethers.Contract(tokenAddress,tabi,signer);
    const addr = "0x2BBA83D5a34211fFAe295aB3499C98D6423839cA";
    // const addr = "0xefaE649b8901f4834547634600D284D4fb2cc5F8";

    const camledge = await tokencontract.balanceOf(addr);
    // const bal = ethers.utils.formatUnits(camledge)
   
    console.log(camledge.toNumber());

  }

 
  

return(
 
  <>
    <h1> hello almur </h1>
    <button type = "submit" onClick={connect}> connect </button>
    <br/>
    <br/>
   <form onSubmit={Launch}>
   <input
      type = "number"
      placeholder='Enter your tgoal'
      name='targetGoal'
      onChange={InputEvent}
      value={launch1.targetGoal}
    />
    <br/>
    <input
      type = "datetime-local"
      
      placeholder='Enter your etime'
      name='startTime'
      onChange={InputEvent}
      value={launch1.startTime}
    />
    <br/>
    <input
      type = "datetime-local"
      
      placeholder='Enter your etime'
      name='endTime'
      onChange={InputEvent}
      value={launch1.endTime}
    />
    <br/>
    <br/>
    <button type = "submit">submit</button>  
  
  

   </form>
  
    <br/>
  
      <input
      type = "number"
      
      placeholder='Enter cancel id'
      
      onChange={CancelEvent}
      value={cancelId}
      />
    <button type = "submit" onClick={cancel}> cancel </button>
    <br/>
    <form onSubmit={Pledge}>
     <input
      type = "number"
      placeholder='Enter id'
      name='pid'
      onChange={PledgeEvent}
      value={pledge1.pid}
      />
     <br/>
     <input
      type = "number"
      
      placeholder='Enter your amount'
      name='pAmount'
      onChange={PledgeEvent}
      value={pledge1.pAmount}
     />
   
    <br/>
    <br/>
    <button type = "submit">pledge</button>  
  
  

    </form>
   <br/>
   <form onSubmit={UnPledge}>
   <input
      type = "number"
      placeholder='Enter id'
      name='uid'
      onChange={UnPledgeEvent}
      value={unPledge1.uid}
    />
    <br/>
    <input
      type = "number"
      
      placeholder='Enter your amount'
      name='uValue'
      onChange={UnPledgeEvent}
      value={unPledge1.uValue}
    />
   
    <br/>
    <br/>
    <button type = "submit">unpledge</button>  
  
  

   </form>
   <br/>
   <input
      type = "number"
      
      placeholder='Enter claim id'
      
      onChange={ClaimEvent}
      value={claimId}
      />
    <button type = "submit" onClick={claim}> claim </button>

    <br/>
    <input
      type = "number"
      
      placeholder='Enter refund id'
      
      onChange={RefundEvent}
      value={refundId}
      />
    <button type = "submit" onClick={refund}> refund </button>
    <br/>
    <br/>
    <br/>
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
   <br/>
   <button type = "submit" onClick={count}> Count </button>
   <button type = "submit" onClick={balance}> balance </button>
   <button type = "submit" onClick={getb}> getbalance </button>
   
   </>
   

   

    
    
  // 







//  Sorry, We are unable to locate this TxnHash

  
  
 
 )

}