export function ERC20Escrow({
  address,
  depositor,
  beneficiaryTokenAddress,
  beneficiaryAmount,
  beneficiary,
  value,
  handleBeneficiaryTokenApprove,
  handleTransfer,
  beneficiaryToken,
  type,
  blockExplorer
}) {

  return (
    <div className="existing-contract">
      <div className="escrow-header">
        <div className='escrow-icon'>
          <img src={require('../images/contract.webp')} className='logo' alt='contract'></img>
        </div>
        <div className='escrow-head-data'>
          <h3><a href={`${blockExplorer}/address/${address}`} target='_blank' rel='noreferrer'>{address}</a></h3>
          <p>{type}</p>
        </div>
      </div>
      <div className="escrow-data">
        <ul className="fields">
          <li>
            <div> Depositor </div>
            <div><a href={`${blockExplorer}/address/${depositor}`} target='_blank' rel='noreferrer'>{depositor}</a></div>
          </li>
          <li>
            <div> ERC20 Token Contract </div>
            <div><a href={`${blockExplorer}/address/${beneficiaryTokenAddress}`} target='_blank' rel='noreferrer'>{beneficiaryTokenAddress}</a></div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div><a href={`${blockExplorer}/address/${beneficiary}`} target='_blank' rel='noreferrer'>{beneficiary}</a></div>
          </li>
          <li>
            <div> Value </div>
            <div> {value} ETH </div>
          </li>
          <li>
            <div> Token Amount </div>
            <div> {beneficiaryAmount} {beneficiaryToken} </div>
          </li>
          <div className='button-container'>
            <div
              className="button"
              id={`${address}-beneficiary-approve`}
              onClick={(e) => {
                e.preventDefault();

                handleBeneficiaryTokenApprove();
              }}
            >
              Approve
            </div>
            <div
              className="button"
              id={`${address}-escrow-transfer`}
              onClick={(e) => {
                e.preventDefault();

                handleTransfer();
              }}
            >
              Transfer
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}