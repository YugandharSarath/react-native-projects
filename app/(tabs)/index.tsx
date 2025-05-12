import React, { useState } from 'react';
import {
  Clipboard,
  StyleSheet,
  Switch,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 100,
        padding: 20,
        borderColor: '#ccc',
        borderRadius: 8,
        borderWidth: 1,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
    },
    header: {
        color: 'green',
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 10,
    },
    subHeader: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontSize: 18,
    },
    input: {
        flex: 2,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        fontSize: 16,
    },
    checkboxLabel: {
        fontSize: 20,
    },
    button: {
        padding: 13,
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 15,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    copyButton: {
        marginLeft: 10,
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
        padding: 10,
        fontSize: 14,
    },
    successMessage: {
        color: 'green',
        textAlign: 'center',
        fontSize: 20,
    },
    checkbox: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},

});

const App = () => {


    const [password, setPassword] = useState('');
    const [passwordLength, setPasswordLength] = useState('12');
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');


    const generatePassword = () => {
        let charset = '';
        let newPassword = '';

        if (useSymbols) charset += '!@#$%^&*()';
        if (useNumbers) charset += '0123456789';
        if (useLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (useUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = 0; i < parseInt(passwordLength); i++) {
            newPassword +=
                charset.charAt(Math.floor(
                    Math.random() * charset.length));
        }

        setPassword(newPassword);
    };
 
    const copyToClipboard = () => {
        Clipboard.setString(password);
        setSuccessMessage('Password copied to clipboard!');
        setTimeout(() => setSuccessMessage(''), 2000);
    };

    return (
        <View style={styles.container}>
           
            <Text style={styles.subHeader}>
                Random Password Generator
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Password Length:
                </Text>
                <TextInput
                    keyboardType="numeric"
                    value={passwordLength}
                    onChangeText={(text) => setPasswordLength(text)}
                    style={styles.input}
                />
            </View>
            <View style={styles.checkbox}>
                <Switch
                    value={useSymbols}
                    onValueChange={() => setUseSymbols(!useSymbols)}
                />
                <Text style={styles.checkboxLabel}>
                    Symbols
                </Text>
            </View>
            <View style={styles.checkbox}>
                <Switch
                    value={useNumbers}
                    onValueChange={() => setUseNumbers(!useNumbers)}
                />
                <Text style={styles.checkboxLabel}>
                    Numbers
                </Text>
            </View>
            <View style={styles.checkbox}>
                <Switch
                    value={useLowerCase}
                    onValueChange={() => setUseLowerCase(!useLowerCase)}
                />
                <Text style={styles.checkboxLabel}>
                    LowerCase
                </Text>
            </View>
            <View style={styles.checkbox}>
                <Switch
                    value={useUpperCase}
                    onValueChange={() => setUseUpperCase(!useUpperCase)}
                />
                <Text style={styles.checkboxLabel}>UpperCase</Text>
            </View>
            <TouchableOpacity style={styles.button}
                onPress={generatePassword}>
                <Text style={styles.buttonText}>
                    Generate Password
                </Text>
            </TouchableOpacity>
            {password !== '' && (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                        Generated Password:
                    </Text>
                    <TextInput value={password}
                        style={styles.input} />
                    <TouchableOpacity style={styles.copyButton}
                        onPress={copyToClipboard}>
                        <Text style={styles.buttonText}>
                            Copy
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            {successMessage !== '' && 
            <Text style={styles.successMessage}>
                {successMessage}
            </Text>}
        </View>
    );
};

export default App;