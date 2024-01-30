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
  const [editingKey, setEditingKey] = useState(null);
  const [todo, setTodo] = useState();

  const work = () => {
    setWorking(true);
    saveWorkingMode(true);
  };
  const travel = () => {
    setWorking(false);
    saveWorkingMode(false);
  };

  const onChangeText = (event) => setText(event);

  //AsyncStorage에 저장, 불러오기
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem("@toDos", JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const todo = await AsyncStorage.getItem("@toDos");
    todo !== null ? setTodos(JSON.parse(todo)) : null;
  };

  const saveWorkingMode = async (mode) => {
    await AsyncStorage.setItem("@workingMode", mode.toString());
  };
  const loadWorkingMode = async () => {
    const mode = await AsyncStorage.getItem("@workingMode");
    setWorking(mode === "true");
  };

  useEffect(() => {
    loadToDos();
    loadWorkingMode();
  }, []);

  // todo submit시
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = {
      [Date.now()]: { text, working, done: false, edit: false },
      ...todos,
    };

    setTodos(newTodos);
    await saveToDos(newTodos);
    setText("");
  };

  // todo 삭제버튼 클릭시
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

  // done 체크박스 토글
  const toggleDone = async (key) => {
    const newTodos = { ...todos };
    newTodos[key].done = !newTodos[key].done;
    setTodos(newTodos);
    await saveToDos(newTodos);
  };

  // edit input
  const onEditText = (event) => {
    const newTodos = { ...todos };
    setTodo(event);
    newTodos[editingKey].text = todo;
  };

  // edit 버튼 토글
  const toggleEdit = async (key) => {
    const newTodos = { ...todos };

    setEditingKey(key);

    newTodos[key].edit = !newTodos[key].edit;

    setTodo(newTodos[key].text);
    newTodos[key].text = todo;

    setTodos(newTodos);
    await saveToDos(newTodos);
  };
  console.log(editingKey);
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
            <View key={key} style={styles.todoBox}>
              {todos[key].edit ? (
                <TextInput
                  value={todo}
                  onChangeText={onEditText}
                  style={styles.editInput}
                />
              ) : (
                <TouchableOpacity
                  style={styles.todo}
                  onPress={() => toggleDone(key)}
                >
                  <View>
                    <Text>
                      <MaterialIcons
                        name={
                          todos[key].done
                            ? "check-box"
                            : "check-box-outline-blank"
                        }
                        size={30}
                        color={theme.green}
                      />
                    </Text>
                  </View>
                  <Text
                    style={
                      todos[key].done
                        ? {
                            ...styles.todoText,
                            textDecorationLine: "line-through",
                            color: "#888",
                          }
                        : styles.todoText
                    }
                  >
                    {todos[key].text}
                  </Text>
                </TouchableOpacity>
              )}

              <View style={styles.todo}>
                {todos[key].done ? null : (
                  <TouchableOpacity onPress={() => toggleEdit(key)}>
                    <Text>
                      <MaterialIcons
                        name={todos[key].edit ? "check-circle" : "edit"}
                        size={30}
                        color={theme.green}
                      />
                    </Text>
                  </TouchableOpacity>
                )}
                {todos[key].edit ? null : (
                  <TouchableOpacity onPress={() => deleteToDo(key)}>
                    <Text>
                      <MaterialIcons
                        name="cancel"
                        size={30}
                        color={theme.green}
                      />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}
