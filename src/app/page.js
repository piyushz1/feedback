"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "../components/Header"; // Correct import
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box mx={"auto"} maxWidth={1440}>
      <Header />
    </Box>
  );
}
