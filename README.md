# vue-validation-components

Vue validation components is a Vue component combined with vee-validate.

I made this for myself project that using the validation with vee-validate

## Installation

### npm

```sh
npm install vue-validation-components
```

### yarn

```sh
yarn add vue-validation-components
```

## Usage

### FormWithValidation

```typescript
  /** props */

  // form submit callback
  onSubmit: Function


  /** slot props */

  // form submit processing state
  processing: boolean

  // invalid form state, derived from vee-validate ValidationObserver
  invalid: boolean

```
