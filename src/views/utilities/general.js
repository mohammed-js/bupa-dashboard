import axios from "axios";
import { notifyError } from "../../utils/toastify";
export const baseUrl = "https://api.bupa.linnaea.ai/bupa/api/v1";
export const uploadDocuments = (certificate, idImages, setData, setStep) => {
  // **
  window.stop();
  setStep(0);
  //   setIsUploaded(false);
  //   setFieldValue('image', '');
  // **
  axios
    .post(
      `${baseUrl}/documents/`,
      {
        certificate: certificate,
        national_ids: idImages[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      }
    )
    .then((res) => {
      setData(res.data.data);
      setStep(5);
      //   setLoading(false);
    })
    .catch((err) => {
      notifyError("Something went wrong!");
      setStep(1);
    });
  // **
};

// export const missingsExtractor = (missing, customers) => {
//   let diseasesEditableFields = [];
//   let plansEditableFields = [];

//   customers.map((customer, i) => {
//     // mapping over customers diseases => customer can have more than one disease => so map over them (underwriting_terms)
//     customer.underwriting_terms.map((underwriting_terms) => {
//       if (missing.diseases.includes(underwriting_terms.name)) {
//         diseasesEditableFields.push({
//           customerIndex: i,
//           customerName: customer.name,
//         });
//       }
//     });
//     // mapping over customers plan => customer have only one plan
//     if (missing.plan.includes(customer.plans.plan_name)) {
//       plansEditableFields.push({
//         customerIndex: i,
//         customerName: customer.name,
//       });
//     }
//   });
//   return {
//     diseasesEditableFields,
//     plansEditableFields,
//   };
// };

export const missingsExtractor = (missing, customers) => {
  // let diseasesEditableFields = [];
  // let plansEditableFields = [];

  let missingDataOwners = [];

  customers.map((customer, i) => {
    // initialize editableFields
    missingDataOwners.push({
      customerIndex: i,
      customerName: customer.name,
      diseaseNames: [],
      planName: "",
    });

    // mapping over customers diseases => customer can have more than one disease => so map over them (underwriting_terms)
    customer.underwriting_terms.map((underwriting_terms) => {
      if (missing.diseases.includes(underwriting_terms.name)) {
        missingDataOwners[i].diseaseNames.push(underwriting_terms.name);
      }
    });
    // mapping over customers plan => customer have only one plan
    if (missing.plan.includes(customer.plans.plan_name)) {
      missingDataOwners[i].planName = customer.plans.plan_name;
    }
  });
  return missingDataOwners;
};
