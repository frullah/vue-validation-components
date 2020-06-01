export const ValidationObserverPass = {
  template: '<div><slot :handleSubmit="fn => fn()" :invalid="false"/></div>',
  methods: {
    reset: jest.fn()
  }
}
