<template>
  <ValidationObserver slim v-slot="{ handleSubmit, invalid }">
    <form ref="form" @submit.prevent="handleSubmit(onSubmitHandler)">
      <slot :invalid="invalid"></slot>
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
