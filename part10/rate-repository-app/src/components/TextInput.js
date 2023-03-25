import {TextInput as NativeTextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginBottom: 5,
    width: 250,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  },
  error: {
    borderColor: 'red',
  },
  
});

const TextInput = ({style, error, ...props}) => {
  const textInputStyle = [styles.input, style, error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
}

export default TextInput;