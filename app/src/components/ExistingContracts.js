import {ERC20ToERC20Escrow} from '../utils/ERC20ToERC20Escrow';
import {ERC20Escrow} from '../utils/ERC20Escrow';
import {Escrow} from '../utils/Escrow';
import { WalletContext } from '../WallerContext';
import { useContext, useEffect, useRef } from 'react';
import { getEscrowContracts } from '../utils/getExistingContracts';

function ExistingContracts() {
    const { escrows, options, signer, setEscrows } = useContext(WalletContext);
    const isExistingContractUpdated = useRef(false);
    const updatedExistingContract = async () => await getEscrowContracts(signer, setEscrows);
    if (!isExistingContractUpdated.current){
        isExistingContractUpdated.current = updatedExistingContract();
    }
    useEffect(() => {
        updatedExistingContract();
    }, [signer]);
    return (<div className="existing-contracts">
        <div className='existing-contracts-header'>
        <img src={require('../images/list-contract.webp')} className='logo' alt='create-contract' />
            <h2> Existing Contracts </h2>
        </div>
        <div id="container" className='existing-contracts-data'>
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