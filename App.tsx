import { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Grid from './src/components/Grid';
import Interface from './src/components/Interface';

export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    }
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.interface}>
        <Interface />
      </View>
      <View style={styles.gridContainer}>
        <Grid />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  interface: {
    flex: 1,
  },
  gridContainer: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  }
});
