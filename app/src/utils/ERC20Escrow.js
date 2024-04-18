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
  type
}) {

  return (
    <div className="existing-contract">
      <div className="escrow-header">
        <div className='contract-icon'>
          <img src={require('../images/list.webp')} alt='contract'></img>
        </div>
        <div className='contract-data'>
          <h3>{address}</h3>
          <p>{type}</p>
        </div>
      </div>
      <div className="escrow-data">
        <ul className="fields">
        <li>
          <div> Depositor </div>
          <div> {depositor} </div>
        </li>
          <li>
            <div> ERC20 Token Contract </div>
            <div> {beneficiaryTokenAddress} </div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div> {beneficiary} </div>
          </li>
          <li>
            <div> Value </div>
            <div> {value} ETH </div>
          </li>
          <li>
            <div> Token Amount </div>
            <div> {beneficiaryAmount} {beneficiaryToken} </div>
          </li>
          <div
            className="button"
            id={address}
            onClick={(e) => {
              e.preventDefault();

              handleBeneficiaryTokenApprove();
            }}
          >
            Approve
          </div>
          <div
            className="button"
            id={address}
            onClick={(e) => {
              e.preventDefault();

              handleTransfer();
            }}
          >
            Transfer
          </div>
        </ul>
      </div>
    </div>
  );
}