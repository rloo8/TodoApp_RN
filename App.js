import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./color";
import { useState } from "react";
import { styles } from "./styles";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState();
  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  const onChangeText = (event) => setText(event);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working ? theme.green : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? theme.green : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        placeholder={working ? "Add a to do" : "Where do you wanna go?"}
        placeholderTextColor={theme.green}
      />
    </View>
  );
}
