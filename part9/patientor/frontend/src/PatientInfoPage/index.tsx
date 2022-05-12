import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Chip } from "@material-ui/core";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientListPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();
  const [patientInfo, setPatientInfo] = useState<Patient>();
  // const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [, setError] = React.useState<string>();

  const fetchPatientInfo = async () => {
    try {
      if (!Object.prototype.hasOwnProperty.call(patients, id as PropertyKey)) {
        const res = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        setPatientInfo(res.data);
      } else {
        setPatientInfo(patients[id as string]);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else if (e.message) {
        console.error("Error", e.message);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(e.message);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    void fetchPatientInfo();
  }, []);

  // const openModal = (): void => setModalOpen(true);
  //
  // const closeModal = (): void => {
  //     setModalOpen(false);
  //     setError(undefined);
  // };

  // const submitNewPatient = async (values: PatientFormValues) => {
  //     try {
  //         const { data: newPatient } = await axios.post<Patient>(
  //             `${apiBaseUrl}/patients`,
  //             values
  //         );
  //         dispatch({ type: "ADD_PATIENT", payload: newPatient });
  //         closeModal();
  //     } catch (e: unknown) {
  //         if (axios.isAxiosError(e)) {
  //             console.error(e?.response?.data || "Unrecognized axios error");
  //             setError(String(e?.response?.data?.error) || "Unrecognized axios error");
  //         } else {
  //             console.error("Unknown error", e);
  //             setError("Unknown error");
  //         }
  //     }
  // };

  return (
    <div className="App">
      <Box mt={5}>
        <Typography variant="h6">{patientInfo?.name}</Typography>
        <Chip label={patientInfo?.gender} />
        <p>ssn: {patientInfo?.ssn}</p>
        <p>occupation: {patientInfo?.occupation}</p>
      </Box>
    </div>
  );
};

export default PatientListPage;
