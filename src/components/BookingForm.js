import { useFormik } from "formik";
import React, { useState, useReducer } from "react";
import * as Yup from "yup";

function generateAvailableTimes(date) {
  return ["4:00 PM", "5:00 PM", "6:00 PM"];
}

// Define the reducer to update the availableTimes state based on the selected date
function availableTimesReducer(state, action) {
  switch (action.type) {
    case "updateTimes":
      const { date } = action.payload;
      return generateAvailableTimes(date);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const BookingForm = () => {
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const minDate = new Date().toISOString().slice(0, 10); // get today's date

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      guests: "",
      date: "",
      time: "",
      type: "ocassion",
      comment: "",
    },

    onSubmit: function (values) {
      alert(
        `Thank you, ${values.firstName}. You just booked a table at Little Lemon on ${date} at ${time} for your upcoming dining experience.`
      );
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().required("Required").email("Invalid email address"),
      guests: Yup.number().required("Required").max(10, "Max 10 guests"),
      type: Yup.string(),
      comment: Yup.string().min(10, "Must be 10 characters at minimum"),
    }),
  });
  // Handle changes to the date field
  function handleDateChange(event) {
    const { value } = event.target;
    setDate(value);
    dispatch({ type: "updateTimes", payload: { date: value } });
    setTime("");
  }

  return (
    <section className="section-sm lg:pt-[150px]  bg-hero-pattern">
      <div className="container mx-auto m-8">
        <div className="flex flex-col lg:flex-row lg:gap-x-[74px] bg-contact bg-no-repeat bg-cover ">
          <div className="flex-1 flex flex-col justify-center pl-8">
            <h2 className="h2 mb-3 lg:mb-7">
              Book a <span>table</span>
            </h2>
            <p className="mb-7 lg:mb-0">
              Reserve your spot today and experience a unique dining experience
            </p>
            <img src="./assets/images/form-img.jpg" alt="" />
          </div>
          <form
            className="flex-1 bg-white shadow-primary border rounded-[20px] p-5 lg:p-10 flex flex-col lg:-mt-20"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div
              isInvalid={formik.touched.firstName && formik.errors.firstName}
            >
              <input
                id="firstName"
                placeholder="Name"
                name="firstName"
                className="form-control w-full"
                value={formik.values.firstName}
                {...formik.getFieldProps("firstName")}
              />

              <p
                id="filled_error_help"
                class="my-4 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.firstName}
              </p>
            </div>

            <div isInvalid={formik.touched.email && formik.errors.email}>
              <input
                id="email"
                placeholder="Email address"
                name="email"
                className="form-control w-full"
                value={formik.values.email}
                {...formik.getFieldProps("email")}
              />

              <p
                id="filled_error_help"
                class="my-4 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.email}
              </p>
            </div>
            <div isInvalid={formik.touched.guests && formik.errors.guests}>
              <input
                id="guests"
                type="number"
                placeholder="How many guests? (Max 10)"
                name="guests"
                className="form-control w-full"
                value={formik.values.guests}
                {...formik.getFieldProps("guests")}
              />

              <p
                id="filled_error_help"
                class="my-4 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.guests}
              </p>
            </div>
            <div isInvalid={formik.touched.date && formik.errors.date}>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                min={minDate}
                className="form-control w-full"
                required
              />

              <p
                id="filled_error_help"
                class="my-4 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.date}
              </p>
            </div>
            <div isInvalid={formik.touched.time && formik.errors.time}>
              <select
                className="form-control w-full"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
              >
                <option value="">Select a time</option>
                {availableTimes.map((availableTime) => (
                  <option key={availableTime} value={availableTime}>
                    {availableTime}
                  </option>
                ))}
              </select>

              <p
                id="filled_error_help"
                class="my-4 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.date}
              </p>
            </div>
            <div isInvalid={formik.touched.type && formik.errors.type}>
              <select
                id="type"
                className="form-control w-full"
                name="type"
                {...formik.getFieldProps("type")}
              >
                <option value="regularMember">Ocassion</option>
                <option value="premiumMember">Birthday</option>
                <option value="standardMember">Anniversary</option>
              </select>
              <p
                id="filled_error_help"
                class="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.type}
              </p>
            </div>
            <div isInvalid={formik.touched.comment && formik.errors.comment}>
              <textarea
                id="comment"
                placeholder="Comments/Additional Requests"
                name="comment"
                className="form-control w-full  py-5 h-[165px] "
                value={formik.values.comment}
                {...formik.getFieldProps("comment")}
              />

              <p
                id="filled_error_help"
                class="my-4 text-xs text-red-600 dark:text-red-400"
              >
                {formik.errors.comment}
              </p>
            </div>

            <button className="btn btn-primary self-start mt-8" type="submit">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
