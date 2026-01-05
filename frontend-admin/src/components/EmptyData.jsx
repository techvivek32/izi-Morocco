import React from "react";
import useNavigateTo from "../hooks/useNavigateTo";
import Button from "../components/Button";
import { ROUTES } from "../routes/helper";

const getContentByFrom = (from) => {
  switch (from) {
    case "department":
      return {
        message: "No Departments Yet",
        subtitle:
          "This page displays all departments in the system. You can create a new one using the button below.",
        buttonLabel: "Add Department",
        to: ROUTES.DEPARTMENT_CREATE,
      };
    case "pricing":
      return {
        message: "No treatment or service name yet",
        subtitle: `The pricing catalog is a comprehensive list of all the services
                and procedures offered by the healthcare facility, along with
                their associated costs. It serves as a reference for patients,
                insurance providers, and healthcare professionals to understand
                the financial aspects of the services provided.`,
        buttonLabel: "Add Pricing Service",
        to: ROUTES.PRICING_CREATE,
      };
    case "user":
      return {
        message: "No user(s) yet",
        subtitle: `The pricing catalog is a comprehensive list of all the services
                and procedures offered by the healthcare facility, along with
                their associated costs. It serves as a reference for patients,
                insurance providers, and healthcare professionals to understand
                the financial aspects of the services provided.`,
        buttonLabel: "Add user(s)",
        to: ROUTES.STAFF_CREATE,
      };
    case "doctor":
      return {
        message: "No Doctors Found",
        subtitle: "You haven't added any doctors yet. Start by creating one.",
        buttonLabel: "Add Doctor",
        to: ROUTES.DOCTOR_CREATE,
      };
    case "profile":
      return {
        message: "No profile(s) created",
        subtitle: "You can create and manage profile(s) from here.",
        buttonLabel: "Create Profile(s)",
        to: ROUTES.PROFILE_CREATE,
      };
    case "appointment":
      return {
        message: "No appointments yet",
        subtitle:
          "No appointments have been scheduled yet. You can create one using the button below.",
        buttonLabel: "Create Appointment",
        to: ROUTES.APPOINTMENT_CREATE,
      };
    case "registrations":
      return {
        message: "No registrations yet",
        //give me proper message by which the user can understand that no registrations have been made yet in a very intuitive manner
        subtitle: `There are no new patient visits recorded today. Stay tuned — new registrations may come in later.`,
        buttonLabel: "Create Registration",
        to: ROUTES.REGISTRATION_CREATE,
      };
    case "patient":
      return {
        message: "No patients found",
        subtitle: "You can add new patients using the button below.",
        buttonLabel: "Add Patient",
        to: ROUTES.REGISTRATION_CREATE,
      };
    case "prescriptions":
      return {
        message: "No Past Prescriptions Found",
        subtitle:
          "This patient doesn't have any previous prescriptions or medical visits in our system. Start by creating a new prescription or check if the patient information is correct.",
        buttonLabel: "Back to Patient Details",
        to: -1,
      };
    case "vitalTrends":
      return {
        message: "No Vitals Data Available",
        subtitle:
          "This patient doesn't have any previous vital records in our system. Start by creating a new vital record or check if the patient information is correct.",
        buttonLabel: "Back to Patient Details",
        to: -1,
      };
    case "payment":
      return {
        message: "No patients in the payment queue",
        subtitle:
          "Currently, there are no patients with pending payments in the OPD queue. All patients have completed their payment process. No Payment Pending",
        // buttonLabel: "Create New Invoice",
        to: ROUTES.CREATE_PAYMENT,
      };
    case "pharmacy":
      return {
        message: "No patient in the pharmacy queue",
        subtitle:
          "Currently, there are no patients in the pharmacy queue. All patients have been dispensed their medication.",
        // buttonLabel: "Create New Invoice",
        to: ROUTES.CREATE_PHARMACY,
      };
    case "followUp":
      return {
        message: "No Follow-Up Data Available",
        subtitle:
          "This patient doesn't have any previous follow-up records in our system. You can add follow-up while filling the patient's consultation.",
      };
    case "dashboardChart":
      return {
        subtitle: "No data available for the displayed chart.",
      };
    case "dashboardPatient":
      return {
        subtitle: "no recent patients till now",
      };
    default:
      return {
        message: "No matches found",
        subtitle: "Try adjusting your filters to see more results",
        buttonLabel: null,
        to: null,
      };
  }
};

export const EmptyData = ({ from, redirectTo = null }) => {
  const goTo = useNavigateTo();
  const { message, subtitle, buttonLabel, to } = getContentByFrom(from);

  return (
    <div className="w-full min-h-full gap-4 flex flex-col items-center justify-center text-center text-accent">
      {message ? (
        <h2 className="text-3xl word-spacing font-bold ">{message}</h2>
      ) : null}

      {subtitle ? <p className="max-w-md text-base">{subtitle}</p> : null}

      {buttonLabel ? (
        <Button onClick={() => goTo(redirectTo || to)} className="text-base">
          {buttonLabel}
        </Button>
      ) : null}
    </div>
  );
};
