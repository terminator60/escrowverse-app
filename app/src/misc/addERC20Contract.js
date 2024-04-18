import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(
  id,
  contract,
  tokenAddress,
  beneficiary,
  tokenAmount,
  value
) {
  const approvebuttonId = `approve-${id}`;
  const transferbuttonId = `transfer-${id}`;

  const container = document.getElementById('container');
  container.innerHTML += createHTML(approvebuttonId, transferbuttonId, tokenAddress, beneficiary, tokenAmount, value);

  contract.on('TransferCompleted', () => {
    document.getElementById(buttonId).className = 'complete';
    document.getElementById(buttonId).innerText = "✓ It's been tranered!";
  });

  document.getElementById(approvebuttonId).addEventListener('click', async () => {
    const signer = provider.getSigner();
    await contract.connect(signer).approve();
  });

  document.getElementById(transferbuttonId).addEventListener('click', async () => {
    const signer = provider.getSigner();
    await contract.connect(signer).transfer();
  });
}

function createHTML(approvebuttonId, transferbuttonId, tokenAddress, beneficiary, tokenAmount, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> ERC20 Tpken Address </div>
          <div> ${tokenAddress} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <li>
          <div> Token Amount </div>
          <div> ${tokenAmount} </div>
        </li>
        <div class="button" id="${approvebuttonId}">
          Approve
        </div>
        <div class="button" id="${transferbuttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
