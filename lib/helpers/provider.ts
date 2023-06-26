
export interface Account {
    address: string
}
export interface Accounts {
    accounts: Account[]
}

export interface WalletProvider {
    connect(): Promise<Accounts>
    logout(): Promise<void>
    switchNetwork(network_id: string): Promise<any>
    getWallet(): any
}