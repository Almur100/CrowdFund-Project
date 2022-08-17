import { useState } from 'react'
import { ethers } from 'ethers';
import { TextField, Card, CardContent, Grid, Button, Box } from '@mui/material';
import Container from '@mui/material/Container';
import cfabi from './CrowdFund.json';


export default function CAncel() {
  const [hasError, setError] = useState(false);
  const[signer,setSigner] = useState();
  const [cancelId, setCancelId] = useState("");
  function CancelEvent(e) {
    e.persist();
    console.log(e.target.value);

    // console.log(e.currentTarget.checked);
    setCancelId(e.target.value);
  }

  async function cancel(e) {
    e.preventDefault();
    try {
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const cabi = cfabi.abi;
      const contract = new ethers.Contract(contractAddress, cabi, signer);


      const camCancel = await contract.cancel(cancelId).then((r) => {
        console.log(r);
      });
      contract.on("Cancel", (id) => {
        console.log(id);

      });
    } catch (e) {
      console.log(e)
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

                    placeholder='Enter cancel id'

                    onChange={CancelEvent}
                    value={cancelId}
                    fullWidth required
                  />
                  <Box sx={{ marginTop: '20px', marginLeft: '130px' }}>

                    <Button type="submit" onClick={cancel} variant='contained' color='primary'>cancel</Button>
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