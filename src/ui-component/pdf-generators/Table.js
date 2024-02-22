import React from "react";
import { Box } from "@mui/material";

export default function Table({
  certificate_number,
  certificate_issuance_date,
  titleColor = "#e5e5e5",
  headerColor = "#1f497d", // #5b9bd5
  bodyColor = "#e5e5e5",
  spacing = "5px",
  headerData = ["الخطة التأمينية"],
  bodyData,
}) {
  const styles = {
    container: {
      breakInside: "avoid",
    },
    title: {
      with: "100%",
      position: "relative",
      top: "5px",
      padding: "8px",
      backgroundColor: titleColor,
      color: "black",
      textAlign: "right",
    },
    table: {
      borderCollapse: "separate",
      borderSpacing: `0 ${spacing}`,
      width: "100%",
      textAlign: "right",
      lineHeight: "1",
    },
    // head
    th: {
      border: "none",
      paddingX: "6px",
      paddingY: "4px",

      backgroundColor: headerColor,
      color: "white",
      textAlign: "right",
      height: "15px",
    },
    // body
    td: {
      border: "none",
      paddingX: "6px",
      paddingY: "2px",
      backgroundColor: bodyColor,
      color: "black",
      textAlign: "right",
    },
  };
  return (
    <Box sx={styles.container}>
      {certificate_number && (
        <Box
          sx={styles.title}
        >{`رقم الوثيقة: ${certificate_number} الصادرة في: ${certificate_issuance_date}`}</Box>
      )}
      <Box component="table" sx={styles.table}>
        <Box component="thead">
          <Box component="tr">
            {headerData.map((item, index) => (
              <Box
                component="th"
                sx={{
                  ...styles.th,
                  width:
                    headerData.length === 5
                      ? "20%"
                      : headerData.length === 4
                      ? "25%"
                      : headerData.length === 3
                      ? "23%"
                      : headerData.length === 2 && index === 0
                      ? "60%"
                      : headerData.length === 2 && index === 1
                      ? "40%"
                      : // : headerData.length === 2
                        // ? "50%"
                        "100%",
                }}
                // colSpan={headerData.length === 2 && index === 0 ? "2" : "1"}
                key={index}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
        {bodyData?.length > 0 && (
          <Box component="tbody">
            {bodyData.map((item) => {
              return (
                <Box component="tr">
                  {Object.entries(item).map(([key, value], index) => (
                    <Box
                      component="td"
                      sx={{
                        ...styles.td,
                        width:
                          headerData.length === 5
                            ? "20%"
                            : headerData.length === 4
                            ? "25%"
                            : headerData.length === 3
                            ? "23%"
                            : headerData.length === 2 && index === 0
                            ? "60%"
                            : headerData.length === 2 && index === 1
                            ? "40%"
                            : // : headerData.length === 2
                              // ? "50%"
                              "100%",
                      }}
                      // colSpan={
                      //   Object.keys(item).length === 2 && index === 0 ? "2" : "1"
                      // }
                    >
                      {value}
                    </Box>
                  ))}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/* tr:nth-child(odd) {
    background-color: #e5e5e5;
  } */
