import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FilterDropdownProps<T extends { toString(): string }> {
  options: T[];
  selectedOption: T;
  onOptionSelected: (option: T) => void;
}

const FilterDropdown = <T extends { toString(): string; },>({ options, selectedOption, onOptionSelected }: FilterDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelected = (option: T) => {
    onOptionSelected(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.buttonText}>{selectedOption.toString()}</Text>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={24} color="#fff" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.option} onPress={() => handleOptionSelected(option)}>
              <Text style={styles.optionText}>{option.toString()}</Text>
              {option === selectedOption && (
                <Ionicons name="checkmark" size={24} color="#4CAF50" style={styles.checkmark} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    zIndex: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  optionsContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
  checkmark: {
    position: 'absolute',
    right: 10,
  },
});

export default FilterDropdown;