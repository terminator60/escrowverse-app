const explorer_address_url = 'https://sepolia.etherscan.io/address/'
const explorer_token_url = 'https://sepolia.etherscan.io/token/'

export function Escrow({
  address,
  depositor,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  type
}) {
  return (
    <div className="existing-contract">
      <div className="escrow-header">
        <div className='escrow-icon'>
          <img src={require('../images/contract.webp')} className='logo' alt='contract'></img>
        </div>
        <div className='escrow-head-data'>
          <h3><a href={explorer_address_url + address} target='_blank'>{address}</a></h3>
          <p>{type}</p>
        </div>
      </div>
      <div className="escrow-data">
        <ul className="fields">
          <li>
            <div> Depositor </div>
            <div><a href={explorer_address_url + depositor} target='_blank'>{depositor}</a></div>
          </li>
          <li>
            <div> Arbiter </div>
            <div><a href={explorer_address_url + arbiter} target='_blank'>{arbiter}</a></div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div><a href={explorer_address_url + beneficiary} target='_blank'>{beneficiary}</a></div>
          </li>
          <li>
            <div> Value </div>
            <div> {value} ETH </div>
          </li>
          <div className='button-container'>
            <div
              className="button"
              id={`${address}-escrow-approve`}
              onClick={(e) => {
                e.preventDefault();

                handleApprove();
              }}
            >
              Arbiter Approve
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}