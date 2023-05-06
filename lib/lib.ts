import {reactive, ref} from "vue";

import HamsterConnectButton from "./components/HamsterConnectButton.vue";
import StandardWallet , {localStorageKeys} from "./helpers/CoreWallet";
import {populateWalletList} from "./helpers/WalletStandard";

export default {
    install: (app : any, options :any) => {


        const suiAddress = localStorage.getItem(localStorageKeys.address) || null;
        app.provide("suiAddress", ref(suiAddress));

        const suiProvider = localStorage.getItem(localStorageKeys.provider) || null;
        app.provide("suiProvider", ref(suiProvider));

        const wallet = reactive(StandardWallet);
        app.provide("suiWallet", wallet);

        let walletProviders : any= [];
        app.provide("suiWalletProviders", walletProviders);
        // populate wallet list by listening to events of chrome extensions.
        populateWalletList(walletProviders);

        // add provider reference to wallet if logged in.
        if(suiProvider) wallet.activeProvider = walletProviders.find(x => x.name === suiProvider);

        app.provide('changeNetwork',wallet.switchNetwork)
        // register component globally
        app.component('hamster-connect-button', HamsterConnectButton);

    },
}

export {useHamsterWallet} from "./composables/useHamsterWallet";
