import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
const AppLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "home") {
            iconName = "apps-outline";
          } else if (route.name === "search") {
            iconName = "search-outline";
          } else if (route.name === "messages") {
            iconName = "chatbubble-ellipses-outline";
          } else {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#D1C4E9",
        tabBarStyle: {
          height: 88,
          paddingTop: 10,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
