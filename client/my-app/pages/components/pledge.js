import { useState } from 'react'
import { ethers } from 'ethers';
import { TextField, Card, CardContent, Grid, Button, Box } from '@mui/material';
import Container from '@mui/material/Container';
import abi from './CrowdFund.json';


export default function PLedge() {
  const [hasError, setError] = useState(false);
  const [pledge1, setPledge1] = useState({
    pid: "",
    pAmount: "",
  });

  function PledgeEvent(event) {
    console.log(event.target.value);
    console.log(event.target.name);
    const { name, value } = event.target;

    setPledge1((prevalue) => {
      console.log(prevalue);

      return {
        ...prevalue,
        [name]: value,

      };

    })
  }
  async function connect() {
    if (typeof window.ethereum !== undefined) {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const Provider = new ethers.providers.Web3Provider(window.ethereum);
        // setProvider(Provider);
        setSigner(Provider.getSigner());

      } catch (e) {
        console.log(e);
      }
    }

  }


  async function Pledge(e) {
    e.preventDefault();
    try {
      const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
      const cabi = abi;
      const contract = new ethers.Contract(contractAddress, cabi, signer);
      const tokencontract = new ethers.Contract(tokenAddress, tabi, signer);
      await tokencontract.approve(contractAddress, pledge1.pAmount);


      const camPledge = await contract.pledge(pledge1.pid, pledge1.pAmount).then((r) => {
        console.log(r);
      });
      contract.on("Pledge", (id, signer, amount) => {
        console.log(id, signer, amount);

      });
    } catch (e) {
      console.log(e)
      setError(true);

    }
  }
  return (
    <>
      {hasError ? (
        <>
         <Box sx={{alignItems:'center',color:'red',ml:'450px',mt:'50px'}}>
          {"Error: connect your address to ethereum goerli test network"}
          </Box>
          <Box sx={{alignItems:'center',ml:'45%',mt:'50px'}}> 
          <Button type="submit" onClick={connect}> connect wallet </Button>
          </Box>
        </>
      ) : (
        <Container>
          <Box sx={{ marginLeft: '550px', marginTop: '10px', marginBottom: '10px' }}>
            <Button type="submit" variant='contained' color='primary' onClick={connect}> connect wallet </Button>
          </Box>

          <form onSubmit={Pledge}>
            <Card sx={{ maxWidth: 450, margin: '0 auto', padding: '20px,5px' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField
                      type="number"
                      placeholder='Enter id'
                      name='pid'
                      onChange={PledgeEvent}
                      value={pledge1.pid}
                      fullWidth required
                    />

                    <TextField
                      type="number"

                      placeholder='Enter your amount'
                      name='pAmount'
                      onChange={PledgeEvent}
                      value={pledge1.pAmount}
                      fullWidth required
                    />


                    <Box sx={{ marginTop: '20px', marginLeft: '130px' }}>

                      <Button type="submit" variant='contained' color='primary'>buyasset</Button>
                    </Box>

                  </Grid>
                </Grid>
              </CardContent>

            </Card>






          </form>
        </Container>

      )}

    </>
  )
}