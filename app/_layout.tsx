import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";
import { Alert } from "react-native";
import useUserrStore, { UserStoreType } from "@/store/useUserStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PublicSansM: require("../assets/fonts/PublicSans-Medium.ttf"),
    RedHatDisplayM: require("../assets/fonts/RedHatDisplay-Medium.ttf"),
    RedHatDisplayR: require("../assets/fonts/RedHatDisplay-Regular.ttf"),
    RedHatDisplayB: require("../assets/fonts/RedHatDisplay-Bold.ttf"),
    RedHatDisplayBB: require("../assets/fonts/RedHatDisplay-Black.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const userContext = useUserrStore((state: UserStoreType) => state);
  useEffect(() => {
    if (!isLoaded) return;

    // Redirect to the home screen if the user is signed in
    if (!isSignedIn) {
      router.replace("/(auth)/login");
    } else if (userId) {
      updateGlobalStore()
        .then(() => {
          router.replace("/(app)/home");
        })
        .catch((error) => {
          console.error("Error updating global store:", error);
          Alert.alert(error);
        });
    }
  }, [isLoaded, isSignedIn]);

  const updateGlobalStore = async () => {
    if (userId) {
      try {
        const appUser = await getUserFromDatabase(userId);
        if (appUser) {
          userContext.setUser(appUser);
        } else {
          console.warn("No user data found for the given userId.");
          userContext.clearUser();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        userContext.clearUser();

        Alert.alert("Error fetching user data. Please try again later.");
      }
    }
  };
  return <Slot initialRouteName="(auth)" />;
}
