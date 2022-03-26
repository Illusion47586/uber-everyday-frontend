import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { Button } from "./Button";
import dateFormat from "dateformat";
import { ArrowRight } from "phosphor-react";

import styles from "../styles/components/registerForm.module.scss";

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" },
];

const days = [
  { value: 0, label: "Monday" },
  { value: 1, label: "Tuesday" },
  { value: 2, label: "Wednesday" },
  { value: 3, label: "Thursday" },
  { value: 4, label: "Friday" },
  { value: 5, label: "Saturday" },
  { value: 6, label: "Sunday" },
];

const NewRideSchema = Yup.object().shape({
  source: Yup.object().required("Required").nullable(),
  destination: Yup.object().required("Required").nullable(),
  from: Yup.date().required("Required"),
  until: Yup.date().required("Required"),
  time: Yup.string().required("Required"),
  daysOfWeek: Yup.array()
    .min(1, "Select at least one day.")
    .max(7, "Select at most seven days.")
    .required("Required"),
});

type Props = { className?: string };

const RegisterForm = (props: Props) => {
  const currentDate = dateFormat("yyyy-mm-dd");
  // console.log(currentDate);

  return (
    <div className={props.className}>
      <Formik
        initialValues={{
          source: null,
          destination: null,
          from: currentDate,
          until: "",
          time: "",
          daysOfWeek: null,
        }}
        validationSchema={NewRideSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          submitForm,
        }) => (
          <Form>
            <label htmlFor="source">
              Source
              {errors.source && touched.source ? (
                <span> ({errors.source})</span>
              ) : null}
            </label>
            <Select
              placeholder="Select Source"
              id="source"
              name="source"
              options={options}
              className="select-container"
              classNamePrefix="select"
              onChange={(value) => {
                const event = {
                  target: { name: "source", value: value },
                };
                handleChange(event);
              }}
              onBlur={() => {
                // console.log(values);
                handleBlur({ target: { name: "source" } });
              }}
              value={values.source}
            />
            <label htmlFor="destination">
              Destination
              {errors.destination && touched.destination ? (
                <span> ({errors.destination})</span>
              ) : null}
            </label>
            <Select
              placeholder="Select Destination"
              id="destination"
              name="destination"
              options={options}
              className="select-container"
              classNamePrefix="select"
              onChange={(value) => {
                let event = {
                  target: { name: "destination", value: value },
                };
                handleChange(event);
              }}
              onBlur={() => {
                // console.log(values);
                handleBlur({ target: { name: "destination" } });
              }}
              value={values.destination}
            />

            <label htmlFor="from">
              From
              {errors.from && touched.from ? (
                <span> ({errors.from})</span>
              ) : null}
            </label>
            <Field name="from" type="date" min={currentDate} />

            {values.from.length !== 0 && (
              <>
                <label htmlFor="until">
                  Until
                  {errors.until && touched.until ? (
                    <span> ({errors.until})</span>
                  ) : null}
                </label>
                <Field
                  name="until"
                  type="date"
                  min={values.from.length === 0 ? currentDate : values.from}
                />
              </>
            )}

            {values.until.length !== 0 && (
              <>
                <label htmlFor="time">
                  Time
                  {errors.time && touched.time ? (
                    <span> ({errors.time})</span>
                  ) : null}
                </label>
                <Field
                  name="time"
                  type="time"
                  // min={values.from.length === 0 ? currentDate : values.from}
                />
              </>
            )}
            {values.time.length > 0 && (
              <>
                <label htmlFor="daysOfWeek">
                  Days of Week
                  {errors.daysOfWeek && touched.daysOfWeek ? (
                    <span> ({errors.daysOfWeek})</span>
                  ) : null}
                </label>
                <Select
                  placeholder="Select days of week."
                  id="daysOfWeek"
                  name="daysOfWeek"
                  options={days}
                  isMulti
                  className="select-container"
                  classNamePrefix="select"
                  onChange={(value) => {
                    let event = {
                      target: { name: "daysOfWeek", value: value },
                    };
                    handleChange(event);
                  }}
                  onBlur={() => {
                    handleBlur({ target: { name: "daysOfWeek" } });
                  }}
                  value={values.daysOfWeek}
                />
              </>
            )}
            {/* <input type="submit" placeholder="submit" /> */}
            <Button
              text="Submit"
              onClick={submitForm}
              icon={ArrowRight}
              iconWt="bold"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
