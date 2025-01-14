const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Tickets = await hre.ethers.getContractFactory("Tickets");
  const tickets = await Tickets.deploy();
  await tickets.deployed();
  const addresses = {
    tickets: tickets.address,
  };

  fs.writeFileSync("contractAddresses.json", JSON.stringify(addresses));

  console.log("Contract addresses written to contractAddresses.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
