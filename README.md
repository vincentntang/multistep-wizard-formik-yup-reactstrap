## Intro

This is an example of how of using Formik's base wizard multistep example. 

Features

- Yup validation library
- Reactstrap integration examples

https://codesandbox.io/s/formik-multiform-wizard-yup-reactstrap-ogfr2

## Installation

```
npm install
npm run start
```

## Some notes below of everything I used to make this repo

- (Formik base wizard example, no Yup validators) - https://github.com/jaredpalmer/formik/blob/master/examples/MultistepWizard.js
- (Formik base example with Yup) - https://codesandbox.io/s/zKrK5YLDZ
 
Issue log I used to upgrade / patch formik together

- (Passing props to each page) - https://github.com/jaredpalmer/formik/issues/844
- (Validations on each page only) - https://codesandbox.io/s/k5m5po380v
- (Validations on each page only - DOCS) - https://github.com/jaredpalmer/formik/issues/867 
- (Integrating Reactstrap Inputs using tag={Field}) - https://github.com/jaredpalmer/formik/issues/670

- Additional useful information/examples I found
- (Triggering Label+Input+FormFeedback custom input) - https://codesandbox.io/s/qJR4ykJk
- (Using formik with 3rd party components) -https://codesandbox.io/s/jRzE53pqR

here's also the docs as well, these pages are important imo

- https://jaredpalmer.com/formik/docs/api/formik

Setting custom onChange 

- setFieldValue is used to build your own custom onChange logic. Useful if you need side-effects.
 - ^ e.g. a button modifies two variables behind the scenes
- https://stackoverflow.com/questions/54493071/how-to-pass-values-from-a-component-into-formik-multi-step-form-wizard/54517336#54517336

