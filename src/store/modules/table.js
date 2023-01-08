
const state = {
    queries: {
        'rich-list': {
            result: null,
            sql: `with sol_prices as (
              select RECORDED_HOUR, SYMBOL, 
              case 
              when SYMBOL='USDT' then 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
              when SYMBOL='SRM' then 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt'
              when SYMBOL='MSOL' then 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'
              when SYMBOL='RAY' then '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R'
              when SYMBOL='SBR' then 'Saber2gLauYim4Mvftnrasomsv6NvAuncvMEZwcLpD1'
              when SYMBOL='SOL' then 'So11111111111111111111111111111111111111112'
              when SYMBOL='FIDA' then 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp'
              when SYMBOL='MER' then 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K'
              when SYMBOL='MNGO' then 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac'
              when SYMBOL='JET' then 'JET6zMJWkCN9tpRT2v2jfAmm5VnQFDpUBCyaKojmGtz'
              when SYMBOL='STSOL' then '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj'
              when SYMBOL='USTC' then '9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i'
              when SYMBOL='FTT' then 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3'
              when SYMBOL='USDC' then 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
              when SYMBOL='SLND' then 'SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp'
              when SYMBOL='COPE' then '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh'
              end as address, avg(CLOSE) as price 
              from solana.core.fact_token_prices_hourly
              where RECORDED_HOUR>=CURRENT_DATE-1000
              group by 1,2,3),
          
          sol_txs as (
              select BLOCK_ID, BLOCK_TIMESTAMP, TX_ID, SIGNERS[0] as user, FEE/10e9 as TX_FEE, TX_FEE*price as FEE_USD, SUCCEEDED, price
              from solana.core.fact_transactions a 
              join sol_prices b 
              on b.address='So11111111111111111111111111111111111111112' and date_trunc(hour,BLOCK_TIMESTAMP)=date_trunc(hour,RECORDED_HOUR)
              where BLOCK_TIMESTAMP>=CURRENT_DATE-1000),
          
          sol_transfers as (
              select a.BLOCK_TIMESTAMP, a.TX_ID, a.user, sum(usd_amount) as usd_amount, TX_FEE as FEE, FEE_USD
              from
              (select BLOCK_TIMESTAMP, TX_ID, TX_FROM as user, ifnull(AMOUNT*price,0) as usd_amount
              from solana.core.fact_transfers a 
              left join sol_prices b 
              on a.mint=b.address and date_trunc(hour,BLOCK_TIMESTAMP)=date_trunc(hour,RECORDED_HOUR)
              where BLOCK_TIMESTAMP>=CURRENT_DATE-1000) a
              join sol_txs b 
              on a.TX_ID=b.TX_ID
              group by 1,2,3,5,6)
            
            
            select user, sum(tx_fee) as total_fee, sum(ifnull(FEE_USD,0)) as total_FEE_USD, avg(FEE_USD) as avg_FEE_USD,
            row_number() over (order by total_FEE_USD desc) as rank
            from sol_txs
            group by 1  
            order by total_FEE_USD desc 
            limit 20`
        },
        'The-top-20-addresses-with-the-most-bridged-out-Luna': {
            result: null,
            sql: `with bridge_out as
            (select date_trunc('day',BLOCK_TIMESTAMP) as date,MESSAGE_VALUE['sender'] as senderr, MESSAGE_VALUE['receiver'] as receiverr,(AMOUNT/1e6) as volume
              , 
              case 
              when SUBSTR(receiverr, 0, 4) = 'osmo' then 'osmo' 
              when SUBSTR(receiverr, 0, 4) = 'axel' then 'axelar' 
              when SUBSTR(receiverr, 0, 4) = 'grav' then 'GRAV' 
              when SUBSTR(receiverr, 0, 4) = 'secr' then 'secret' 
              when SUBSTR(receiverr, 0, 4) = 'terr' then 'terra' 
              when SUBSTR(receiverr, 0, 3) = 'cre' then 'CRE'
              when SUBSTR(receiverr, 0, 3) = 'sif' then 'SIF'
              when SUBSTR(receiverr, 0, 4) = 'kuji' then 'kujira'
              when SUBSTR(receiverr, 0, 4) = 'cosm' then 'cosmos'
              when SUBSTR(receiverr, 0, 4) = 'evmo' then 'evmos'
              when SUBSTR(receiverr, 0, 4) = 'stri' then 'STRI'
              when SUBSTR(receiverr, 0, 4) = 'juno' then 'juno'
              else null end as blockchain
            
              
              from terra.core.ez_transfers
            where 
            MESSAGE_TYPE='/ibc.applications.transfer.v1.MsgTransfer' and CURRENCY='uluna')
            
            select sum(volume) as volume ,senderr from bridge_out 
            
            group by 2 
            order by 1 desc 
            limit 20`
        },
        'Stable-coin-supply': {
            result: null,
            sql: `(select 
 
                sum(case when to_CURRENCY='ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4' then to_AMOUNT/1e6 else null end) -
                sum(case when FROM_CURRENCY='ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4' then FROM_AMOUNT/1e6 else null end) as volume, 'AXlusdc' as stablecoin
              
               
              from 
              
              terra.core.ez_swaps)
              
              union all 
              
              (select 
               
               
                sum(case when to_CURRENCY='terra1rwg5kt6kcyxtz69acjgpeut7dgr4y3r7tvntdxqt03dvpqktrfxq4jrvpq' then to_AMOUNT/1e6 else null end) as volume,'ust' as stablecoin
              
                
              from 
              
              terra.core.ez_swaps)
              
              
              union all 
              
              (select 
               
              
                 sum(case when to_CURRENCY='terra1uc3r74qg44csdrl8hrm5muzlue9gf7umgkyv569pgazh7tudpr4qdtgqh6' then to_AMOUNT/1e6 else null end) as volume ,'usdc' as stablecoin
                
                
              from 
              
              terra.core.ez_swaps)
              
              
              
              union all 
              
              (select 
               
               
                 sum(case when to_CURRENCY='terra1ery8l6jquynn9a4cz2pff6khg8c68f7urt33l5n9dng2cwzz4c4qj3spm2' then to_AMOUNT/1e6 else null end) as volume , 'usdt' as stablecoin
                
              from 
              
              terra.core.ez_swaps)
              
              union all 
              
              
              
              (select 
               
                -sum(case when to_CURRENCY='ibc/CBF67A2BCF6CAE343FDF251E510C8E18C361FC02B23430C121116E0811835DEF' then to_AMOUNT/1e6 else null end) +
                sum(case when FROM_CURRENCY='ibc/CBF67A2BCF6CAE343FDF251E510C8E18C361FC02B23430C121116E0811835DEF' then FROM_AMOUNT/1e6 else null end) as volume, 'AXlusdt' as stablecoin
              
                
              from 
              terra.core.ez_swaps)`
        }
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
