import { useEffect } from 'react';
import { StyleSheet, View, StatusBar, Dimensions } from 'react-native';
import Grid from './src/components/Grid';
import Interface from './src/components/Interface';

export default function App() {
  const windowWidth = Dimensions.get('window').width;
  const gridMargin = roundToClosestEven((0.05 * windowWidth));
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    }
  }, [])
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    interface: {
      flex: 1,
      width: '100%',
      borderWidth: 2,
      borderColor: 'red',
      backgroundColor: 'blue',
    },
    gridContainer: {
      flex: 11,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'red',
      backgroundColor: 'blue',
      zIndex: 2,
    },
    grid: {
      alignItems: 'center',
      margin: gridMargin,
      borderWidth: 2,
      borderColor: 'red',
      backgroundColor: 'white',
      zIndex: 1,
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.interface}>
        <Interface />
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          <Grid />
        </View>
      </View>
    </View>
  );
}

function roundToClosestEven(n: number) {
  return Math.round(n / 2) * 2;
}