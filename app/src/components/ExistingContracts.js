import {ERC20ToERC20Escrow} from '../utils/ERC20ToERC20Escrow';
import {ERC20Escrow} from '../utils/ERC20Escrow';
import {Escrow} from '../utils/Escrow';
import { WalletContext } from '../WallerContext';
import { useContext } from 'react';

function ExistingContracts() {
    const { escrows, options } = useContext(WalletContext);
    return (<div className="existing-contracts">
        <div className='existing-contracts-header'>
            <h2> Existing Contracts </h2>
        </div>

        <div id="container">
            {escrows.map((escrow) => {
                if (escrow.type === options[1]) {
                    return <ERC20Escrow key={escrow.address} {...escrow} />;
                } else if (escrow.type === options[2]) {
                    return <ERC20ToERC20Escrow key={escrow.address} {...escrow} />
                } else return <Escrow key={escrow.address} {...escrow} />;
            })}
        </div>
    </div>)
}

export default ExistingContracts;