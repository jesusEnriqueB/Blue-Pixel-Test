import { IItem } from "@/schemas/List";
import { ITEMS_KEY } from "@/screens/ListScreen";
import { getItemStorage } from "@/storage/asyncStorage";
import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type ModalAddListElementProps = {
    visible: boolean;
    handleCloseModal: () => void;
    handleAddItem: (title: string) => void;
};

const ModalAddListElement = ({visible, handleCloseModal, handleAddItem}: ModalAddListElementProps) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleAdd = async () => {
        setLoading(true);
        try {
            if (title.trim() === '') {
                setError('Title is required');
                return
            } 
            const currentItems = await getItemStorage<IItem[]>(ITEMS_KEY);
            if (!currentItems) {
                handleSaveNewItem();
                return;
            }
            const existItem = currentItems?.find((item) => item.text === title);
            if (existItem) {
                setError('Task already exists');
                return;
            }
            handleSaveNewItem();
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNewItem = () => {
        handleAddItem(title);
        onCloseModal();
    };

    const onCloseModal = () => {
        setTitle('');
        setError('');
        handleCloseModal();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCloseModal}
        >
            <Pressable style={styles.modalContainer} onPress={onCloseModal}>
                <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Enter title"
                    />
                    {error !== '' && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity disabled={loading} style={styles.cancelButton} onPress={onCloseModal}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleAdd} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Add</Text>
                        )}
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 10,
    },
    cancelButton: {
      backgroundColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    cancelButtonText: {
      color: '#666',
      fontSize: 16,
      marginLeft: 10,
    },
});

export default ModalAddListElement;