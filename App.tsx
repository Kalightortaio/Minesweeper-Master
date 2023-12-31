import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const numColumns = 9;
const numRows = 9;

const windowWidth = Dimensions.get('window').width;

export default function App() {
  const renderCell = (rowIndex: number, columnIndex: number) => {
    return (
      <TouchableOpacity
        key={`${rowIndex}-${columnIndex}`}
        style={styles.cell}
        onPress={() => console.log('Cell pressed', rowIndex, columnIndex)}
      >
        <Text>0</Text>
      </TouchableOpacity>
    )
  }

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
      const columns = [];
      for (let col = 0; col < numColumns; col++) {
        columns.push(renderCell(row, col));
      }
      grid.push(
        <View
          key={`row-${row}`}
          style={styles.row}
        >
          {columns}
        </View>
      )
    }
    return grid;
  }

  return (
    <View style={styles.container}>
      {renderGrid()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: windowWidth / numColumns,
    height: windowWidth / numColumns,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
});
