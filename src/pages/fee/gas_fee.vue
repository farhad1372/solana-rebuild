<template>
    <div>
    
       
        
        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="jiji" title="Solana Hourly Gas Fee (In $SOL) Over Time" :point-radius="0" :axis="{x:'date', y:'fee' }" />
        </div>

        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <LineChart class="border rounded" query-name="jiji" title="Solana Hourly Gas Price" :point-radius="0" :axis="{x:'date', y:'fee_usd' }" />
        </div>

         <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <BarChart dot-format-date class="border rounded"  query-name="numberr" title="Weekly active user" label="" :axis="{x:'user', y:'total_fee' }" />
         </div>

 <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <DataTable title="Solana Top Fee Spenders" query-name="rich-list"
                    :haders="['user', 'total_fee','total_fee_usd', 'total_fee','avg_fee_usd', 'rank']" :dataNames="['user', 'total_fee','total_fee_usd', 'total_fee','avg_fee_usd', 'rank']" />
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
        //SingleChart: () => import("@/components/charts/single.vue"),
        DataTable: () => import("@/components/table.vue")
    }
}
</script>