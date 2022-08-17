import { useState } from 'react'
import { ethers } from 'ethers';
import { TextField, Card, CardContent, Grid, Button, Box } from '@mui/material';
import Container from '@mui/material/Container';
import cfabi from './CrowdFund.json';

export default function LAunch() {
  const [hasError, setError] = useState(false);
  const[signer,setSigner] = useState();
  const [launch1, setLaunch1] = useState({
    targetGoal: "",
    startTime: "",
    endTime: "",


  });

  function InputEvent(event) {
    console.log(event.target.value);
    console.log(event.target.name);
    const { name, value } = event.target;

    setLaunch1((prevalue) => {
      console.log(prevalue);

      return {
        ...prevalue,
        [name]: value,

      };

    })
  }

  async function Launch(e) {
    e.preventDefault();

    // const contractAddress = "0x98733057c72553b920e7965dcd3032277a2513ba";
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const cabi = cfabi.abi;
    const contract = new ethers.Contract(contractAddress, cabi, signer);
    try {
      const tgoal = launch1.targetGoal;
      // const stime = launch1.startTime.getTime()/1000;
      const etime = launch1.endTime;
      const stime = launch1.startTime;
      const stime1 = new Date(stime).getTime() / 1000;
      const etime1 = new Date(etime).getTime() / 1000;

      // const stime =1647078912+1000;
      // const etime =1647078912+2000;
      const camLaunch = await contract.launch(tgoal, stime1, etime1).then((r) => {
        console.log(r);
      });
      contract.on("Launch", (gount, signer, _goal, _startAt, _endAt) => {
        console.log({
          gount: gount.toNumber(),
          signer: signer,
          _goal: _goal.toNumber(),
          _startAt: _startAt,
          _endAt: _endAt,
        });
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
          <form onSubmit={Launch}>
            <Card sx={{ maxWidth: 450, margin: '0 auto', padding: '20px,5px' }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField
                      type="number"
                      placeholder='Enter your tgoal'
                      name='targetGoal'
                      onChange={InputEvent}
                      value={launch1.targetGoal}
                      fullWidth required
                    />

                    <TextField
                      type="datetime-local"

                      placeholder='Enter your stime'
                      name='startTime'
                      onChange={InputEvent}
                      value={launch1.startTime}
                      fullWidth required
                    />

                    <TextField
                      type="datetime-local"

                      placeholder='Enter your etime'
                      name='endTime'
                      onChange={InputEvent}
                      value={launch1.endTime}
                      fullWidth required
                    />

                    <Box sx={{ marginTop: '20px', marginLeft: '130px' }}>

                      <Button type="submit" variant='contained' color='primary'>Launch</Button>
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