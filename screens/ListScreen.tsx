import FilterDropdown from "@/components/FilterDropdown";
import ListElement from "@/components/ListElement";
import ModalAddListElement from "@/components/ModalAddListElement";
import ModalDeleteListElement from "@/components/ModalDeleteListElement";
import { IItem } from "@/schemas/List";
import { getItemStorage, setItemStorage } from "@/storage/asyncStorage";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export enum EFilter {
    ALL = 'all',
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export const ITEMS_KEY = 'items';

const ListScreen = () => {

    const [items, setItems] = useState<IItem[]>([]);
    const [itemSelected, setItemSelected] = useState<IItem | null>(null);
    const [showModalAddListElement, setShowModalAddListElement] = useState(false);
    const [showModalDeleteListElement, setShowModalDeleteListElement] = useState(false);
    const [filter, setFilter] = useState<EFilter>(EFilter.ALL);

    const filteredItems = useMemo(() => {
        switch (filter) {
          case EFilter.ALL:
            return items;
          case EFilter.PENDING:
            return items.filter((item) => !item.completed);
          case EFilter.COMPLETED:
            return items.filter((item) => item.completed);
          default:
            return [];
        }
    }, [filter, items]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const storedItems = await getItemStorage<IItem[]>(ITEMS_KEY);
        if (!storedItems) {
          return;
        }
        setItems(storedItems);
    };

    const handleAddItem = async (title: string) => {
        const newItems = [...items, { text: title, completed: false }];
        setItems(newItems);
        await setItemStorage(ITEMS_KEY, newItems);
    }

    const requestDeleteItem = (index: number) => {
        setShowModalDeleteListElement(true);
        setItemSelected(items[index]);
    }

    const handleDeleteItem = async () => {
        if (!itemSelected) return;
        const newItems = items.filter((_, index) => index !== items.indexOf(itemSelected));
        setItems(newItems);
        await setItemStorage(ITEMS_KEY, newItems);
        setShowModalDeleteListElement(false);
    }

    const handleFilter = (filter: EFilter) => {
        setFilter(filter);
    };

    const handleToggleCompleted = (index: number) => {
        const itemsUpdated = [
            ...items.slice(0, index),
            { ...items[index], completed: !items[index].completed },
            ...items.slice(index + 1)
        ];
        setItems(itemsUpdated);
        setItemStorage(ITEMS_KEY, itemsUpdated);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Todo List</Text>
            <FilterDropdown<EFilter>
                options={[EFilter.ALL, EFilter.PENDING, EFilter.COMPLETED]}
                selectedOption={filter}
                onOptionSelected={handleFilter}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setShowModalAddListElement(true)}>
                <Ionicons name="add-circle" size={48} color="blue" />
            </TouchableOpacity>
            {items.length === 0 ? (
                <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No Items found</Text>
                </View>
            ) : (
                <FlatList
                data={filteredItems}
                renderItem={({ item, index }) => (
                    <ListElement
                        title={item.text}
                        completed={item.completed}
                        onToggle={() => handleToggleCompleted(index)}
                        onDelete={() => requestDeleteItem(index)} 
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                />
            )}
            <ModalAddListElement 
                visible={showModalAddListElement} 
                handleCloseModal={() => setShowModalAddListElement(false)} 
                handleAddItem={handleAddItem}
            />
            <ModalDeleteListElement 
                visible={showModalDeleteListElement} 
                handleCloseModal={() => setShowModalDeleteListElement(false)} 
                handleDeleteItem={handleDeleteItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 34,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemText: {
      flex: 1,
      fontSize: 18,
    },
    emptyListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyListText: {
      fontSize: 18,
      color: '#ccc',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderRadius: 30,
      padding: 10,
      zIndex: 10,
    },
  });

export default ListScreen;