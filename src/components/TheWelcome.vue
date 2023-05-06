<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import HamsterConnectButton from "../../lib/components/HamsterConnectButton.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

   <hamster-connect-button/>
  </WelcomeItem>

</template>
