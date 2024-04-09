
import React from "react";
import { useRouter } from "next/router";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    border:"10px solid black",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const Certificate = () => {
  const router = useRouter();
  const course_id = router?.query?.course_id;
  return (
      <Document>
        <Page size="A4" style={styles.page} orientation="landscape">
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
  );
};

export default Certificate;
