import { useState } from 'react'
import { ethers } from 'ethers';
import { TextField, Card, CardContent, Grid, Button, Box } from '@mui/material';
import Container from '@mui/material/Container';


export default function Claim() {
  const [claimId, setClaimId] = useState("");
  const [hasError, setError] = useState(false);

  function ClaimEvent(e) {
    e.persist();
    console.log(e.target.value);

    // console.log(e.currentTarget.checked);
    setClaimId(e.target.value);
  }

  async function claim(e) {
    e.preventDefault();
    try {
      const contractAddress = "0x349918e87e1E7014d8d3b6bB6352948cdF981934";
      const abi = cfundabi;
      const contract = new ethers.Contract(contractAddress, abi, signer);


      const camclaim = await contract.claim(claimId).then((r) => {
        console.log(r);
      });
      contract.on("Claim", (id) => {
        console.log(id);

      });
    } catch (e) {
      console.log(e);
      setError(true);

    }
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
          <Card sx={{ maxWidth: 450, margin: '0 auto', padding: '20px,5px' }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item>
                  <TextField
                    type="number"

                    placeholder='Enter claim id'

                    onChange={ClaimEvent}
                    value={claimId}
                    fullWidth required
                  />
                  <Box sx={{ marginTop: '20px', marginLeft: '130px' }}>

                    <Button type="submit" onClick={claim} variant='contained' color='primary'>cancel</Button>
                  </Box>


                </Grid>
              </Grid>
            </CardContent>

          </Card>
        </Container>

      )}



    </>
  )
}