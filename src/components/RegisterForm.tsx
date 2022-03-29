import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { Button } from "./Button";
import dateFormat from "dateformat";
import { ArrowRight } from "phosphor-react";

import styles from "../styles/components/registerForm.module.scss";
import { motion } from "framer-motion";
import { baseMotionSettings } from "../utils/defaultAnimation";
import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" },
];

const sharing = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

const travellers = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
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
  source: Yup.string().required("Required").nullable(),
  destination: Yup.string().required("Required").nullable(),
  from: Yup.date().required("Required"),
  until: Yup.date().required("Required"),
  time: Yup.string().required("Required"),
  daysOfWeek: Yup.array()
    .min(1, "Select at least one day.")
    .max(7, "Select at most seven days.")
    .required("Required")
    .nullable(),
  sharing: Yup.object(),
  travellers: Yup.object(),
});

type Props = {
  className?: string;
  setDirectionRoute: React.Dispatch<any>;
};

const RegisterForm = (props: Props) => {
  const currentDate = dateFormat("yyyy-mm-dd");
  const [distance, setDistance] = useState<string | null>();
  const [duration, setDuration] = useState<string | null>();

  const calculateDirection = async (source: string, destination: string) => {
    if (!source || !destination) return;

    const directionCalc = new google.maps.DirectionsService();
    const result = await directionCalc.route({
      origin: source,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    console.log(result);

    props.setDirectionRoute(result);

    setDistance(result.routes[0].legs[0].distance?.text);
    setDuration(result.routes[0].legs[0].duration?.text);
  };

  return (
    <motion.div className={props.className} {...baseMotionSettings}>
      <Formik
        initialValues={{
          source: undefined,
          destination: undefined,
          from: currentDate,
          until: "",
          time: "",
          daysOfWeek: null,
          sharing: { value: false, label: "No" },
          travellers: { value: 1, label: "1" },
        }}
        validationSchema={NewRideSchema}
        onSubmit={async (values) => {
          console.log(values);
          await calculateDirection(values.source!, values.destination!);
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          submitForm,
          setFieldValue,
        }) => (
          <Form>
            <motion.label htmlFor="source">
              Source
              {errors.source && touched.source ? (
                <span> ({errors.source})</span>
              ) : null}
            </motion.label>
            <div className={styles.expand}>
              <Autocomplete
                options={{
                  componentRestrictions: { country: "in" },
                }}
              >
                <input
                  name="source"
                  type="text"
                  placeholder="Enter Source"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.source}
                />
              </Autocomplete>
            </div>
            <motion.label htmlFor="destination">
              Destination
              {errors.destination && touched.destination ? (
                <span> ({errors.destination})</span>
              ) : null}
            </motion.label>
            <div className={styles.expand}>
              <Autocomplete
                options={{
                  componentRestrictions: { country: "in" },
                }}
              >
                <input
                  name="destination"
                  type="text"
                  placeholder="Enter Destination"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.destination}
                />
              </Autocomplete>
            </div>
            <motion.label htmlFor="from">
              From
              {errors.from && touched.from ? (
                <span> ({errors.from})</span>
              ) : null}
            </motion.label>
            <Field name="from" type="date" min={currentDate} />

            {values.from.length !== 0 && (
              <>
                <motion.label htmlFor="until">
                  Until
                  {errors.until && touched.until ? (
                    <span> ({errors.until})</span>
                  ) : null}
                </motion.label>
                <Field
                  name="until"
                  type="date"
                  min={values.from.length === 0 ? currentDate : values.from}
                />
              </>
            )}

            {values.until.length !== 0 && (
              <>
                <motion.label htmlFor="time">
                  Time
                  {errors.time && touched.time ? (
                    <span> ({errors.time})</span>
                  ) : null}
                </motion.label>
                <Field
                  name="time"
                  type="time"
                  // min={values.from.length === 0 ? currentDate : values.from}
                />
              </>
            )}
            {values.time.length > 0 && (
              <>
                <motion.label htmlFor="daysOfWeek">
                  Days of Week
                  {errors.daysOfWeek && touched.daysOfWeek ? (
                    <span> ({errors.daysOfWeek})</span>
                  ) : null}
                </motion.label>
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
            <motion.label htmlFor="sharing">
              Want to go for UberPool when available? (Might result in lower
              fee)
              {errors.sharing && touched.sharing ? (
                <span> ({errors.sharing})</span>
              ) : null}
            </motion.label>
            <Select
              placeholder="Select sharing"
              id="sharing"
              name="sharing"
              options={sharing}
              defaultValue={sharing[1]}
              isSearchable={false}
              className="select-container"
              classNamePrefix="select"
              onChange={(value) => {
                const event = {
                  target: { name: "sharing", value: value },
                };
                handleChange(event);
              }}
              onBlur={() => {
                // console.log(values);
                handleBlur({ target: { name: "sharing" } });
              }}
              value={values.sharing}
            />
            <motion.label htmlFor="travellers">
              Select number of Passengers
              {errors.travellers && touched.travellers ? (
                <span> ({errors.travellers})</span>
              ) : null}
            </motion.label>
            <Select
              placeholder="Select travellers"
              id="travellers"
              name="travellers"
              options={travellers}
              defaultValue={travellers[0]}
              isSearchable={false}
              className="select-container"
              classNamePrefix="select"
              onChange={(value) => {
                const event = {
                  target: { name: "travellers", value: value },
                };
                handleChange(event);
              }}
              onBlur={() => {
                // console.log(values);
                handleBlur({ target: { name: "travellers" } });
              }}
              value={values.travellers}
            />
            <Button
              text="Submit"
              onClick={submitForm}
              icon={ArrowRight}
              iconWt="bold"
            />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default RegisterForm;
