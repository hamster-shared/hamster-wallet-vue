import {MetamaskProvider} from "./MetamaskProvider"
import {ArgentXProvider} from "./ArgentXProvider";
import {PetraProvider} from "./PetraProvider";
const walletStandardEvents = ['standard:connect', 'standard:events', 'sui:signAndExecuteTransactionBlock'];
/*
    Checks if the wallet has all the standard wallet properties from the wallet-standards.
 */
export const isWalletStandardWallet = wallet => {
    return walletStandardEvents.every((key) => wallet.features.hasOwnProperty(key));
}

/*
    Registers a wallet to the supplied walletList.
 */
const registration = (wallet, walletList) => {
    console.log('registration:', wallet)
    // make sure the wallet we are adding to the list is valid by wallet-standards.
    if(!isWalletStandardWallet(wallet)) return;

    // avoid duplicates
    if(!walletList.find(x => x.name === wallet.name)) walletList.push(wallet);
}

// dispatch an event that the app is ready to get wallets from chrome.
const dispatchAppReadyEvent = (walletList) => {
    try {
        window.dispatchEvent(new CustomEvent('wallet-standard:app-ready', {
            detail:{
                register: (wallet) => registration(wallet, walletList)
            },
            bubbles: false,
            cancelable: false,
            composed: false
        }));
    } catch (error) {
        console.error('wallet-standard:app-ready event could not be dispatched\n', error);
    }
}

// initialize the event listener (to add extra wallets if registered to the set)
// and dispatch an "app is ready to get events" event.
export const populateWalletList = (walletList = []) => {

    // save a listener for register-wallet events.
    window.addEventListener('wallet-standard:register-wallet', (data) => {
            data.detail({register: (wallet) => registration(wallet, walletList)});
        }
    );

    // dispatch "app ready" event to receive list of wallets.
    dispatchAppReadyEvent(walletList);


    window.addEventListener('load', function() {
        if (window.ethereum) {
            console.log('Ethereum support is available')
            if (window.ethereum.isMetaMask) {
                console.log('MetaMask is active')
                // const provider = new ethers.providers.Web3Provider(window.ethereum)
                const provider = new MetamaskProvider()
                registration(provider,walletList)

                const argentXProvider = new ArgentXProvider()
                registration(argentXProvider,walletList)

                const petraProvider = new PetraProvider()
                registration(petraProvider,walletList)
            } else {
                console.log('MetaMask is not available')
            }
        } else {
            console.log('Ethereum support is not found')
        }
    })

    // returns the reference to the walletList
    return walletList;

}
