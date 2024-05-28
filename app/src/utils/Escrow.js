export function Escrow({
  address,
  depositor,
  arbiter,
  beneficiary,
  value,
  handleApprove,
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
            <div> Arbiter </div>
            <div><a href={`${blockExplorer}/address/${arbiter}`} target='_blank' rel='noreferrer'>{arbiter}</a></div>
          </li>
          <li>
            <div> Beneficiary </div>
            <div><a href={`${blockExplorer}/address/${beneficiary}`} target='_blank' rel='noreferrer'>{beneficiary}</a></div>
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