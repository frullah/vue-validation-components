<template>
  <ValidationObserver ref="observer" slim v-slot="{ handleSubmit, invalid }">
    <form ref="form" @submit.prevent="handleSubmit(onSubmitHandler)">
      <slot v-bind="{ invalid, processing }"></slot>
    </form>
  </ValidationObserver>
</template>

<script>
import Vue from 'vue'
import { ValidationObserver } from 'vee-validate'

export default Vue.extend({
  name: 'FormWithValidation',
  components: { ValidationObserver },
  props: {
    onSubmit: { type: Function, required: true }
  },
  data: () => ({
    processing: false
  }),
  methods: {
    reset () {
      this.$refs.observer.reset()
    },
    async onSubmitHandler () {
      if (this.processing) return

      this.processing = true
      try {
        await this.onSubmit()
      } finally {
        this.processing = false
      }
    }
  }
})
</script>
