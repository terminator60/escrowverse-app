export function ERC20ToERC20Escrow({
  address, depositor,
  beneficiary, beneficiaryTokenAddress, depositorTokenAddress, depositorAmount, beneficiaryAmount,
  handleBeneficiaryTokenApprove,
  handleDepositerTokenApprove,
  handleTransfer,
  type,
  beneficiaryToken,
  depositorToken
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
            <div> Depositor ERC20 Token Address </div>
            <div> {depositorTokenAddress} </div>
          </li>
          <li>
            <div> Depositor Token Amount </div>
            <div> {depositorAmount} {depositorToken} </div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div> {beneficiary} </div>
          </li>
          <li>
            <div> Beneficiary ERC20 Token Address </div>
            <div> {beneficiaryTokenAddress} </div>
          </li>
          <li>
            <div> Beneficiary Token Amount </div>
            <div> {beneficiaryAmount} {beneficiaryToken} </div>
          </li>
          <div className='button-container'>
            <div
              className="button"
              id={`${address}-depositor-approve`}
              onClick={(e) => {
                e.preventDefault();

                handleDepositerTokenApprove();
              }}
            >
              Depositor Approve
            </div>
            <div
              className="button"
              id={`${address}-beneficiary-approve`}
              onClick={(e) => {
                e.preventDefault();

                handleBeneficiaryTokenApprove();
              }}
            >
              Beneficiary Approve
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
          </div>

        </ul>
      </div>
    </div>
  );
}
