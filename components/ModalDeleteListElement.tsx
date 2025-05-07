import { Modal, StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";

type ModalDeleteListElementProps = {
    visible: boolean;
    handleCloseModal: () => void;
    handleDeleteItem: () => void;
};

const ModalDeleteListElement = ({visible, handleCloseModal, handleDeleteItem}: ModalDeleteListElementProps) => {

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={handleCloseModal}
        >
            <Pressable style={styles.modalContainer} onPress={handleCloseModal}>
                <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.label}>Are you sure want to delete this task?</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.buttonDanger} onPress={handleCloseModal}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
                            <Text style={styles.buttonText}>Confirm</Text>
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
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonDanger: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ModalDeleteListElement;