## Installation

```
npm install
npm run start
```

## Some notes below of everything I used to make this repo

```
/**
 * (some links may be broken since time of making this commenet block)
 * Formik, a 3rd party form library is used here
 * It solves 3 things:
 *   1. Getting values in and out of form state
 *   2. Validation and error messages b/w steps in a wizard
 *   3. Handling form submission
 * Using Formik for the multistep wizard functionality, mostly for validation bw step forms
 * Below are all the important examples / patches I used to make everything work
 * 
 * Most important and simpler examples found here
 * (Formik v2 Yup Reactstrap - I wrote this) - https://github.com/vincentntang/multistep-wizard-formik-yup-reactstrap
 * (Formik base wizard example, no Yup validators) - https://github.com/jaredpalmer/formik/blob/master/examples/MultistepWizard.js
 * (Formik base example with Yup) - https://codesandbox.io/s/zKrK5YLDZ
 * 
 * Issue log I used to upgrade / patch formik together
 * (Passing props to each page) - https://github.com/jaredpalmer/formik/issues/844
 * (Validations on each page only) - https://codesandbox.io/s/k5m5po380v
 * (Validations on each page only - DOCS) - https://github.com/jaredpalmer/formik/issues/867 
 * (Integrating Reactstrap Inputs using tag={Field}) - https://github.com/jaredpalmer/formik/issues/670
 * 
 * Additional useful information/examples I found
 * (Triggering Label+Input+FormFeedback custom input) - https://codesandbox.io/s/qJR4ykJk
 * (Using formik with 3rd party components) -https://codesandbox.io/s/jRzE53pqR
 * 
 * There's also the docs as well, these pages are important imo
 * https://jaredpalmer.com/formik/docs/api/formik
 * 
 * Setting custom onChange 
 * setFieldValue is used to build your own custom onChange logic. Useful if you need side-effects.
 * ^ e.g. a button modifies two variables behind the scenes
 * https://stackoverflow.com/questions/54493071/how-to-pass-values-from-a-component-into-formik-multi-step-form-wizard/54517336#54517336
 * I wrote a slightly simpler version. Try this example out
 * onClick={() => {
 *   props.setFieldValue("currentSha",item);
 *   props.setFieldValue(currentShaIndex",index);
 * }}
 * where (item,index) are parameters from a javascript array map function
 * If anything just reference the code here and my simpler base example with everything compiled here:
 * https://github.com/vincentntang/multistep-wizard-formik-yup-reactstrap
 */
```
