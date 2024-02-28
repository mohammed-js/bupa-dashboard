import { notifySuccess, notifyError } from "./toastify";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { baseUrl } from "../views/utilities/general";
import logo from "../assets/images/bupa/logo.jpg";
import footer from "../assets/images/bupa/footer.jpg";
export const convertToPDF = (
  content,
  option,
  setTranslatedArCertificate,
  refSnapshot,
  setRefSnapshot,
  uploadedEnCertificateId,
  setUploading,
  data
) => {
  if (option === 1) {
    setRefSnapshot(content);
    return;
  }

  if (refSnapshot) {
    //* functionality
    html2pdf()
      .from(refSnapshot)
      .set({
        margin: [1.5, 0.5, 1.5, 0.5],
        filename: "document.pdf",
        html2canvas: { scale: 2 },
        // jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        var totalPages = pdf.internal.getNumberOfPages();
        for (var i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          //^ set page
          pdf.setFontSize(10);
          //^ add page number
          // pdf.setTextColor(150);
          pdf.text(
            `${i}`,
            pdf.internal.pageSize.getWidth() / 2,
            pdf.internal.pageSize.getHeight() / 2 + 5.7
          );
          //^ add header logo
          pdf.addImage(
            logo,
            "JPG",
            // "https://iili.io/J1pp1Wu.jpg",
            // "JPEG",
            pdf.internal.pageSize.getWidth() / 2 + 2.75,
            pdf.internal.pageSize.getHeight() / 2 - 5.5,
            1,
            1
          );

          //^ add footer (as image)
          pdf.addImage(
            footer,
            "JPG",
            // "https://iili.io/J1p1FP1.jpg",
            // "JPEG",
            pdf.internal.pageSize.getWidth() / 2 - 3.8,
            pdf.internal.pageSize.getHeight() / 2 + 4.5,
            7.6,
            1
          );
        }
        if (option === 2) {
          // setTranslatedArCertificate
          var pdfData = pdf.output("blob");
          var pdfUrl = URL.createObjectURL(pdfData);
          setTranslatedArCertificate(`${pdfUrl}`);
        }
        if (option === 3) {
          // open in new tab
          // pdf.output("dataurlnewwindow");
        }
        if (option === 4) {
          // save pdf to pc
          // pdf.save("document.pdf");
          pdf.save(`${localStorage.getItem("certificate")}.pdf`);
        }
        if (option === 5) {
          // var blob = pdf.output("blob");
          // var file = new File([blob], "document.pdf", {
          //   type: "application/pdf",
          // });

          // update certificate
          var pdfData = pdf.output("blob");
        }
        Promise.allSettled([
          axios.patch(
            `${baseUrl}/documents/${uploadedEnCertificateId}`,
            {
              certificate_arabic: pdfData,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
              },
            }
          ),
          // update missing data in DB for next time
          // axios.put(
          //   `${baseUrl}/documents/update-translate`,
          //   data.formattedMissing,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
          //     },
          //   }
          // ),
        ])
          .then((results) => {
            notifySuccess("Uploaded successfully!");
            setUploading(false);
          })
          .catch((error) => {
            notifyError("Error when uploading!");
            setUploading(false);
            console.error("Error occurred:", error);
          });

        return pdf;
      })
      .catch((err) => notifyError("Something went wrong!"));
  }
};
