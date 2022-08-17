import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import Divider from '@mui/material/Divider';
import { red } from '@mui/material/colors';
import cfabi from './CrowdFund.json';


export default function Campaign(){
    const[totalcamgn,setTotalcamgn] = useState([]);




    const loadlistedAsset = async () => {
        
            await ethereum.request({ method: "eth_requestAccounts" });
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            const Provider = new ethers.providers.Web3Provider(window.ethereum);
            // setProvider(Provider);
            const signer = Provider.getSigner();
            console.log(signer)
            const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
            const cabi = cfabi.abi;
            const contract = new ethers.Contract(contractAddress, cabi, signer);
            const campaignid = await contract.count();
            let totalcampaigns = []
            for (let indx = 1; indx <= campaignid; indx++) {
                const C = await contract.campaigns(indx)
                const idd = C.id;
                // const id1 = idd.toString();
                const crt= C.creator;
                const goal = C.goal;
                const goal1 = goal.toString();
                const start = C.startAt;
                const startmsecond = start*1000;
                const dateObject = new Date(startmsecond);
                const humanDateFormat = dateObject.toLocaleString()
                const end = C.endAt;
                const startmsecond1 = end*1000;
                const end1 = new Date(startmsecond1);
                const humanDateFormat1 = end1.toLocaleString();

                let campaign = {
                    
                    

                    
                    id: idd,
                    Creator: crt,
                    Goal: goal1,
                    Start:humanDateFormat,
                    End: humanDateFormat1,
                    


                }
                totalcampaigns.push(campaign)


            }
            setTotalcamgn(totalcampaigns);

    }

    useEffect(() => {
        loadlistedAsset()
    }, [])

    return(
        <>
        <Grid container spacing={1}>
        {totalcamgn.map((item, idx) => (
            <Grid item sm={12} xs={12} md={12} lg={12}>
                <Card sx={{ maxWidth: "345",backgroundColor:'green' }}>
                    <CardContent>
                        <Stack direction='row' spacing={5} divider={<Divider orientation="vertical" flexItem />}>
                            <Typography>
                                Campaign id:{item.id}
                            </Typography>
                            <Typography>
                                Creator:{item.Creator} 
                            </Typography>
                            <Typography>
                                total goal:{item.Goal} native token
                            </Typography>
                            <Typography>
                                Starttime:{item.Start}
                            </Typography>
                            <Typography>
                                Endtime:{item.End}
                            </Typography>

                        </Stack>
                        
                    </CardContent>
                    
                </Card>
                

            </Grid>
        ))}

        </Grid>
        </>
    )
}