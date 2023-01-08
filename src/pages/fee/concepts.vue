<template>
  <div class="row">
    <div calss="col-12">
      <img src="@/assets/images/cost.webp" style="width: 100%" />
      <h2 class="mt-10">Transaction Fees</h2>
      <p>
       The small fees paid to process instructions on the Solana blockchain are known as "transaction fees".<br />
       As each transaction (which contains one or more instructions) is sent through the network, it gets processed by the current leader validation-client. Once confirmed as a global state transaction, this transaction fee is paid to the network to help support
       the economic design of the Solana blockchain.<br />
       NOTE: Transaction fees are different from account rent! While transaction fees are paid to process instructions on the Solana network, rent is paid to store data on the blockchain.<br />
      </p>
      <h2 class="mt-10">Why pay transaction fees?</h2>
      <p>
      Transaction fees offer many benefits in the Solana economic design described below. Mainly:<br />
      <ul>
     <li>they provide compensation to the validator network for the CPU/GPU resources necessary to process transactions,</li>
     <li>reduce network spam by introducing real cost to transactions,</li>
     <li>and provide potential long-term economic stability of the network through a protocol-captured minimum fee amount per transaction</li>
     NOTE: Network consensus votes are sent as normal system transfers, which means that validators pay transaction fees to participate in consensus.
</ul>
      </p>
      <h2 class="mt-10">Basic economic design</h2>
      <p>
      Many current blockchain economies (e.g. Bitcoin, Ethereum), rely on protocol-based rewards to support the economy in the short term. And when the protocol derived rewards expire, predict that the revenue generated through transaction fees will support <br />
      the economy in the long term.<br />
      In an attempt to create a sustainable economy on Solana through protocol-based rewards and transaction fees:<br />
      <ul>
     <li>a fixed portion (initially 50%) of each transaction fee is burned (aka destroyed),</li>
     <li>with the remaining fee going to the current leader processing the transaction.</li>
</ul>
A scheduled global inflation rate provides a source for rewards distributed to Solana Validators.
      </p>
      <h3 class="mt-5">Why burn some fees?</h3>
      <p>
      As mentioned above, a fixed proportion of each transaction fee is burned (aka destroyed). The intent of this design is to retain leader incentive to include as many transactions as possible within the leader-slot time. While still providing an inflation limiting<br />
      mechanism that protects against "tax evasion" attacks (i.e. side-channel fee payments).<br />
      Burnt fees can also help prevent malicious validators from censoring transactions by being considered in fork selection.<br />
      </p>
      <h3 class="mt-5">Example of an attack</h3>
      <p>
     In the case of a Proof of History (PoH) fork with a malicious, censoring leader:<br />
     <ul>
     <li>due to the fees lost from censoring, we would expect the total fees destroyed to be less than a comparable honest fork</li>
     <li>if the censoring leader is to compensate for these lost protocol fees, they would have to replace the burnt fees on their fork themselves</li>
     <li>thus potentially reducing the incentive to censor in the first place</li>
</ul>
      </p>
      <h3 class="mt-5">Calculating transaction fees</h3>
     <p>
     Transactions fees are calculated based on two main parts:<br />
     <ul>
     <li>a statically set base fee per signature, and</li>
   <li>the computational resources used during the transaction, measured in "compute units"</li>
</ul>

Since each transaction may require a different amount of computational resources, they are alloted a maximum number of compute units per transaction known as the "compute budget".<br />
The execution of each instruction within a transactions consumes a different number of compute units. After the maximum number of computer units has been consumed (aka compute budget exhaustion), the runtime will halt the transaction and return an <br />
error. Resulting in a failed transaction.<br />
     </p>


    </div>
  </div>
</template>
