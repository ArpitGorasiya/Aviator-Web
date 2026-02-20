import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneNumberSchema = yup
  .string()
  .trim()
  .required("Please enter phone number")
  .test("phone-number-valid", "Please enter a valid phone number", (value) => {
    if (!value) return false;
    const phoneWithoutCountryCode = value
      .replace(/^\+\d{1,4}/, "")
      .replace(/\s/g, "");
    return phoneWithoutCountryCode.length >= 4;
  });

const imageSchema = yup
  .mixed()
  .optional()
  .nullable()
  .test(
    "file-format",
    "Only JPG, JPEG, PNG, WEBP files are allowed",
    (value) => {
      if (!value) return true;
      const file = value as File;
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      return allowedTypes.includes(file.type);
    },
  );

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Please enter email")
    .matches(emailRegex, "Please enter a valid email address"),
  password: yup.string().trim().required("Please enter password"),
});

const ForgotPasswordSchema = yup.object().shape({
  countryFlag: yup.string().trim().required("Please select country"),
  countryCode: yup.string().trim().required("Please select country code"),
  phoneNumber: phoneNumberSchema,
});

const VerifyOTPSchema = yup.object().shape({
  otp: yup
    .string()
    .trim()
    .required(() => "Please enter OTP")
    .length(4, () => "OTP must be 4 digits"),
});

const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .required("Please enter new password")
    .min(
      8,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[A-Z]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[a-z]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[0-9]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[@$!%*?&#]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Please enter confirm password")
    .oneOf(
      [yup.ref("newPassword"), ""],
      " New password and confirm password does not match",
    ),
});

const RegisterSchema = yup.object().shape({
  countryFlag: yup.string().trim().required("Please select country"),
  countryCode: yup.string().trim().required("Please select country code"),
  phoneNumber: phoneNumberSchema,
  email: yup
    .string()
    .trim()
    .required("Please enter email")
    .matches(emailRegex, "Please enter a valid email address"),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to Privacy Policy and Terms & Conditions"),
});

const ProfileSetupSchema = yup.object().shape({
  // profileImage: yup
  //   .mixed()
  //   .optional()
  //   .nullable()
  //   .transform((value) => value || null)
  //   .test(
  //     "img-format",
  //     "Only JPG, JPEG, PNG and WEBP files are allowed",
  //     (value) => {
  //       if (!value) return true;
  //       const file = value as File;
  //       const allowedTypes = [
  //         "image/jpeg",
  //         "image/png",
  //         "image/webp",
  //         "image/jpg",
  //       ];
  //       return allowedTypes.includes(file?.type || "");
  //     }
  //   ),
  name: yup.string().trim().required("Please enter name"),
  age: yup
    .mixed()
    .test("is-number", "Please enter age", (value) => {
      if (value === "" || value === null || value === undefined) return false;
      const num =
        typeof value === "string" ? parseInt(value) : (value as number);
      return !isNaN(num) && num >= 1 && num <= 150;
    })
    .transform((value) => {
      if (value === "" || value === null || value === undefined) return value;
      return typeof value === "string" ? parseInt(value) : (value as number);
    }),
  gender: yup.string().trim().required("Please choose gender"),
  // height: yup
  //   .mixed()
  //   .optional()
  //   .nullable()
  //   .transform((value) => value || null)
  //   .test("is-number", "Please enter height", (value) => {
  //     if (value === "" || value === null || value === undefined) return true;
  //     const num =
  //       typeof value === "string" ? parseFloat(value) : (value as number);
  //     return !isNaN(num) && num >= 1;
  //   })
  //   .transform((value) => {
  //     if (value === "" || value === null || value === undefined) return value;
  //     return typeof value === "string" ? parseFloat(value) : value;
  //   }),
  // weight: yup
  //   .mixed()
  //   .optional()
  //   .nullable()
  //   .transform((value) => value || null)
  //   .test("is-number", "Please enter weight", (value) => {
  //     if (value === "" || value === null || value === undefined) return true;
  //     const num =
  //       typeof value === "string" ? parseFloat(value) : (value as number);
  //     return !isNaN(num) && num >= 1;
  //   })
  //   .transform((value) => {
  //     if (value === "" || value === null || value === undefined) return value;
  //     return typeof value === "string" ? parseFloat(value) : value;
  //   }),
  // flatNo: yup.string().trim().required("Please enter flat number"),
  address: yup
    .string()
    .trim()
    .required("Please enter building address")
    .test(
      "address-location-required",
      "Please select an address",
      function (value) {
        const { latitude, longitude } = this.parent;
        if (value && value.trim() !== "") {
          return (
            latitude !== null &&
            latitude !== undefined &&
            longitude !== null &&
            longitude !== undefined
          );
        }
        return true;
      },
    ),
  latitude: yup.number().required("Please enter latitude"),
  longitude: yup.number().required("Please enter longitude"),
  landmark: yup.string().trim().required("Please enter landmark"),
  stateId: yup.string().trim().required("Please select state"),
  cityId: yup.string().trim().required("Please select city"),
});

const SecureAccountSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required("Please enter new password")
    .min(
      8,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[A-Z]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[a-z]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[0-9]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    )
    .matches(
      /[@$!%*?&#]/,
      "New password must be more than 8 characters long including lower case, upper case, number and a special character",
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Please enter confirm password")
    .oneOf(
      [yup.ref("password"), ""],
      " New password and confirm password does not match",
    ),
});

const AddFamilyMemberSchema = yup.object().shape({
  name: yup.string().trim().required("Please enter name"),
  age: yup
    .mixed()
    .test("is-number", "Please enter age", (value) => {
      if (value === "" || value === null || value === undefined) return false;
      const num =
        typeof value === "string" ? parseInt(value) : (value as number);
      return !isNaN(num) && num >= 1 && num <= 150;
    })
    .transform((value) => {
      if (value === "" || value === null || value === undefined) return value;
      return typeof value === "string" ? parseInt(value) : (value as number);
    }),
  gender: yup.string().trim().required("Please choose gender"),
  height: yup
    .mixed()
    .optional()
    .nullable()
    .transform((value) => value || null)
    .test("is-number", "Please enter height", (value) => {
      if (value === "" || value === null || value === undefined) return true;
      const num =
        typeof value === "string" ? parseFloat(value) : (value as number);
      return !isNaN(num) && num >= 1;
    })
    .transform((value) => {
      if (value === "" || value === null || value === undefined) return value;
      return typeof value === "string" ? parseFloat(value) : value;
    }),
  weight: yup
    .mixed()
    .optional()
    .nullable()
    .transform((value) => value || null)
    .test("is-number", "Please enter weight", (value) => {
      if (value === "" || value === null || value === undefined) return true;
      const num =
        typeof value === "string" ? parseFloat(value) : (value as number);
      return !isNaN(num) && num >= 1;
    })
    .transform((value) => {
      if (value === "" || value === null || value === undefined) return value;
      return typeof value === "string" ? parseFloat(value) : value;
    }),
  flatNo: yup.string().trim().required("Please enter flat number"),
  address: yup
    .string()
    .trim()
    .required("Please enter building address")
    .test(
      "address-location-required",
      "Please select an address",
      function (value) {
        const { latitude, longitude } = this.parent;
        if (value && value.trim() !== "") {
          return (
            latitude !== null &&
            latitude !== undefined &&
            longitude !== null &&
            longitude !== undefined
          );
        }
        return true;
      },
    ),
  latitude: yup.number().required("Please enter latitude"),
  longitude: yup.number().required("Please enter longitude"),
  landmark: yup.string().trim().required("Please enter landmark"),
  cityId: yup.string().trim().required("Please enter city"),
  stateId: yup.string().trim().required("Please enter state"),
});

const RequestServiceStep1Schema = yup.object().shape({
  service: yup.string().trim().required("Please select service"),
  mySelf: yup.boolean().required("Please choose family member or self"),
  familyMemberId: yup
    .string()
    .trim()
    .when(["mySelf"], {
      is: (val: boolean) => val === false,
      then: (schema) => schema.required("Please select family member"),
      otherwise: (schema) => schema.notRequired(),
    }),
  images: imageSchema,
});

const RequestServiceStep2Schema = yup.object().shape({
  questions: yup.array().of(
    yup.object().shape({
      question: yup.string().trim().required("Please enter question"),
      isRequired: yup.boolean().optional().default(false),
      answer: yup.string().when("isRequired", {
        is: (val: boolean) => val === true,
        then: (schema) => schema.trim().required("Please enter your answer"),
        otherwise: (schema) => schema.trim().notRequired(),
      }),
    }),
  ),
});

const RequestServiceStep3Schema = yup.object().shape({
  shiftId: yup.string().trim().required("Please choose shift"),
  startDate: yup.string().trim().required("Please choose start date"),
  endDate: yup
    .string()
    .trim()
    .required("Please choose end date")
    .test(
      "end-date-greater-than-start-date",
      "End date must be greater than start date",
      (value, context) => {
        const startDate = context.parent.startDate;
        if (!startDate) return true;
        return new Date(value) >= new Date(startDate);
      },
    ),
  startTime: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .test(
      "start-time-min-10-minutes",
      "Start time must be at least 10 minutes from now",
      function (value) {
        if (!value) return true;
        const { startDate } = this.parent;

        const [hours, minutes] = value.split(":").map(Number);

        const now = new Date();
        const currentDate = new Date(now);
        currentDate.setHours(0, 0, 0, 0);

        const selectedDate = startDate ? new Date(startDate) : new Date();
        selectedDate.setHours(0, 0, 0, 0);

        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);

        if (selectedDate.getTime() === currentDate.getTime()) {
          const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
          return selectedDateTime >= tenMinutesFromNow;
        }

        return selectedDate > currentDate;
      },
    ),
  endTime: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .test(
      "end-time-greater-than-start-time",
      "End time must be greater than start time",
      function (value) {
        if (!value) return true;
        const { startTime, startDate, endDate } = this.parent;
        if (!startTime) return true;

        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = value.split(":").map(Number);

        if (startDate && endDate && startDate === endDate) {
          const startTotalMinutes = startHours * 60 + startMinutes;
          const endTotalMinutes = endHours * 60 + endMinutes;
          return endTotalMinutes > startTotalMinutes;
        }

        return true;
      },
    )
    .test(
      "end-time-less-than-24-hours",
      "Time difference must be less than 1 hours",
      function (value) {
        if (!value) return true;
        const { startTime, startDate, endDate } = this.parent;
        if (!startTime) return true;

        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = value.split(":").map(Number);

        if (startDate && endDate && startDate === endDate) {
          const startTotalMinutes = startHours * 60 + startMinutes;
          const endTotalMinutes = endHours * 60 + endMinutes;
          const timeDifference = endTotalMinutes - startTotalMinutes;
          return timeDifference >= 60;
        }

        return true;
      },
    ),
  budget: yup.string().trim().required("Please enter budget per shift"),
  note: yup.string().trim(),
});

const NursingRequestServiceStep3Schema = yup.object().shape({
  startDate: yup.string().trim().required("Please choose date"),
  startTime: yup
    .string()
    .trim()
    .required("Please enter start time")
    .test(
      "start-time-min-10-minutes",
      "Start time must be at least 10 minutes from now",
      function (value) {
        if (!value) return true;
        const { startDate } = this.parent;

        const [hours, minutes] = value.split(":").map(Number);

        const now = new Date();
        const currentDate = new Date(now);
        currentDate.setHours(0, 0, 0, 0);

        const selectedDate = startDate ? new Date(startDate) : new Date();
        selectedDate.setHours(0, 0, 0, 0);

        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);

        if (selectedDate.getTime() === currentDate.getTime()) {
          const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
          return selectedDateTime >= tenMinutesFromNow;
        }

        return selectedDate > currentDate;
      },
    ),
  serviceList: yup
    .array()
    .of(
      yup.object().shape({
        serviceListId: yup.string().trim().required("Please choose service"),
        budget: yup.string().trim().required("Please enter budget"),
        note: yup.string().trim().notRequired(),
      }),
    )
    .min(1, "Please add at least one service")
    .required("Please add at least one service"),
});

const PhysioRequestServiceStep3Schema = yup.object().shape({
  noOfSessions: yup.string().trim().required("Please enter no. of sessions"),
  sessionDuration: yup
    .string()
    .trim()
    .required("Please choose duration of session"),
  budget: yup.string().trim().required("Please enter budget per session"),
  note: yup.string().trim().notRequired(),
});

const EquipmentRequestServiceStep1Schema = yup.object().shape({
  service: yup.string().trim().required("Please select service"),
  equipmentIds: yup
    .array()
    .of(yup.string().trim().required("Please select equipment"))
    .min(1, "Please select at least one equipment")
    .required("Please select at least one equipment"),
  images: imageSchema,
});

const EquipmentRequestServiceStep3Schema = yup.object().shape({
  startDate: yup
    .string()
    .trim()
    .when("equipment", {
      is: (equipment: any[]) =>
        equipment?.some((item) => item?.type === "rent"),
      then: (schema) => schema.required("Please choose start date"),
      otherwise: (schema) => schema.notRequired(),
    }),

  endDate: yup
    .string()
    .trim()
    .when("equipment", {
      is: (equipment: any[]) =>
        equipment?.some((item) => item?.type === "rent"),
      then: (schema) =>
        schema
          .required("Please choose end date")
          .test(
            "end-date-greater-than-start-date",
            "End date must be greater than start date",
            function (value) {
              const { startDate } = this.parent;
              if (!startDate || !value) return true;
              return new Date(value) >= new Date(startDate);
            },
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  equipmentIds: yup
    .array()
    .of(yup.string().trim().required("Please select equipment"))
    .min(1, "Please select at least one equipment")
    .required("Please select at least one equipment"),
  equipment: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().trim().required("Please choose action type"),
        brandName: yup.string().trim().notRequired(),
        quantity: yup.string().trim().required("Please enter quantity"),
        perUnitBudget: yup
          .string()
          .trim()
          .when("type", {
            is: (val: string) => val === "rent",
            then: (schema) => schema.required("Please enter budget per unit"),
            otherwise: (schema) => schema.notRequired(),
          }),
        note: yup.string().trim().notRequired(),
      }),
    )
    .min(1, "Please select at least one equipment")
    .required("Please select at least one equipment"),
});

const JoinAsProviderSchema = yup.object().shape({
  organizationName: yup
    .string()
    .trim()
    .required("Please enter organization name"),
  phoneNumber: phoneNumberSchema,
  email: yup
    .string()
    .trim()
    .required("Please enter email")
    .matches(emailRegex, "Please enter a valid email address"),
  notes: yup.string().trim().required("Please enter service offered"),
});

export {
  LoginSchema,
  ForgotPasswordSchema,
  VerifyOTPSchema,
  ResetPasswordSchema,
  RegisterSchema,
  ProfileSetupSchema,
  SecureAccountSchema,
  AddFamilyMemberSchema,
  RequestServiceStep1Schema,
  RequestServiceStep2Schema,
  RequestServiceStep3Schema,
  NursingRequestServiceStep3Schema,
  PhysioRequestServiceStep3Schema,
  EquipmentRequestServiceStep1Schema,
  EquipmentRequestServiceStep3Schema,
  JoinAsProviderSchema,
};
