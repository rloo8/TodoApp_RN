import { StatusBar } from "expo-status-bar";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./color";
import { useState } from "react";
import { styles } from "./styles";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState();
  const [todos, setTodos] = useState({});

  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  const onChangeText = (event) => setText(event);
  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, work: working } };

    setTodos(newTodos);
    setText("");
  };
  console.log(todos);
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
        onSubmitEditing={addToDo}
        returnKeyType="done"
        onChangeText={onChangeText}
        value={text}
        style={styles.input}
        placeholder={working ? "Add a to do" : "Where do you wanna go?"}
        placeholderTextColor={theme.green}
      />
    </View>
  );
}
