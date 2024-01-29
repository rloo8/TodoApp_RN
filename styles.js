import { StyleSheet } from "react-native";
import { theme } from "./color";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 40,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  todo: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#ccc",
  },
  todoText: { color: "black", fontSize: 16, fontWeight: "500" },
});
