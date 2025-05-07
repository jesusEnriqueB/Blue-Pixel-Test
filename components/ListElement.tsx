import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

type ListElementProps = {
    title: string;
    completed: boolean;
    onDelete: () => void;
    onToggle: (completed: boolean) => void;
};

const ListElement = ({ title, completed, onDelete, onToggle }: ListElementProps) => {
    return (
        <View style={styles.container}>
            <Checkbox
                value={completed}
                onValueChange={onToggle}
                style={styles.checkbox}
            />
            <Text style={[styles.title, completed && styles.completed]}>
                {title}
            </Text>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.trashButton} onPress={onDelete}>
                    <Ionicons name="trash" size={24} color="#ccc" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    checkbox: {
        marginRight: 15,
    },
    title: {
        fontSize: 16,
        color: "#333",
        width: "75%",
    },
    completed: {
        textDecorationLine: "line-through",
        color: "#666",
    },
    trashButton: {
        padding: 10,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ListElement;