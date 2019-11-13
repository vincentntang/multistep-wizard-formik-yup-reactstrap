import React, { Fragment } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  UncontrolledAlert,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  CustomInput,
  Badge,
  Button,
  ButtonGroup,
  Collapse,
} from "reactstrap";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : "Required");

class Wizard extends React.Component {
  // static Page = ({ children }) => children; // properties of the class
  static Page = ({ children, parentState }) => {
    return children(parentState);
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      this.next(values);
    }
  };

  // Step1Schema = Yup.object().shape({
  //   firstName: Yup.string().required("First Name Is Required"),
  //   middleName: Yup.string().required("Middle Name Is Required"),
  //   lastName: Yup.string().required("Last Name Is Required")
  // });
  // Step2Schema = Yup.object().shape({
  //   email: Yup.string().required("Email Is Required"),
  //   favoriteColor: Yup.string().required("Favorite color required")
  // });

  // schemaArray = [this.Step1Schema, this.Step2Schema];

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    console.log(activePage, "activePage");
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        // validate={this.validate}
        // validationSchema={this.schemaArray[page]}
        validationSchema={schemaArray[page]}
        onSubmit={this.handleSubmit}
      >
        {props => {
          console.log(props, "this.props");
          const { handleSubmit, isSubmitting } = props;
          return (
            <form onSubmit={handleSubmit}>
              {React.cloneElement(activePage, { parentState: { ...props } })}
              {/* {activePage} */}
              <div className="buttons">
                {page > 0 &&
                  <button
                    type="button"
                    className="secondary"
                    onClick={this.previous}
                  >
                    « Previous
                  </button>}

                {!isLastPage && <button type="submit">Next »</button>}
                {isLastPage &&
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>}
              </div>

              {/* <Debug /> */}
            </form>
          );
        }}
      </Formik>
      // <Formik
      //   initialValues={values}
      //   enableReinitialize={false}
      //   // validate={this.validate}
      //   // validationSchema={this.schemaArray[page]}
      //   validationSchema={schemaArray[page]}
      //   onSubmit={this.handleSubmit}
      //   render={({ values, handleSubmit, isSubmitting, handleReset }) => (
      //     <form onSubmit={handleSubmit}>
      //       {activePage}
      //       <div className="buttons">
      //         {page > 0 && (
      //           <button
      //             type="button"
      //             className="secondary"
      //             onClick={this.previous}
      //           >
      //             « Previous
      //           </button>
      //         )}

      //         {!isLastPage && <button type="submit">Next »</button>}
      //         {isLastPage && (
      //           <button type="submit" disabled={isSubmitting}>
      //             Submit
      //           </button>
      //         )}
      //       </div>

      //       {/* <Debug /> */}
      //     </form>
      //   )}
      // />
    );
  }
}

const InputFeedback = ({ error }) =>
  error
    ? <div className="input-feedback">
        {error}
      </div>
    : null;

const Labely = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "input-group",
    {
      "animated shake error": !!error,
    },
    className,
  );
  return (
    <div className={classes}>
      <Labely htmlFor={id} error={error}>
        {label}
      </Labely>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};

const Step1Schema = Yup.object().shape({
  firstName: Yup.string().required("First Name Is Required"),
  middleName: Yup.string().required("Middle Name Is Required"),
  lastName: Yup.string().required("Last Name Is Required"),
  sirName: Yup.string().required("Sir Name Is Required")
});
const Step2Schema = Yup.object().shape({
  email: Yup.string().required("Email Is Required"),
  favoriteColor: Yup.string().required("Favorite color required"),
});
const initialValues = {
  firstName: "",
  middleName: "", // must add
  lastName: "",
  sirName: '',
  email: "",
  favoriteColor: "",
};

const schemaArray = [Step1Schema, Step2Schema];

// const formikEnhancer = withFormik({
//   validationSchema: Yup.object().shape({
//     firstName: Yup.string()
//       .min(2, "C'mon, your name is longer than that")
//       .required('First name is required.'),
//     lastName: Yup.string()
//       .min(2, "C'mon, your name is longer than that")
//       .required('Last name is required.'),
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required!'),
//   }),

//   mapPropsToValues: ({ user }) => ({
//     ...user,
//   }),
//   handleSubmit: (payload, { setSubmitting }) => {
//     alert(payload.email);
//     setSubmitting(false);
//   },
//   displayName: 'MyForm',
// });

export const App = () => {
  return (
    <div className="App">
      <h1>Multistep / Form Wizard </h1>
      <Wizard
        initialValues={initialValues}
        // initialValues={{
        //   firstName: "",
        //   middleName:'',// must add
        //   lastName: "",
        //   email: "",
        //   favoriteColor: ""
        // }}
        onSubmit={(values, actions) => {
          sleep(300).then(() => {
            window.alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          });
        }}
      >
        <Wizard.Page>
          {props => {
            console.log(props, "this props 1")
            return (
            <Fragment>
              <div>
                {/* <label>First Name</label> */}
                <Row>
                  <Col xs={{ size: 6, offset: 3 }}>
                    <FormGroup>
                      <Label for="exampleEmail">First Name</Label>
                      <Input
                        tag={Field}
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="field-error"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={{ size: 6, offset: 3 }}>
                    <FormGroup>
                      <Label for="exampleMiddle">Middle Name</Label>
                      <Input
                        tag={Field}
                        name="middleName"
                        component="input"
                        type="text"
                        placeholder="Middle Name"
                      />
                      <ErrorMessage
                        name="middleName"
                        component="div"
                        className="field-error"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={{ size: 6, offset: 3 }}>
                    <FormGroup>
                      <TextInput
                        id="sirName"
                        type="text"
                        label="Sir Name"
                        placeholder="John"
                        error={props.touched.sirName && props.errors.sirName}
                        value={props.values.sirName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
            validate={required}
          /> */}
              </div>
              <div>
                <label>Last Name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                  validate={required}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="field-error"
                />
              </div>
            </Fragment>)}
          }
        </Wizard.Page>
        <Wizard.Page
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            }
            if (!values.favoriteColor) {
              errors.favoriteColor = "Required";
            }
            return errors;
          }}
        >
          {props => {
            console.log(props,"this props last");
            return (<Fragment>
              <div>
                <label>Email</label>
                <Field
                  name="email"
                  component="input"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="field-error"
                />
              </div>
              <div>
                <label>Favorite Color</label>
                <Field name="favoriteColor" component="select">
                  <option value="">Select a Color</option>
                  <option value="#ff0000">❤️ Red</option>
                  <option value="#00ff00">💚 Green</option>
                  <option value="#0000ff">💙 Blue</option>
                </Field>
                <ErrorMessage
                  name="favoriteColor"
                  component="div"
                  className="field-error"
                />
              </div>
            </Fragment>)
            }
          }
        </Wizard.Page>
      </Wizard>
    </div>
  );
};

export default App;
