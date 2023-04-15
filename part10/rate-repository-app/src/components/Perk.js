import {StyleSheet, View} from 'react-native';
import Text from './Text';
import { format } from '../utils/perkValueFormatter';


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
  return (
    <View style={styles.container}>
      <Text style={styles.value} fontWeight='bold'>{format(value)}</Text>
      <Text style={styles.name} color={'textSecondary'}>{name}</Text>
    </View>
  );
};

export default Perk