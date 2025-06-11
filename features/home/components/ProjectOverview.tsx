import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProjectStatus } from "@/features/@types/ProjectStatus";
import { ThemeText } from "@/components/StyledText";

type Props = {
  title: string;
  clientName: string;
  status: ProjectStatus;
};

const ProjectOverview = ({ title, clientName, status }: Props) => {
  return (
    <View style={styles.container}>
      <ThemeText style={styles.projectTitle}>{title}</ThemeText>
      <View style={styles.detailsContainer}>
        <ThemeText style={styles.clientStatus}>{clientName}</ThemeText>
        <ThemeText style={styles.clientStatus}>{status}</ThemeText>
      </View>
    </View>
  );
};

export default ProjectOverview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    gap: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  clientStatus: {
    fontSize: 16,
    color: "#99879D",
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
