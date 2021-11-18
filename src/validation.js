const validation = (values) => {
  let errors = {};

  if (!values.Projectname) {
    errors.Projectname = "Project Name is required.";
  }
  if (!values.Projectcost) {
    errors.Projectcost = "Project Cost is required";
  }
  if (!values.ClosureTime) {
    errors.ClosureTime = "End Date is required";
  }
  if (!values.StartDate) {
    errors.StartDate = "Start Date is required";
  }
  if (!values.Business) {
    errors.Business = "Business Type is required";
  }
  if (!values.mail) {
    errors.mail = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.mail)) {
    errors.mail = "Email is invalid.";
  }
  if (!values.referral) {
    errors.referral = "Referral is required.";
  }
  if (!values.phoneNo) {
    errors.phoneNo = "Phone Number is required.";
  } else if (values.phoneNo.length !== 10) {
    errors.phoneNo = "Phone Number should be 10 digits.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 5) {
    errors.password = "Password must be more than five characters.";
  }
  if (!values.potentialProject) {
    errors.potentialProject = "Select an Option";
  }

  return errors;
};

export default validation;
