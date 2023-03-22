import {StyleSheet, View} from 'react-native';
import Text from './Text';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 45,
    justifyContent: 'space-around'
  },
  name: {
    textAlign: 'center'
  },
  value: {
    textAlign: 'center',
  },
});

const Perk = ({name, value}) => {
  if (value > 999) {
    value = (value / 1000).toFixed(1) + "k"
  }

  return (
    <View style={styles.container}>
      <Text style={styles.value} fontWeight='bold'>{value}</Text>
      <Text style={styles.name} color={'textSecondary'}>{name}</Text>
    </View>
  );
};

export default Perk