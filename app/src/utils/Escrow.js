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
        <div className='contract-icon'>
          <img src={require('../images/list.webp')} alt='contract'></img>
        </div>
        <div className='contract-data'>
          <h3>{address}</h3>
          <p>{type}</p>
        </div>
      </div>
      <div className="escrow-data"></div>
      <ul className="fields">
        <li>
          <div> Depositor </div>
          <div> {depositor} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} ETH </div>
        </li>
        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            handleApprove();
          }}
        >
          Arbiter Approve
        </div>
      </ul>
    </div>
  );
}