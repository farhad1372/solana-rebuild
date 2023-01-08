<template>
  <div class="row">
    <div calss="col-12">
      <img class="rounded" src="@/assets/images/solana.webp" style="width: 100%" />
    <h2 class="mt-10">What Is Solana (SOL)?</h2>
    <p>
      Solana is a blockchain platform designed to host decentralized, scalable applications. Founded in 2017, it is an open-source project currently run by Solana Foundation
     based in Geneva, while the blockchain was built by San Francisco-based Solana Labs.<br />
     Solana is much faster in terms of the number of transactions it can process and has significantly lower transaction fees than rival blockchains like Ethereum. The<br />
     cryptocurrency that runs on the Solana blockchain—also named Solana (SOLUSD) and using the ticker symbol SOL—soared almost 12,000% in 2021 and at one point 
     had a market capitalization of over $66 billion, making it the fifth-largest cryptocurrency by this measure at the time.<br />
     Despite its popularity, SOL did not escape the cryptocurrency bloodbath of 2022. By Oct. 3, 2022, SOL had dropped to about $11.71 billion in market capitalization. It 
     also fell to ninth place in market capitalization.<br />
    </p>
    <h2 class="mt-10">Proof-of-History Concept</h2>
    <p>
    Solana co-founder Anatoly Yakovenko published a white paper in November 2017 describing the proof-of-history (PoH) concept. PoH is a proof for verifying order and 
    passage of time between events, and it is used to encode trustless passage of time into a ledger.<br />
    In the white paper, Yakovenko notes that blockchains that were then publicly available did not rely on time, with each node in the network relying on its own local clock
    without knowledge of any other participants' clocks in the network. The lack of a trusted source of time (i.e., a standardized clock) meant that when a message 
    timestamp was used to accept or reject a message, there was no guarantee that every other participant in the network would make the exact same choice.<br />
    </p>
    <h2 class="mt-10">Solana's Technology</h2>
    <p>
    Solana's architecture aims to demonstrate a set of software algorithms that eliminate software as a performance bottleneck when combined with a blockchain. The 
  combination enables transaction throughput to scale proportionally with network bandwidth.<br />
  Solana's architecture satisfies all three desirable attributes for a blockchain: it's scalable, secure, and decentralized. Its architecture describes a theoretical upper limit of 
  710,000 TPS on a standard gigabit network and 28.4 million TPS on a 40-gigabit network.<br />
  Solana's blockchain operates on both a proof-of-history (PoH) and proof-of-stake (PoS) consensus model. PoS permits validators (those who validate transactions
  added to the blockchain ledger) to verify transactions based on how many coins or tokens they hold; PoH allows those transactions to be timestamped and verified very quickly. <br />
    </p>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    //  BarChart: () => import("@/components/charts/bar.vue"),
    // DoughnutChart: () => import("@/components/charts/doughnut.vue"),
    // LineChart: () => import("@/components/charts/line.vue"),
    // MixedChart: () => import("@/components/charts/mixed.vue"),
    // SingleChart: () => import("@/components/charts/single.vue")
  },
};
</script>
