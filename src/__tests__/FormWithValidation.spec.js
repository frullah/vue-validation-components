import FormWithValidation from '../FormWithValidation.vue'
import { shallowMount } from '@vue/test-utils'
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

  it('should run onSubmit on form submit', async () => {
    const wrapper = shallowMount(FormWithValidation, {
      propsData: { onSubmit: jest.fn() },
      stubs: { ValidationObserver: ValidationObserverPass }
    })
    wrapper.findComponent({ ref: 'form' }).trigger('submit')
    await flushPromises()
    expect(wrapper.vm.onSubmit).toBeCalledTimes(1)
  })

  it('reset method call reset from observer', () => {
    const observerReset = jest.fn()
    const wrapper = shallowMount(FormWithValidation, {
      propsData: { onSubmit: jest.fn() },
      stubs: {
        ValidationObserver: {
          template: '<div><slot/></div>',
          methods: { reset: observerReset }
        }
      }
    })
    wrapper.vm.reset()
    expect(observerReset).toBeCalledTimes(1)
  })

  it('have slot scope', async () => {
    const wrapper = shallowMount(FormWithValidation, {
      propsData: { onSubmit: jest.fn() },
      scopedSlots: {
        default: '<test v-bind="props"/>'
      },
      stubs: {
        test: { name: 'test', template: '<div/>' },
        ValidationObserver: {
          template: '<div><slot :invalid="invalid"/></div>',
          data: () => ({ invalid: false })
        }
      }
    })

    const testComponent = wrapper.findComponent({ name: 'test' })
    expect(testComponent.vm.$attrs).toEqual({
      invalid: false,
      processing: false
    })

    const observer = wrapper.findComponent({ name: 'ValidationObserver' })
    await wrapper.setData({ processing: true })
    await observer.setData({ invalid: true })
    expect(testComponent.vm.$attrs).toEqual({
      invalid: true,
      processing: true
    })
  })
})
