import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./color";
import { useEffect, useState } from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState();
  const [todos, setTodos] = useState({});

  const work = () => setWorking(true);
  const travel = () => setWorking(false);

  const onChangeText = (event) => setText(event);

  //AsyncStorage에 저장, 불러오기
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem("@toDos", JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem("@toDos");
    s !== null ? setTodos(JSON.parse(s)) : null;
  };
  useEffect(() => {
    loadToDos();
  }, []);

  // todo submit
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, working } };

    setTodos(newTodos);
    await saveToDos(newTodos);
    setText("");
  };

  // todo 삭제
  const deleteToDo = async (key) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const newTodos = { ...todos };
          delete newTodos[key];

          setTodos(newTodos);
          await saveToDos(newTodos);
        },
      },
    ]);
  };

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

      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].working === working ? (
            <View key={key} style={styles.todo}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Text>
                  <MaterialIcons name="cancel" size={30} color={theme.green} />
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}
