export function escrowDataStringfy(escrow) {
    const object = {
        address: escrow.address,
        type: escrow.type,
        value: escrow.value,
        depositor: escrow.depositor,
        arbiter: escrow.arbiter,
        beneficiary: escrow.beneficiary,
        beneficiaryTokenAddress: escrow.beneficiaryTokenAddress,
        beneficiaryToken: escrow.beneficiaryToken,
        beneficiaryAmount: escrow.beneficiaryAmount,
        beneficiaryTokenApproved: false,
        depositorTokenAddress: escrow.depositorTokenAddress,
        depositorToken: escrow.depositorToken,
        depositorAmount: escrow.depositorAmount,
        depositorTokenApproved: false,
        expiry: '2069/12/12'
    }
    return object;
}