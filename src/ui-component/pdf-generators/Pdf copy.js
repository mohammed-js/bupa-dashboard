import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import html2pdf from "html2pdf.js";
import { Box } from "@mui/material";
import {
  intro,
  tableDescriptionPrefix,
  tableDescription,
  contractInfo,
  contractInfoPrefix,
  lastSection,
  lastSectionP1,
  lastSectionP2,
} from "../../utils/generalUtils";
import { notifySuccess, notifyError } from "utils/toastify";

import Table from "./Table.js";
const PdfViewer = ({ uploadedEnCertificate }) => {
  const [pageContent, setPageContent] = useState(1);
  // uploadedEnCertificate url
  const blob = new Blob([uploadedEnCertificate], {
    type: uploadedEnCertificate.type,
  }); // type: file.type
  const uploadedEnCertificateUrl = URL.createObjectURL(blob);
  // translatedArCertificate url
  const [translatedArCertificate, setTranslatedArCertificate] = useState("");

  const styles = {
    link: { color: "blue", textDecoration: "underline" },
  };
  const phone = "01011302022";
  const phax = "01011302022";

  const contentRef = useRef("");
  const renderedRef = useRef("");

  const convertToPDF = (option) => {
    const methodToCall = option === 3 ? "outputPdf" : "save";
    const methodToCallParam =
      option === 3 ? "dataurlnewwindow" : "arabic-certificate.pdf";

    if (contentRef.current) {
      html2pdf()
        .from(contentRef.current)
        .set({
          margin: [1.5, 0.5, 1.5, 0.5],
          filename: "document.pdf",
          html2canvas: { scale: 5 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
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
              pdf.internal.pageSize.getHeight() / 2 + 5.3
            );
            //^ add header logo
            pdf.addImage(
              "https://iili.io/J1p1FP1.jpg",
              "JPEG",
              pdf.internal.pageSize.getWidth() / 2 - 3.8,
              pdf.internal.pageSize.getHeight() / 2 + 4.2,
              7.6,
              1
            );
            //^ add footer (as image)
            pdf.addImage(
              "https://iili.io/J1pp1Wu.jpg",
              "JPEG",
              pdf.internal.pageSize.getWidth() / 2 + 2.75,
              pdf.internal.pageSize.getHeight() / 2 - 5.3,
              1,
              1
            );
          }
          // 1) get pdf url
          var pdfData = pdf.output("blob");
          var pdfUrl = URL.createObjectURL(pdfData);
          setTranslatedArCertificate(`${pdfUrl}`);
          // window.open(pdfUrl, '_blank');
          // 2) save pdf to pc
          // pdf.save('document.pdf');
          // 3) open pdf in new tab
          pdf.output("dataurlnewwindow"); // alternative for window.open(pdfUrl, '_blank');
          return pdf;
          // return pdf;
        })
        // .then((pdf) => {
        //   var pdfData = pdf.output('blob');
        //   var pdfUrl = URL.createObjectURL(pdfData);
        //   setTranslatedArCertificate(`${pdfUrl}`);
        //   // window.open(pdfUrl, '_blank');
        //   return pdf;
        // })
        // [methodToCall](methodToCallParam)
        // //^ download pdf
        // .save('document.pdf')
        // //^ open pdf
        // .outputPdf('dataurlnewwindow');
        .catch((err) => notifyError("Something went wrong!"));
    }
  };
  const sir = "وليد هاني محمد عبد الخالق";
  return (
    <Box sx={{ width: "100%" }}>
      {/* top buttons */}
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Button
          variant={pageContent === 1 ? "contained" : "outlined"}
          onClick={() => {
            setPageContent(1);
          }}
        >
          View Arabic Certificate
        </Button>
        <Button
          variant={pageContent === 2 ? "contained" : "outlined"}
          onClick={() => {
            setPageContent(2);
          }}
        >
          Compare Ar & En Certificates
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            convertToPDF(3);
          }}
        >
          Open Arabic Certificate
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            convertToPDF(4);
          }}
        >
          Download En Certificate
        </Button>
      </Box>

      {pageContent === 1 && (
        <Box ref={contentRef} dir="rtl">
          {/* 1st page */}
          <Box>الشهادة: {`MC-1328062-60001-702512-V2`}</Box>
          <Box>التاريخ: {`2023 11/10`}</Box>
          <Box
            sx={{
              display: "flex",
              gap: "50px",
              my: "10px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#D3D3D3",
                p: "10px",
                width: "300px",
              }}
            >
              <Box sx={{}}>السيد: {sir}</Box>
            </Box>
            <Box
              sx={{
                p: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ fontWeight: "bold" }}>بوبا إيجيبت للتأمين</Box>
              <Box sx={{}}>مبنى رقم /٣ب،١ قطعة ،٣٣ ميفيدا بيزنس بارك،</Box>
              <Box sx={{}}>التجمع الخامس،</Box>
              <Box sx={{}}>رقم بريدي ،١١٨٣٥</Box>
              <Box sx={{}}>القاهرة الجديدة، مصر</Box>
              <Box sx={{}}>{`هاتف: ${phone}`}</Box>
              <Box sx={{}}>{`فاكس: ${phax}`}</Box>
              <Box
                component="a"
                href="mailto:egyptcustserv@bupa.com"
                sx={styles.link}
              >
                {`egyptcustserv@bupa.com`}
              </Box>
              <Box
                component="a"
                href="http://www.bupaglobal.com"
                sx={styles.link}
              >
                www.bupaglobal.com
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              whiteSpace: "pre-line",
            }}
          >
            {intro()}
          </Box>
          <Box sx={{ fontWeight: "bold", whiteSpace: "pre-line" }}>
            <Box component="span" sx={{ textDecoration: "underline" }}>
              {tableDescriptionPrefix()}
            </Box>
            <Box component="span">{tableDescription()}</Box>
          </Box>
          <Box>
            <Box sx={{ fontWeight: "bold" }}>{contractInfoPrefix()}</Box>
            <Box>{contractInfo()}</Box>
          </Box>
          <Box sx={{ fontWeight: "bold", whiteSpace: "pre-line" }}>
            <span>{lastSectionP1()} </span>
            <a href="https://fra.gov.eg/" style={styles.link}>
              /https://fra.gov.eg
            </a>
            <span> {lastSectionP2()}</span>
          </Box>

          <Table />
        </Box>
      )}
      {pageContent === 2 && (
        <Box>
          <iframe
            title="PDF Viewer"
            src={translatedArCertificate}
            width={`${2480 / 4}px`}
            height={`${3508 / 4}px`}
            frameBorder="0"
          />
          <iframe
            title="PDF Viewer"
            src={uploadedEnCertificateUrl}
            width={`${2480 / 4}px`}
            height={`${3508 / 4}px`}
            frameBorder="0"
          />
        </Box>
      )}
    </Box>
  );
};

export default PdfViewer;
