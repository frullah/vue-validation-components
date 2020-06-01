import FormWithValidation from '../FormWithValidation.vue'
import { mount, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import { ValidationObserverPass } from '@test/unit/mocks/components'

describe('FormWithValidation component', () => {
  it('should not run onSubmit during processing', async () => {
    const wrapper = shallowMount(FormWithValidation, {
      propsData: { onSubmit: jest.fn() },
      data: () => ({ processing: true }),
      stubs: { ValidationObserver: ValidationObserverPass }
    })
    wrapper.findComponent({ ref: 'form' }).trigger('submit')
    await flushPromises()
    expect(wrapper.vm.onSubmit).not.toBeCalled()
  })

  it('should run onSsubmit on form submit', async () => {
    const wrapper = shallowMount(FormWithValidation, {
      propsData: { onSubmit: jest.fn() },
      stubs: { ValidationObserver: ValidationObserverPass }
    })
    wrapper.findComponent({ ref: 'form' }).trigger('submit')
    await flushPromises()
    expect(wrapper.vm.onSubmit).toBeCalledTimes(1)
  })

  it('have slot scope named invalid passed by ValidationObserver', () => {
    [false, true].forEach(state => {
      const wrapper = mount({
        template: '<FormWithValidation :onSubmit="() => {}" v-slot="x"><test ref="x" v-bind="x"/></FormWithValidation>',
        components: {
          FormWithValidation,
          test: { template: '<div/>' }
        }
      }, {
        stubs: {
          ValidationObserver: {
            template: `<div><slot :invalid="${state}"/></div>`
          }
        }
      })

      expect(wrapper.findComponent({ ref: 'x' }).vm.$attrs.invalid).toBe(state)
    })
  })
})
