import {inject} from "vue";

export function useHamsterWallet(){

    const suiWallet = inject("suiWallet");
    const walletProviders = inject("suiWalletProviders");
    const suiAddress = inject("suiAddress");
    const suiProvider = inject("suiProvider");
    const changeNetwork = inject("changeNetwork")

    return {
        suiWallet,
        walletProviders,
        suiAddress,
        suiProvider,
        changeNetwork,
    };
}
