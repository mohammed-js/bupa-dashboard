import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import {
  phone,
  phax,
  intro,
  tableDescriptionPrefix,
  tableDescription,
  contractInfo,
  contractInfoPrefix,
  lastSection,
  lastSectionP1,
  lastSectionP2,
  notCoveredText,
  convertDateFormat,
} from "../../utils/generalUtils.js";
import { notifySuccess, notifyError } from "../../utils/toastify.js";
import { convertToPDF } from "../../utils/pdf-generators.js";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "./Table.js";
const PdfViewer = ({ uploadedEnCertificate, data, setStep, setData }) => {
  const [uploading, setUploading] = useState(false);
  // * data extraction
  const certificatedId = data.id;
  const main_info = data.data.main_info;
  const currency = main_info.annual_maximum_currency;
  const customers = data.data.customers;
  // ------------
  const [lastPageContent, setLastPageContent] = useState(1);
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

  const contentRef = useRef(null);
  const [refSnapshot, setRefSnapshot] = useState(null);

  useEffect(() => {
    if (lastPageContent === 1) {
      convertToPDF(
        contentRef.current,
        1,
        setTranslatedArCertificate,
        refSnapshot,
        setRefSnapshot
      );
    }
  }, [lastPageContent]);
  return (
    <Box sx={{ width: "100%" }}>
      {/* top buttons ----------------------------------------------------------------------------------------------- */}
      <Box sx={{ display: "flex", gap: "10px", mb: "15px" }}>
        <Button
          sx={{
            fontSize: { xs: "10px", sm: "14px" },
            p: { xs: "0px", sm: "5px" },
          }}
          variant={lastPageContent === 1 ? "contained" : "outlined"}
          onClick={() => {
            setLastPageContent(1);
          }}
        >
          View Arabic Certificate
        </Button>
        <Button
          sx={{
            fontSize: { xs: "10px", sm: "14px" },
            p: { xs: "0", sm: "5px" },
          }}
          variant={lastPageContent === 2 ? "contained" : "outlined"}
          onClick={() => {
            setLastPageContent(2);
            convertToPDF(
              contentRef.current,
              2,
              setTranslatedArCertificate,
              refSnapshot
            );
          }}
        >
          Compare Ar & En Certificates
        </Button>
        {/* <Button
          sx={{
            fontSize: { xs: "10px", sm: "14px" },
            p: { xs: "0", sm: "5px" },
          }}
          variant="outlined"
          onClick={() => {
            convertToPDF(
              contentRef.current,
              3,
              setTranslatedArCertificate,
              refSnapshot
            );
          }}
        >
          Open Arabic Certificate
        </Button> */}
        <Button
          sx={{
            fontSize: { xs: "10px", sm: "14px" },
            p: { xs: "0", sm: "5px" },
          }}
          variant="outlined"
          onClick={() => {
            convertToPDF(
              contentRef.current,
              4,
              setTranslatedArCertificate,
              refSnapshot
            );
          }}
        >
          Download Arabic Certificate
        </Button>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { xs: "10px", sm: "14px" },
            p: { xs: "0", sm: "5px" },
            pointerEvents: uploading ? "none" : "initial",
          }}
          variant="outlined"
          onClick={() => {
            setUploading(true);
            convertToPDF(
              contentRef.current,
              5,
              setTranslatedArCertificate,
              refSnapshot,
              setRefSnapshot,
              certificatedId,
              setUploading
            );
          }}
        >
          {uploading ? (
            <CircularProgress sx={{ fontSize: "10px" }} size="15px" />
          ) : (
            "Upload Arabic Certificate To Database"
          )}
        </Button>
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { xs: "10px", sm: "14px" },
            p: { xs: "0", sm: "5px" },
            color: "#fff",
          }}
          variant="contained"
          color="success"
          onClick={() => {
            setData({});
            setStep(1);
          }}
        >
          Translate Another Certificate
        </Button>
      </Box>
      {/* <a href={translatedArCertificate} target="_blank">
        open in a new tab
      </a> */}
      {/* html content ----------------------------------------------------------------------------------------------- */}
      {lastPageContent === 1 && (
        <Box
          style={{ fontFamily: "Arial, sans-serif" }}
          ref={contentRef}
          dir="rtl"
          sx={{ lineHeight: "1.3", color: "#000" }}
        >
          {/* 1st page */}
          <Box>الشهادة: {main_info.certificate_number}</Box>
          <Box>التاريخ: {main_info.certificate_issuance_date}</Box>
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
              <Box sx={{}}>
                {customers[0].title === "mr" ? "السيد" : "السيدة"}:
                {customers[0].name}
              </Box>

              {/* {main_info.address.split(",").map((line, index) => ( */}
              {main_info.address.split(/,|-/).map((line, index) => (
                <Box key={index}>{line.trim()}</Box>
              ))}
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
              <Box sx={{}}>رقم بريدي ١١٨٣٥،</Box>
              <Box sx={{}}>القاهرة الجديدة، مصر</Box>
              <Box sx={{}}>{phone}</Box>
              <Box sx={{}}>{phax}</Box>
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
              mb: "10px",
            }}
          >
            {intro(
              customers[0]?.title === "mr" ? "السيد" : "السيدة",
              customers[0]?.name,
              customers[0]?.plans?.[0].annual_maximum,
              currency,
              customers.filter((customer) => customer.is_main)[0].area_of_cover
            )}
          </Box>

          <Box sx={{ mb: "20px", minHeight: "350px" }}>
            <Table
              certificate_number={main_info.certificate_number}
              certificate_issuance_date={main_info.certificate_issuance_date}
              headerData={[
                "الاسم",
                "تاريخ الميلاد",
                "تاريخ بدء التغطية",
                "تاريخ نهاية التغطية",
                "النطاق الجغرافي للتغطية",
              ]}
              bodyData={customers.map((item) => ({
                a:
                  item.title === "mr"
                    ? `السيد/ ${item.name}`
                    : `السيدة/ ${item.name}`,
                b: item.date_of_birth,
                c: item.cover_start,
                d: item.cover_end,
                e: item.area_of_cover,
              }))}
            />
          </Box>
          <Box sx={{ mb: "15px" }}>
            <Box sx={{ fontWeight: "bold" }}>{contractInfoPrefix()}</Box>
            <Box>{contractInfo()}</Box>
          </Box>
          {customers.map((customer) => (
            <Box sx={{ mb: "35px", breakInside: "avoid" }}>
              <Box sx={{ fontWeight: "bold", whiteSpace: "pre-line" }}>
                <Box component="span" sx={{ textDecoration: "underline" }}>
                  {tableDescriptionPrefix(customer.title)}
                </Box>
                <Box component="span">
                  {tableDescription(
                    customer.name,
                    customer.membership_number,
                    customer.date_of_birth,
                    customer.country
                  )}
                </Box>
              </Box>
              {/*------------------------------- plans ---------------------------------- */}
              <Table
                headerData={[
                  "الخطة التأمينية",
                  customer?.plans[0].annual_deductible
                    ? `التحمل السنوي (${currency})`
                    : null,
                  `الحد الأقصى السنوي (${currency})`,
                ].filter((item) => item !== null)}
                bodyData={customer?.plans.map((item) => {
                  return item.annual_deductible
                    ? {
                        a: item.plan_name,
                        b: item.annual_deductible,
                        c: item.annual_maximum,
                      }
                    : {
                        a: item.plan_name,
                        b: item.annual_maximum,
                      };
                })}
              />
              {/*------------------------------- additional info (broker) ---------------------------------- */}
              {customer?.additional_information?.length > 0 && (
                <Table
                  headerData={["معلومات إضافية", ""]}
                  bodyData={customer?.additional_information
                    .map((item) => {
                      return [
                        {
                          a: "وسيط التأمين",
                          b: item.intermediary_name,
                        },
                        {
                          a: "رقم التسجيل بالهيئة العالمة للرقابة المالية",
                          b: item.regulator_id,
                        },
                        {
                          a: "نسبة العمولة الأساسية لوسيط التأمين",
                          b: `${item.percentage}%`,
                        },
                      ];
                    })
                    .flat()}
                />
              )}
              {/* ------------------------------- underwriting terms ---------------------------------- */}
              {/* title (بيانات الاكتتاب) */}
              {customer?.underwriting_terms?.some((item) => item.name) && (
                <Table headerData={["بيانات الاكتتاب"]} />
              )}
              {/* 0) no underwriting terms */}
              {customer?.underwriting_terms?.some(
                (item) => item == "لا يوجد"
              ) && (
                <Table
                  headerData={["بيانات الاكتتاب"]}
                  bodyData={[{ a: "لا يوجد" }]}
                />
              )}
              {/* 1) covered + not pre-existing */}
              {customer?.underwriting_terms?.some(
                (item) =>
                  item.is_covered && !item.is_pre_existing && item !== "لا يوجد"
              ) && (
                <>
                  <Table headerData={["بيانات الاكتتاب"]} />
                  <Table
                    headerData={[
                      "يتم تغطية الحالات المرضية التاية بموجب خطتك التأمينية:",
                    ]}
                    headerColor="#5b9bd5"
                    bodyData={customer?.underwriting_terms
                      .filter(
                        (item) => item.is_covered && !item.is_pre_existing
                      )
                      .map((item) => ({
                        a: item.name,
                      }))}
                  />
                </>
              )}
              {/* 2) covered + pre-existing */}
              {customer?.underwriting_terms?.some(
                (item) =>
                  item.is_covered && item.is_pre_existing && item !== "لا يوجد"
              ) && (
                <Table
                  headerData={[
                    "يتم تغطية الحالات المرضية السابقة للتعاقد التاية بموجب خطتك التأمينية:",
                  ]}
                  headerColor="#5b9bd5"
                  bodyData={customer?.underwriting_terms
                    .filter((item) => item.is_covered && item.is_pre_existing)
                    .map((item) => ({
                      a: item.name,
                    }))}
                />
              )}
              {/* 3) uncovered + not pre-existing */}
              {customer?.underwriting_terms?.some(
                (item) =>
                  !item.is_covered &&
                  !item.is_pre_existing &&
                  item !== "لا يوجد"
              ) && (
                <Table
                  headerData={[
                    "لا يتم تغطية الاستثناءات الخاصة التالية بموجب خطتك التأمينية:",
                  ]}
                  headerColor="#5b9bd5"
                  bodyData={customer?.underwriting_terms
                    .filter((item) => !item.is_covered && !item.is_pre_existing)
                    .map((item) => ({
                      a: notCoveredText(
                        customer.title,
                        customer.name,
                        convertDateFormat(item.date),
                        item.is_outpatient,
                        item.name,
                        item.applies_to
                      ),
                    }))}
                />
              )}
              {/* 4) uncovered + pre-existing */}
              {customer?.underwriting_terms?.some(
                (item) =>
                  !item.is_covered && item.is_pre_existing && item !== "لا يوجد"
              ) && (
                <Table
                  headerData={[
                    "لا يتم تغطية الحالات المرضية السابقة للتعاقد التالية بموجب خطتك التأمينية:",
                  ]}
                  headerColor="#5b9bd5"
                  bodyData={customer?.underwriting_terms
                    .filter((item) => !item.is_covered && item.is_pre_existing)
                    .map((item) => ({
                      a: notCoveredText(
                        customer.title,
                        customer.name,
                        customer.cover_start,
                        item.name,
                        item.applies_to
                      ),
                    }))}
                />
              )}
            </Box>
          ))}
          <Box sx={{ fontWeight: "bold", whiteSpace: "pre-line", mb: "10px" }}>
            <span>{lastSectionP1()} </span>
            <a href="https://fra.gov.eg/" style={styles.link}>
              /https://fra.gov.eg
            </a>
            <span> {lastSectionP2()}</span>
          </Box>
        </Box>
      )}
      {lastPageContent === 2 && (
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            mb: "50px",
          }}
        >
          <iframe
            title="PDF Viewer"
            src={uploadedEnCertificateUrl}
            width={`${2480 / 4.5}px`}
            height={`${3508 / 4.5}px`}
            frameBorder="0"
          />
          <iframe
            title="PDF Viewer"
            src={translatedArCertificate}
            width={`${2480 / 4.5}px`}
            height={`${3508 / 4.5}px`}
            frameBorder="0"
          />
        </Box>
      )}
    </Box>
  );
};

export default PdfViewer;
