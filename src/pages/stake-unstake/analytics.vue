<template>
    <div class="row">
        <div class="col-12 col-sm-8 col-md-4 col-lg-4">
            <SingleChart  query-name="stake" title="Total Solana unstaked" column="0"  />
        </div>

         <div class="col-12 col-sm-8 col-md-4 col-lg-4">
            <SingleChart  query-name="stake" title="Total Solana staked" column="1"  />
        </div>

         <div class="col-12 col-sm-8 col-md-4 col-lg-4">
            <SingleChart  query-name="stake" title="Total Solana get reward" column="2"  />
        </div>

         <div class="col-12 col-sm-8 col-md-4 col-lg-4">
            <SingleChart  query-name="stake" title="Total Solana locked on staking pools " column="3"  />
        </div>

         <div class="col-12 col-sm-8 col-md-4 col-lg-4">
            <SingleChart  query-name="stake" title="Number of staking pools" column="4"  />
        </div>

         <div class="col-12 col-sm-8 col-md-4 col-lg-4">
            <SingleChart  query-name="stake" title="Number of stakers" column="5"  />
        </div>

    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="stakee" title="weekly unstake volume" label="" :axis="{x:'date', y:'unstake_volume' }" />
        </div>

      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded"  query-name="stakee" title="weekly stake volume" label="" :axis="{x:'date', y:'stake_volume' }" />
         </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="stakee" title="Weekly get reward volume" label="" :axis="{x:'date', y:'get_reward_volume' }" />
         </div>

         <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded"  query-name="stakee" title="Weekly unstake transaction number" label="" :axis="{x:'date', y:'unstake_number' }" />
         </div>

         <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded"  query-name="stakee" title="Weekly stake transaction number" label="" :axis="{x:'date', y:'stake_number' }" />
         </div>

         <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded"  query-name="stakee" title="Weekly get_reward transaction number" label="" :axis="{x:'date', y:'get_reward_number' }" />
         </div>

       
         
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="stoke" title="Cumulative weekly unstake volume" :point-radius="0" :axis="{x:'date', y:'cumulative_unstake_volume' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="stoke" title="Cumulative weekly stake volume" :point-radius="0" :axis="{x:'date', y:'cumulative_stake_volume' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="stoke" title="Cumulative Weekly get_reward volume" :point-radius="0" :axis="{x:'date', y:'cumulative_get_reward_volume' }" />
        </div>

         <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="stoke" title="Net flow of Solana swapping pools" :point-radius="0" :axis="{x:'date', y:'solana_flow' }" />
        </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart class="border rounded" query-name="stake1" dot-format-date title="Distribution of stakers based on how Solana they have on staking pools" :point-radius="0" :axis="{x:'range', y:'number' }" />
        </div>

    
        
      
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    components : {
        BarChart: () => import("@/components/charts/bar.vue"),
        // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
        LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
        SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>