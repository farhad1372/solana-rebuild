
const state = {
  queries: {
    //General
    'numberr': {
      result: null,
      sql: `select sum(FEE/1e9) as transaction_fee, count(*) as number , avg(FEE/1e9) as agfees, count(distinct SIGNERS[0]) as daily_active_user, count(case when SUCCEEDED='TRUE' then 1 else null end)*100/number as success_rate, date_trunc('week',BLOCK_TIMESTAMP) as date, number/daily_active_user as transaction_per_user, sum(number) over (order by date) as cumulative_transactions from solana.core.fact_transactions group by date order by date asc`
    },

    //blocks_miners

    'blocks_miners': {
      result: null,
      sql: `select avg(TX_COUNT) as average_per_block , avg(TOTAL_DIFFICULTY) as TOTAL_DIFFICULTY_per_block, avg(GAS_USED) as GAS_USED_per_block, avg(GAS_LIMIT) as GAS_LIMIT_per_block, avg(SIZE) as SIZE_per_block, count(distinct MINER) as miner_number, sum(GAS_USED)/miner_number as per_miner, date_trunc('week',BLOCK_TIMESTAMP ) as DATE from ethereum.core.fact_blocks group by date order by date asc`
    },

    'lala': {
      result: null,
      sql: `with sol_prices as ( select RECORDED_HOUR, SYMBOL, case when SYMBOL='USDT' then 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' when SYMBOL='SRM' then 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt' when SYMBOL='MSOL' then 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So' when SYMBOL='RAY' then '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R' when SYMBOL='SBR' then 'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1' when SYMBOL='SOL' then 'So11111111111111111111111111111111111111112' when SYMBOL='FIDA' then 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp' when SYMBOL='MER' then 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K' when SYMBOL='MNGO' then 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac' when SYMBOL='JET' then 'JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz' when SYMBOL='STSOL' then '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj' when SYMBOL='USTC' then '9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i' when SYMBOL='FTT' then 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3' when SYMBOL='USDC' then 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' when SYMBOL='SLND' then 'SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp' when SYMBOL='COPE' then '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh' end as address, avg(CLOSE) as price from solana.core.fact_token_prices_hourly where RECORDED_HOUR>=CURRENT_DATE-1000 group by 1,2,3), sol_txs as ( select BLOCK_ID, BLOCK_TIMESTAMP, TX_ID, SIGNERS[0] as user, FEE/10e9 as TX_FEE, TX_FEE*price as FEE_USD, SUCCEEDED, price from solana.core.fact_transactions a join sol_prices b on b.address='So11111111111111111111111111111111111111112' and date_trunc(hour,BLOCK_TIMESTAMP)=date_trunc(hour,RECORDED_HOUR) where BLOCK_TIMESTAMP>=CURRENT_DATE-1000), sol_transfers as ( select a.BLOCK_TIMESTAMP, a.TX_ID, a.user, sum(usd_amount) as usd_amount, TX_FEE as FEE, FEE_USD from (select BLOCK_TIMESTAMP, TX_ID, TX_FROM as user, ifnull(AMOUNT*price,0) as usd_amount from solana.core.fact_transfers a left join sol_prices b on a.mint=b.address and date_trunc(hour,BLOCK_TIMESTAMP)=date_trunc(hour,RECORDED_HOUR) where BLOCK_TIMESTAMP>=CURRENT_DATE-1000) a join sol_txs b on a.TX_ID=b.TX_ID group by 1,2,3,5,6) select user, sum(tx_fee) as total_fee, sum(ifnull(FEE_USD,0)) as total_FEE_USD, avg(FEE_USD) as avg_FEE_USD, row_number() over (order by total_FEE_USD desc) as rank from sol_txs group by 1 order by total_FEE_USD desc limit 20`
    },
    'miners': {
      result: null,
      sql: `with t1 as (select sum(TX_FEE) as tx_fee, date_trunc('month',BLOCK_TIMESTAMP) as date from ethereum.core.fact_transactions group by date) , t2 as (select sum((GAS_USED/1e9)*(BLOCK_HEADER_JSON['base_fee_per_gas']/1e9)) as eth_burn, date_trunc('month',BLOCK_TIMESTAMP) as datee, case when BLOCK_TIMESTAMP<'	2021-08-01' then 'before' else 'after' end as v from ethereum.core.fact_blocks group by datee ,v ) , f as (select case when DATE < '2021-08-01' then TX_FEE else TX_FEE-ETH_BURN end as miners_tip , date ,v,ETH_BURN from t1 a inner join t2 b on a.date=b.datee) select *, sum(miners_tip) over (order by date) as Total_miners_tip from f order by date asc`
    },

    //NFT mints 
    'projects': {
      result: null,
      sql: `with t1 as (select count(*) as number, PROGRAM_ID from solana.core.fact_nft_mints group by PROGRAM_ID order by number desc) select NUMBER,PROGRAM_ID,ADDRESS_NAME from t1 a inner join solana.core.dim_labels b on a.PROGRAM_ID=b.ADDRESS`
    }
    ,
    'dailymint': {
      result: null,
      sql: `select count(*) as number, date_trunc('week',BLOCK_TIMESTAMP) as DATE , sum(number) over (order by date) as cumulative_number from solana.core.fact_nft_mints group by date order by date asc`
    },
    //NFT seals 

    'dailyseals': {
      result: null,
      sql: `select count(*) as number , sum(SALES_AMOUNT) as volume , date_trunc('week',BLOCK_TIMESTAMP ) as DATE, sum(volume) over (order by date) as C_volume from solana.core.fact_nft_sales group by date order by date asc`
    },

    'platform': {
      result: null,
      sql: `select count(*) as number, sum(SALES_AMOUNT) as volume, MARKETPLACE from solana.core.fact_nft_sales group by MARKETPLACE`
    },

    'stakee': {
      result: null,
      sql: `select date_trunc('week',BLOCK_TIMESTAMP) as DATE, sum (case when ACTION in ('withdraw_dao_stake','withdraw','withdraw_stake','withdraw_dao') then AMOUNT/1e9 else null end ) as unstake_volume, sum (case when ACTION in ('deposit_dao_with_referrer','deposit_dao_stake','deposit_dao','deposit','deposit_stake') then AMOUNT/1e9 else null end ) as stake_volume, sum (case when ACTION in ('claim') then AMOUNT/1e9 else null end ) as get_reward_volume, count (case when ACTION in ('withdraw_dao_stake','withdraw','withdraw_stake','withdraw_dao') then 1 else null end) as unstake_number, count (case when ACTION in ('deposit_dao_with_referrer','deposit_dao_stake','deposit_dao','deposit','deposit_stake') then 1 else null end ) as stake_number, count (case when ACTION in ('claim') then 1 else null end ) as get_reward_number, sum(stake_volume) over (order by date) as cumulative_stake_volume, sum(unstake_volume) over (order by date) as cumulative_unstake_volume, sum(get_reward_volume) over (order by date) as cumulative_get_reward_volume, cumulative_stake_volume-(cumulative_unstake_volume+cumulative_get_reward_volume) as solana_flow from solana.core.fact_stake_pool_actions group by date order by date asc`
    },
    'stake1': {
      result: null,
      sql: `with ggg as (select sum(case when ACTION in ('withdraw_dao_stake','withdraw','withdraw_stake','withdraw_dao') then AMOUNT/1e9 else null end) as staking_volume, sum(case when ACTION in ('deposit_dao_with_referrer','deposit_dao_stake','deposit_dao','deposit','deposit_stake') then AMOUNT/1e9 else null end ) as unstaking_volume, ADDRESS from solana.core.fact_stake_pool_actions group by ADDRESS ) , joon as (select case when staking_volume is null then 0 else staking_volume end as staking, case when unstaking_volume is null then 0 else unstaking_volume end as unstaking, staking-unstaking as near_locked, ADDRESS from ggg order by near_locked desc ) (select count(*) as number , '0-1' as range from joon where near_locked between 0 and 1) union ALL (select count(*) as number , '1-10' as range from joon where near_locked between 1 and 10) union ALL (select count(*) as number , '10-100' as range from joon where near_locked between 10 and 100) union ALL (select count(*) as number , '100-1000' as range from joon where near_locked between 100 and 1000) union ALL (select count(*) as number , '1000-10000' as range from joon where near_locked between 1000 and 10000) union ALL (select count(*) as number , '10000-100000' as range from joon where near_locked between 10000 and 100000) union ALL (select count(*) as number , '100000-1000000' as range from joon where near_locked between 100000 and 1000000)`
    },
    // bridge
    'bridge3': {
      result: null,
      sql: `with prices as ( select block_timestamp::date as day, swap_from_mint as mint, median (swap_to_amount/swap_from_amount) as price_usd from solana.fact_swaps where swap_to_mint in ('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v','Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB') and swap_to_amount > 0 and swap_from_amount > 0 and succeeded = 1 group by 1,2 ), wormhole as ( select distinct(tx_id) as tx_id from solana.core.fact_events where program_id = 'wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb' ) select day as date, case when day >= '2022-11-08' then 'After FTX/Alameda News' else 'Before FTX/Alameda News' end as timespan, count(distinct tx_id) as txn_count, count(distinct tx_from) as users_count, txn_count / users_count as tx_per_user, sum(amount * price_usd) as volume_usd, volume_usd / users_count as volume_per_user, avg(amount * price_usd) as volume_usd_avg, median(amount * price_usd) as volume_usd_median, sum(txn_count) over (order by day asc) as comulative_txn_count, sum(users_count) over (order by day asc) as comulative_users_count, sum(volume_usd) over (order by day asc) as comulative_volume_usd, sum(volume_usd_avg) over (order by day asc) as comulative_volume_usd_avg from solana.core.fact_transfers join prices using (mint) where tx_id in (select tx_id from wormhole) and block_timestamp::date = day group by day, timespan order by day`
    },
    'bridge33': {
      result: null,
      sql: `with prices as ( select trunc(hour, 'week') as day, symbol, avg(price) from ethereum.core.fact_hourly_token_prices group by 1, 2 ) select day as date, case when day >= '2022-11-08' then 'After FTX/Alameda News' else 'Before FTX/Alameda News' end as timespan, case origin_function_signature when '0xc6878519' then 'ETH -> Sol' else 'Sol -> ETH' end as type, count(distinct tx_hash) as txn_count, count(distinct a.from_address) as users_count, txn_count / users_count as tx_per_user, sum(amount_usd) as volume_usd, volume_usd / users_count as volume_per_user, avg(amount_usd) as volume_usd_avg, median(amount_usd) as volume_usd_median, sum(txn_count) over (order by date asc) as comulative_txn_count, sum(users_count) over (order by date asc) as comulative_users_count, sum(volume_usd) over (order by date asc) as comulative_volume_usd, sum(volume_usd_avg) over (order by date asc) as comulative_volume_usd_avg from ethereum.core.fact_transactions a join ethereum.core.ez_token_transfers b using (tx_hash) join prices on trunc(block_timestamp, 'week') = prices.day and prices.symbol = b.symbol where 1 = 1 and origin_function_signature in ('0xc6878519', '0x0f5287b0','0x9981509f') and to_address = '0x3ee18b2214aff97000d974cf647e7c347e8fa585' and substring(input_data, 202, 1) = '1' and status = 'SUCCESS' group by date, type, timespan order by date`
    },

    'bridge4': {
      result: null,
      sql: `select symbol, count(distinct tx_hash) as txn_count, count(distinct from_address) as users_count, txn_count / users_count as tx_per_user, sum(amount_usd) as volume_usd, volume_usd / users_count as volume_per_user, avg(amount_usd) as volume_usd_avg, median(amount_usd) as volume_usd_median from ethereum.core.ez_token_transfers where 1 = 1 and origin_function_signature in ('0xc6878519', '0x0f5287b0','0x9981509f') and block_timestamp >= '2022-10-01' and to_address = '0x3ee18b2214aff97000d974cf647e7c347e8fa585' and amount_usd > 0 and symbol is not null and symbol != '' group by symbol order by txn_count desc limit 10`
    },

    'bridge7': {
      result: null,
      sql: `select symbol, count(distinct tx_hash) as txn_count, count(distinct from_address) as users_count, txn_count / users_count as tx_per_user, sum(amount_usd) as volume_usd, volume_usd / users_count as volume_per_user, avg(amount_usd) as volume_usd_avg, median(amount_usd) as volume_usd_median from ethereum.core.ez_token_transfers where 1 = 1 and origin_function_signature in ('0xc6878519', '0x0f5287b0','0x9981509f') and block_timestamp >= '2022-10-01' and to_address = '0x3ee18b2214aff97000d974cf647e7c347e8fa585' and amount_usd > 0 and symbol is not null and symbol != '' group by symbol order by txn_count desc limit 10`
    },

    'bridge8': {
      result: null,
      sql: `with prices as ( select block_timestamp::date as day, swap_from_mint as mint, median (swap_to_amount/swap_from_amount) as price_usd from solana.fact_swaps where swap_to_mint in ('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v','Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB') and swap_to_amount > 0 and swap_from_amount > 0 and succeeded = 1 group by 1,2 ), wormhole as ( select distinct(tx_id) as tx_id from solana.core.fact_events where program_id = 'wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb' ) select label as type, count(distinct tx_id) as txn_count, count(distinct tx_from) as users_count, txn_count / users_count as tx_per_user, sum(amount * price_usd) as volume_usd, volume_usd / users_count as volume_per_user, avg(amount * price_usd) as volume_usd_avg, median(amount * price_usd) as volume_usd_median from solana.core.fact_transfers join prices using (mint) left outer join solana.core.dim_labels on mint = address where tx_id in (select tx_id from wormhole) and block_timestamp::date = day and label is not null group by label order by volume_usd desc limit 10`
    },

    'bridge10': {
      result: null,
      sql: `with prices as ( select block_timestamp::date as day, swap_from_mint as mint, median (swap_to_amount/swap_from_amount) as price_usd from solana.fact_swaps where swap_to_mint in ('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v','Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB') and swap_to_amount > 0 and swap_from_amount > 0 and succeeded = 1 group by 1,2 ), wormhole as ( select distinct(tx_id) as tx_id from solana.core.fact_events where program_id = 'wormDTUJ6AWPNvk59vGQbDvGJmqbDTdgWgAqcLBCgUb' ) select label as type, count(distinct tx_id) as txn_count, count(distinct tx_from) as users_count, txn_count / users_count as tx_per_user, sum(amount * price_usd) as volume_usd, volume_usd / users_count as volume_per_user, avg(amount * price_usd) as volume_usd_avg, median(amount * price_usd) as volume_usd_median from solana.core.fact_transfers join prices using (mint) left outer join solana.core.dim_labels on mint = address where tx_id in (select tx_id from wormhole) and block_timestamp::date = day and block_timestamp>CURRENT_DATE-7 and label is not null group by label order by volume_usd desc limit 10`
    },
  },

};

const getters = {
  getQueries(state) {
    return state.queries;
  },
};

const mutations = {
  setQueryResult(state, data) { // data => query, result
    state.queries[data.query].result = data.result;
  },
};



export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
