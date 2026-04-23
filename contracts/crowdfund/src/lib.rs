#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Vec, IntoVal};

#[contract]
pub struct CrowdfundContract;

#[contracttype]
pub enum DataKey {
    TotalFunds,
    Donors,
    TokenAddress,
}

#[contractimpl]
impl CrowdfundContract {
    pub fn initialize(env: Env, token_address: Address) {
        if env.storage().instance().has(&DataKey::TokenAddress) {
            panic!("already initialized");
        }
        env.storage().instance().set(&DataKey::TokenAddress, &token_address);
    }

    pub fn donate(env: Env, donor: Address, amount_stroops: i128) {
        donor.require_auth();

        let token_address: Address = env.storage().instance().get(&DataKey::TokenAddress).expect("not initialized");

        // Inter-contract call to the token contract to transfer tokens to this contract
        let _res: () = env.invoke_contract(
            &token_address,
            &soroban_sdk::symbol_short!("transfer"),
            soroban_sdk::vec![&env, donor.to_val(), env.current_contract_address().to_val(), amount_stroops.into_val(&env)],
        );

        let mut total: i128 = env.storage().instance().get(&DataKey::TotalFunds).unwrap_or(0);
        total += amount_stroops;
        env.storage().instance().set(&DataKey::TotalFunds, &total);

        let mut donors: Vec<Address> = env.storage().instance().get(&DataKey::Donors).unwrap_or(Vec::new(&env));
        if !donors.contains(&donor) {
            donors.push_back(donor.clone());
            env.storage().instance().set(&DataKey::Donors, &donors);
        }

        // Emit an event
        let topics = (soroban_sdk::symbol_short!("Donate"), donor);
        env.events().publish(topics, amount_stroops);
    }

    pub fn get_total_funds(env: Env) -> i128 {
        env.storage().instance().get(&DataKey::TotalFunds).unwrap_or(0)
    }

    pub fn get_donors(env: Env) -> Vec<Address> {
        env.storage().instance().get(&DataKey::Donors).unwrap_or(Vec::new(&env))
    }
}
