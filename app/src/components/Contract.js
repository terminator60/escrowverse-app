import Dropdown from 'react-dropdown';
import { useState, useContext } from 'react';
import { newContract } from '../utils/deployContracts';
import { WalletContext } from '../WallerContext';

function Contract() {
    const { signer, escrows, setEscrows, options, account } = useContext(WalletContext);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const DropdownMenu = () => {

        const handleDropdownChange = (selected) => {
            setSelectedOption(selected.value);
        };

        return (
            <Dropdown options={options} onChange={handleDropdownChange} value={selectedOption} placeholder="Select an option" />
        );
    };

    return (<div className="contract">
        <div className="contract-header">
            <img src={require('../images/create-contract.webp')} className='logo' alt='create-contract' />
            <h2> New Contract </h2>
        </div>
        <div className="contract-data">
            <label>
                Escrow Type
                <DropdownMenu />
            </label>

            {selectedOption !== options[2] && <label>
                {selectedOption === options[0] ? 'Arbiter' : 'ERC20 Token'} Address
                <input type="text" id="arbiter" placeholder='0x00000......' />
            </label>}

            {selectedOption === options[2] && <label>
                Depositor ERC20 Token Address
                <input type="text" id="depositorERC20Address" placeholder='0x00000......' />
            </label>}

            {selectedOption === options[2] && <label>
                Depositor ERC20 Amount
                <input type="text" id="depositor-token-amount" />
            </label>}

            <label>
                Beneficiary Address
                <input type="text" id="beneficiary" placeholder='0x00000......' />
            </label>

            {selectedOption === options[2] && <label>
                Beneficiary ERC20 Token Address
                <input type="text" id="beneficiaryERC20Address" placeholder='0x00000......' />
            </label>}

            {selectedOption !== options[2] && <label>
                Eth Deposit Amount
                <input type="text" id="amount" />
            </label>}

            <label style={{ display: selectedOption === options[1] ? 'flex' : 'none' }}>
                Token Required Amount
                <input type="text" id="token-amount" />
            </label>

            {selectedOption === options[2] && <label>
                Beneficiary ERC20 Amount
                <input type="text" id="beneficiary-token-amount" />
            </label>}

            {selectedOption === options[2] && false && <label>
                Expiry Time
                <input type="datetime-local" id="expiry-time" />
            </label>}

            <div className="button" id="deploy" onClick={(e) => {
                e.preventDefault();
                try {
                    newContract(selectedOption, options, signer, escrows, setEscrows, account);
                } catch (error) {
                    console.log(error);
                }
            }}
            >
                Deploy
            </div>
        </div>
    </div>)
}

export default Contract;
