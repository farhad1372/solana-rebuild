<template>
    <div class="row">
    
        <div class="col-12 col-md-12">
        <BarChart class="border rounded" query-name="bridge3" title="Daily flow out from wormhole bridge (US dollars $)" label="" :axis="{x:'day', y:'volume_usd' }" /> 
</div>
        <div class="col-12 col-md-12">
        <BarChart class="border rounded" query-name="bridge33" title="Weekly bridge in form Ethereum to Solana (US dollars $)" label="" :axis="{x:'date', y:'volume_usd' }" /> 
</div>
  
        <div class="col-12 col-md-12">
        <BarChart class="border rounded" dot-format-date  query-name="bridge4" title="Total tokens bridge in to Solana from Ethereum  " label="" :axis="{x:'symbol', y:'volume_usd' }" />
</div>
        <div class="col-12 col-md-12"> 
        <BarChart class="border rounded" dot-format-date  query-name="bridge7" title="Total tokens bridge in to Solana from Ethereum  " label="" :axis="{x:'symbol', y:'volume_usd' }" />
</div>
        <div class="col-12 col-md-12">
        <BarChart class="border rounded" dot-format-date  query-name="bridge8" title="Tokens flow out from wormhole bridge (US dollars $) " label="" :axis="{x:'symbol', y:'volume_usd' }" />
</div>
        <div class="col-12 col-md-12">  
        <BarChart class="border rounded" dot-format-date  query-name="bridge10" title="Tokens flow out from wormhole bridge (US dollars $) in last week" label="" :axis="{x:'symbol', y:'volume_usd' }" />   
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
        // LineChart: () => import("@/components/charts/line.vue"),
        // MixedChart: () => import("@/components/charts/mixed.vue"),
       // SingleChart: () => import("@/components/charts/single.vue")
    }
}
</script>