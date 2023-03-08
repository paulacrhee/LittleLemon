import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import BookingForm from "./components/BookingForm";

describe("BookingForm", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<BookingForm />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a form", () => {
    const form = wrapper.find("form");
    expect(form).toHaveLength(1);
  });

  it("should update the date field when the user types in a date", () => {
    const dateInput = wrapper.find("#date");
    const newDate = "2023-04-01";
    dateInput.simulate("change", { target: { value: newDate } });
    expect(dateInput.props().value).toBe(newDate);
  });

  it("should update the available times when the user types in a date", async () => {
    const dateInput = wrapper.find("#date");
    const newDate = "2023-04-01";
    dateInput.simulate("change", { target: { value: newDate } });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    const availableTimes = wrapper
      .find("#time option")
      .map((option) => option.prop("value"));
    expect(availableTimes).toEqual(["4:00 PM", "5:00 PM", "6:00 PM"]);
  });

  it("should submit the form when the user clicks the submit button", () => {
    const firstNameInput = wrapper.find("#firstName");
    const emailInput = wrapper.find("#email");
    const guestsInput = wrapper.find("#guests");
    const dateInput = wrapper.find("#date");
    const timeInput = wrapper.find("#time");
    const submitButton = wrapper.find('button[type="submit"]');

    firstNameInput.simulate("change", { target: { value: "John" } });
    emailInput.simulate("change", { target: { value: "john@example.com" } });
    guestsInput.simulate("change", { target: { value: "2" } });
    dateInput.simulate("change", { target: { value: "2023-04-01" } });
    timeInput.simulate("change", { target: { value: "5:00 PM" } });

    submitButton.simulate("submit");

    expect(window.alert).toHaveBeenCalledWith(
      `Thank you, John. You just booked a table at Little Lemon on 2023-04-01 at 5:00 PM for your upcoming dining experience.`
    );
  });

  it("should display an error message when the user tries to submit an invalid form", () => {
    const submitButton = wrapper.find('button[type="submit"]');
    submitButton.simulate("submit");

    const firstNameError = wrapper.find("#firstName_error");
    const emailError = wrapper.find("#email_error");
    const guestsError = wrapper.find("#guests_error");
    const dateError = wrapper.find("#date_error");

    expect(firstNameError.text()).toBe("Required");
    expect(emailError.text()).toBe("Required");
    expect(guestsError.text()).toBe("Required");
    expect(dateError.text()).toBe("Required");
  });
});
