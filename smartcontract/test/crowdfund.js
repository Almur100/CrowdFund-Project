

const { expect } = require("chai");
const { ethers } = require('hardhat');

describe("crowdfund contract",()=>{
    
    let Crowdfund;
    let crowdfund;
    let Token;
    let token1
    
    let creator;
    let addr1;
    let addr2;
    let addrs;


    beforeEach(async ()=>{
        Token = await ethers.getContractFactory("MyToken");
        Crowdfund = await ethers.getContractFactory("CrowdFund");

        [creator,addr1,addr2, ...addrs] = await ethers.getSigners();
        token1 = await Token.deploy("Almur","AH");
        crowdfund = await Crowdfund.deploy(token1.address);
        const p = ethers.utils.parseUnits("12", "18");
        await token1.transfer(addr2.address,p);
        const p1 = ethers.utils.parseUnits("5", "18");
        await token1.connect(addr2).approve(crowdfund.address,p1);
        // await token1.connect(crowdfund).approve(addr2.address,p1);
        

        
        console.log (await token1.balanceOf(addr2.address));
        console.log (await token1.balanceOf(creator.address));
        console.log (await token1.balanceOf(addr1.address));






    });
    describe("Deployment",()=>{
        it("it should set the right erc20 token",async ()=>{
            // const token1 = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
            

            expect(await crowdfund.token()).to.equal(token1.address);

        });
    });
    describe("Launch campaing",()=>{
        it("it will pass if starttime and endtime rules are correct",async()=>{
            
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            await crowdfund.launch(tgoal,stime,etime);
            expect(await crowdfund.count()).to.equal(1);
            const c = await crowdfund.campaigns(1);
            expect(c.startAt).to.equal(stime);


            



        });

        it("it will fail if starttime less than current time",async()=>{
            
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore-300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            await expect(crowdfund.launch(tgoal,stime,etime)).to.be.revertedWith("start at < now");
            

            



        });

        it("it will fail if endtime less than start time",async()=>{
            
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+600;
            
            const etime = timestampBefore+500;
            const tgoal = 100;
            await expect(crowdfund.launch(tgoal,stime,etime)).to.be.revertedWith("end at < start at");
            

            



        });

        it("it will fail if end time above 90 days",async()=>{
            
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            const ninetytwodays = 92*24*60*60;
            

            const stime = timestampBefore+600;
            
            const etime = timestampBefore+ninetytwodays;
            const tgoal = 100;
            await expect(crowdfund.launch(tgoal,stime,etime)).to.be.revertedWith("end at > max duration");
            

            



        });

        it("it will pass if creator,goal,pleadged,claimed are correct",async()=>{
            
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            await crowdfund.launch(tgoal,stime,etime);
            expect(await crowdfund.count()).to.equal(1);
            const c = await crowdfund.campaigns(1);
            expect(c.creator).to.equal(creator.address);
            expect(c.goal).to.equal(100);
            expect(c.pledged).to.equal(0);
            expect(c.claimed).to.equal(false);



            



        });

        it("it will emit lunch event",async()=>{
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const Count = await crowdfund.count();
            const c = await crowdfund.campaigns(1);
            const msgsender = c.creator;
            // const bal = await token1.balanceOf(creator.address);
            // console.log(bal);
            // const bal1 = await token1.balanceOf(addr1.address);
            // console.log(bal1);
            await expect(L)
            .to.emit(crowdfund, "Launch")
            .withArgs(Count,msgsender,tgoal,stime,etime);
            



        });

    });
    describe("crowdfund cancel",()=>{
        it("it will pass if creator is msgsender and present time is less than starting time",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const Count = await crowdfund.count();
            console.log(Count);
            await crowdfund.cancel(Count);
            const count1 = await crowdfund.count();
            console.log(count1);
            expect(await crowdfund.count()).to.equal(1);
            const c = await crowdfund.campaigns(1);
            const msgsender = c.creator;
            const s = c.startAt;
            const g = c.goal;
            console.log(msgsender,s,g);
            // const bal = await token1.balanceOf(creator.address);
            // console.log(bal);
            // const bal1 = await token1.balanceOf(addr1.address);
            // console.log(bal1);
            // await expect(L).to.emit(crowdfund,"Launch").withArgs(Count,msgsender,tgoal,stime,etime);


            




        });
        it("it will fail if creator is not msgsender  ",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore);
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const Count = await crowdfund.count();
            await expect(
                crowdfund.connect(addr1).cancel(Count)
              ).to.be.revertedWith("not creator");
        });
        it("it will fail if present time is less than starting time",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore);
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            // console.log(blockNumrBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const Count = await crowdfund.count();
            const c = await crowdfund.campaigns(1);
            const blockNumBefore1 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore1);
            await ethers.provider.send('evm_increaseTime', [400]);
            await ethers.provider.send('evm_mine');


            
           
            

            await expect(
                crowdfund.cancel(Count)
              ).to.be.revertedWith("started");
              const blockNumBefore2 = await ethers.provider.getBlockNumber();
              console.log(blockNumBefore2);
            // async function mineNBlocks(n) {
            //     for (let index = 0; index < n; index++) {
            //       await ethers.provider.send('evm_mine');
            //     }
            //   }
        });
        it("it will emit cancel event",async()=>{
            
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const Count = await crowdfund.count();
            const C = await crowdfund.cancel(Count);
            
            // const c = await crowdfund.campaigns(1);
            // const msgsender = c.creator;
            // const bal = await token1.balanceOf(creator.address);
            // console.log(bal);
            // const bal1 = await token1.balanceOf(addr1.address);
            // console.log(bal1);
            await expect(C)
            .to.emit(crowdfund, "Cancel")
            .withArgs(1);
            



        });


    });
    describe("pleadge",()=>{
        it("it will pass if present time greter than starting time and less than end time and also check update of campaing pleadged amount,msgsender amount,this contract amount,emit pleadge event",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            // await crowdfund.ERC20(token.address).transfer(addr2.address,1);
            
            // console.log(creator.address);
            // console.log(addr2.address);
            const bal = (await token1.provider.getBalance(addr1.address));
            const bal1 = (await token1.provider.getBalance(creator.address));
            const bal2 = (await token1.provider.getBalance(addr2.address));
            console.log(bal);
            console.log(bal1);
            console.log(bal2);
            const amount1 = ethers.utils.parseUnits("5","18");
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");

            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            console.log(p);
            const c = await crowdfund.campaigns(1);
            console.log(c);
            expect(c.pledged).to.equal(amount1);
            const pldg = await crowdfund.connect(addr2).getBalance(1);
            // expect(pldg).to.equal(amount1);
            
            console.log(pldg);
            expect(pldg).to.equal(amount1);
            await expect(p).to.emit(crowdfund,"Pledge").withArgs(1,addr2.address,amount1);
            // const bal3 = pldg[addr2.address];

            // console.log( ethers.utils.parseUnits("bal", "18") );
        });
        it("it will fail if present time less than starting time",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const amount1 = ethers.utils.parseUnits("5","18");
            
            const p = await expect (crowdfund.connect(addr2).pledge(1,amount1)).to.be.revertedWith("not started");
            const c = await crowdfund.campaigns(1);
            console.log(c);
            expect(c.pledged).to.equal(0);
            const pldg = await crowdfund.connect(addr2).getBalance(1);
            // expect(pldg).to.equal(amount1);
            
            console.log(pldg);
            expect(pldg).to.equal(0);


        });
        it("it will fail if present time greater than end time",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const amount1 = ethers.utils.parseUnits("5","18");
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");


            const p = await expect (crowdfund.connect(addr2).pledge(1,amount1)).to.be.revertedWith("ended");
            const c = await crowdfund.campaigns(1);
            console.log(c);
            expect(c.pledged).to.equal(0);
            const pldg = await crowdfund.connect(addr2).getBalance(1);
            // expect(pldg).to.equal(amount1);
            
            console.log(pldg);
            expect(pldg).to.equal(0);


        });

    });
    describe("Unpleadged token from crowdfund",()=>{
        it("it will pass if present time less than end time,also update pleadged amount,msgsender amount,and emit unpleadged event",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const amount1 = ethers.utils.parseUnits("5","18");
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            console.log(p);

            const up = await crowdfund.connect(addr2).unpledge(1,amount1);
            const c = await crowdfund.campaigns(1);
            console.log(c);
            expect(c.pledged).to.equal(0);
            const pldg = await crowdfund.connect(addr2).getBalance(1);
            // expect(pldg).to.equal(amount1);
            
            console.log(pldg);
            expect(pldg).to.equal(0);
            await expect(up).to.emit(crowdfund,"Unpledge").withArgs(1,addr2.address,amount1);


        });
        it("it will fail if present time greater than end time",async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
  
            console.log(timestampBefore);
            const blockNumBefore1 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore1);
            

            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
            const blockNumBefore2 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore2);
            const amount1 = ethers.utils.parseUnits("5","18");
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            const blockNumBefore4 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore4);
            console.log(p);
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");
            const up =  crowdfund.connect(addr1).unpledge(1,amount1);
            const blockNumBefore5 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore5);

            await expect(up).to.be.revertedWith("Ended");
            const blockNumBefore6 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore6);

            
            const c = await crowdfund.campaigns(1);
            const blockNumBefore3 = await ethers.provider.getBlockNumber();
            console.log(blockNumBefore3);
            // console.log(c.pledged);
            // expect(c.pledged).to.equal(0);
            // const pldg = await crowdfund.connect(addr1).getBalance(1);
            // console.log(pldg);
            // expect(pldg).to.equal(0);

        });

    });
   

   
    describe("claim token",()=>{
        beforeEach(async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = ethers.utils.parseUnits("4","18");
            // const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
        });    
       
        it("this will pass if all claims rules are correct",async()=>{
            const amount1 = ethers.utils.parseUnits("5","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            const c = await crowdfund.campaigns(1);
            const amount7 = ethers.utils.parseUnits("7","18");
            const amount93 = ethers.utils.parseUnits("93","18");
            
            
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");
            const cl = await crowdfund.claim(1);
            const c1 = await crowdfund.campaigns(1);
            expect(c1.claimed).to.equal(true);
            // expect(c1.pledged).to.equal(0);
            const creatorbal = await token1.balanceOf(creator.address);
            const addr2bal = await token1.balanceOf(addr2.address);
            
            expect(creatorbal).to.equal(amount93);
            expect(addr2bal).to.equal(amount7);
            await expect(cl).to.emit(crowdfund,"Claim").withArgs(1);

            
            // await crowdfund.pledgedAmount(1)[creator]
            



        });
        it("it will fail if campaign not ended",async()=>{
            const amount1 = ethers.utils.parseUnits("5","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            // await ethers.provider.send("evm_increaseTime",[700]);
            // await ethers.provider.send("evm_mine");
            await expect(crowdfund.claim(1)).to.be.revertedWith("not ended");
            const c1 = await crowdfund.campaigns(1);
            expect(c1.claimed).to.equal(false);

        });
        it("it will fail if msgsender is not creator",async()=>{
            const amount1 = ethers.utils.parseUnits("5","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");
            await expect(crowdfund.connect(addr2).claim(1)).to.be.revertedWith("not creator");
            const c1 = await crowdfund.campaigns(1);
            expect(c1.claimed).to.equal(false);

        });
        it("it will fail if pleadged less than goal",async()=>{
            const amount1 = ethers.utils.parseUnits("3","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");
            await expect(crowdfund.claim(1)).to.be.revertedWith("pledged < goal");
            const c1 = await crowdfund.campaigns(1);
            expect(c1.claimed).to.equal(false);

        });




    });
    describe("refund token",()=>{
        beforeEach(async()=>{
            const blockNumBefore = await ethers.provider.getBlockNumber();
            const blockBefore = await ethers.provider.getBlock(blockNumBefore);
            const timestampBefore = blockBefore.timestamp;
            const stime = timestampBefore+300;
            
            const etime = timestampBefore+600;
            const tgoal = ethers.utils.parseUnits("4","18");
            // const tgoal = 100;
            const L = await crowdfund.launch(tgoal,stime,etime);
        });
        it("it will pass if refund rulles are correct",async()=>{
            const amount1 = ethers.utils.parseUnits("3","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            const c = await crowdfund.campaigns(1);
            const amount7 = ethers.utils.parseUnits("12","18");
            const amount93 = ethers.utils.parseUnits("93","18");
            
            
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");
            const cl = await crowdfund.connect(addr2).refund(1);
            const addr2bal = await token1.balanceOf(addr2.address);
            const addrthis = await token1.balanceOf(crowdfund.address);
            expect(addr2bal).to.equal(amount7);
            expect(addrthis).to.equal(0);


        });
        it("it will fail if campaign not ended",async()=>{
            const amount1 = ethers.utils.parseUnits("3","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            await expect(crowdfund.connect(addr2).refund(1)).to.be.revertedWith("not ended");



        });
        it("it will fail if pledged amount greater than or equal goal",async()=>{
            const amount1 = ethers.utils.parseUnits("5","18");
            
            
            await ethers.provider.send("evm_increaseTime",[400]);
            await ethers.provider.send("evm_mine");
            
            


            const p = await crowdfund.connect(addr2).pledge(1,amount1);
            const c = await crowdfund.campaigns(1);
            await ethers.provider.send("evm_increaseTime",[700]);
            await ethers.provider.send("evm_mine");
            await expect(crowdfund.connect(addr2).refund(1)).to.be.revertedWith("pledged >= goal");


        });    


    });


    


    

});