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
  todoBox: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todo: { flexDirection: "row", alignItems: "center", gap: 10 },
  todoText: { color: "white", fontSize: 18, fontWeight: "500" },
});
