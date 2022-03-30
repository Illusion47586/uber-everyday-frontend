import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { Button, ButtonHierarchy, ButtonSize } from "./Button";
import dateFormat from "dateformat";
import { ArrowRight } from "phosphor-react";

import styles from "../styles/components/registerForm.module.scss";
import { motion } from "framer-motion";
import { baseMotionSettings } from "../utils/defaultAnimation";
import { LegacyRef, useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import Schedule from "../utils/types";
import { toast } from "react-toastify";
import RideBenefit from "./RideBenefit";

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
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 0, label: "Sunday" },
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
  const [distance, setDistance] = useState<Number | null>();
  const [duration, setDuration] = useState<Number | null>();
  const [cost, setCost] = useState<String | null>();

  const sourceRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const calculateDirection = async () => {
    const source = sourceRef.current?.value;
    const destination = destinationRef.current?.value;
    if (!source || !destination) return;

    const directionCalc = new google.maps.DirectionsService();
    const result = await directionCalc.route({
      origin: source,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    console.log(result);
    props.setDirectionRoute(result);

    const dis = result.routes[0].legs[0].distance!.value / 1000;
    const dur = result.routes[0].legs[0].duration!.value / 60;

    setDistance(dis);
    setDuration(dur);

    const cost = 0;
    const basePrice = 53;
    const ratePerKm = 7;
    const rideTimeChargePerMin = 0.8;
    const distanceCharge = ratePerKm * dis;
    const rideTimeCharge = rideTimeChargePerMin * dur;
    let perDayCost = basePrice + distanceCharge + rideTimeCharge;
    setCost(perDayCost.toFixed(2));
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
          await calculateDirection();

          // @ts-ignore
          const days = values.daysOfWeek!.map((v) => v.value);

          const data: Schedule = {
            source: {
              place_name: sourceRef.current!.value,
            },
            destination: {
              place_name: destinationRef.current!.value,
            },
            duration: duration!,
            distance: distance!,
            start_date: new Date(values.from),
            end_date: new Date(values.until),
            timing: values.time,
            days: days,
            total_traveller: values.travellers.value,
            sharing_allowed: values.sharing.value,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/ride?phone=${
              import.meta.env.VITE_TEST_ID
            }`,
            data
          );

          if (response.status === 201) {
            console.log(response.data);
            toast(
              `Yay! You rides have been scheduled. The actual cost was INR ${response.data.bill_no_discount.toFixed(
                2
              )}, but the incurred cost is INR ${response.data.cost.toFixed(
                2
              )}!`
            );
          } else {
            toast.error("Ride could not be created.");
          }
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
                  ref={sourceRef}
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
                  ref={destinationRef}
                />
              </Autocomplete>
            </div>
            <Button
              text="Calculate Cost"
              onClick={calculateDirection}
              icon={ArrowRight}
              hierarchy={ButtonHierarchy.primary}
              size={ButtonSize.small}
              iconWt="bold"
            />
            {distance && (
              <div className={styles.grid}>
                <p>Distance:</p>
                <p>{distance.toFixed(2)} Km</p>
                <p>Trip Duration:</p>
                <p>{duration?.toFixed(2)} Minutes</p>
                <p>Cost Per Trip:</p>
                <p>INR {cost}</p>
              </div>
            )}

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
