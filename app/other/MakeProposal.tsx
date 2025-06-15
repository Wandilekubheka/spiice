import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from "@/components/StyledText";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import StyledButton from "@/components/styledButton";
import { jobCard } from "@/features/search/@types/jobCard";
import useMakeProposal from "@/features/search/hooks/useMakeProposal";
import { OfferStatus } from "@/features/@types/offerstatus";
import useUserrStore from "@/store/useUserStore";

type Props = {
  creatorAvatarurl?: string;
};

const MakeProposal = (props: Props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const [skill, setSkill] = useState("");
  const { error, status, makeProposal } = useMakeProposal();
  const user = useUserrStore((state) => state.user);
  useEffect(() => {
    if (error) {
      Alert.alert(error);
      router.back();
    }
  }, [error]);
  useEffect(() => {
    if (status === OfferStatus.PENDING) {
      Alert.alert("Proposal sent successfully!");
      router.back();
    }
  }, [status]);
  useEffect(() => {
    if (user == null) {
      router.replace("/(auth)/login");
      return;
    }
  }, [user]);

  const handleSendProposal = async () => {
    if (!description || !skillSet.length || !title || !price) {
      Alert.alert("Please fill in all fields and add at least one skill.");
      return;
    }
    let budget: number;
    if (isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert("Please enter a valid price.");
      return;
    }
    budget = Number(price);
    const proposalData: jobCard = {
      creator: user!.displayName,
      title: title,
      description: description,
      postedDate: new Date(),
      offerCount: 0,
      budget,
      skills: skillSet,
      creatorId: user!.uid,
    };
    await makeProposal(proposalData);
    // Reset fields after sending
    setDescription("");
    setSkillSet([]);
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <ScrollView>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#99879D" />
          <ThemeText
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginLeft: 10,
              fontFamily: "RedHatDisplayM",
              color: "#99879D",
            }}
          >
            Back
          </ThemeText>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          {props.creatorAvatarurl ? (
            <Image
              source={{ uri: props.creatorAvatarurl }}
              style={{ width: 60, height: 60, borderRadius: 20 }}
            />
          ) : (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 99,
                backgroundColor: Colors.light.tint,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="person" size={24} color="#FFFFFF" />
            </View>
          )}
          <ThemeText style={styles.titleText}>{user.displayName}</ThemeText>
        </View>
        <ThemeText style={styles.titleText}>Make a proposition</ThemeText>
        <TextInput
          style={[styles.textArea, { height: 60, flex: 1, marginRight: 10 }]}
          placeholder="Job title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.textArea, { height: 60, flex: 1, marginRight: 10 }]}
          placeholder="Price offer"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Enter description..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={[styles.textArea, { height: 60, flex: 1, marginRight: 10 }]}
            placeholder="skill set"
            value={skill}
            onChangeText={setSkill}
          />
          <TouchableOpacity
            onPress={() => {
              if (!skill.trim()) {
                Alert.alert("Please enter a skill before adding.");
                return;
              }
              setSkillSet((prev) => [...prev, skill]);
              setSkill("");
            }}
            style={{
              backgroundColor: Colors.light.tint,
              borderRadius: 20,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ width: "80%", alignSelf: "center", marginBottom: 20 }}>
        <StyledButton title="Send" onPress={handleSendProposal} />
      </View>
    </SafeAreaView>
  );
};

export default MakeProposal;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontFamily: "RedHatDisplayBB",
    padding: 15,
  },
  textArea: {
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
});
