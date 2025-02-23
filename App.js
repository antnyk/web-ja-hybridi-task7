import { FlatList, Text, TextInput, View, Button, Pressable } from 'react-native';
import Styles from './Style';
import { useReducer, useState, useId } from 'react';
import { StatusBar } from 'expo-status-bar';
import uuid from 'react-native-uuid';

const initialTodos = [
  {
    id: uuid.v4(),
    text: "Todo example (click to delete)",
  },
]

const reducer = (state, action) => {
  switch(action.type) {
    case "REMOVE":
      return  state.filter(i => i.id !== action.id)
    case "ADD":
      return [
        ...state,
        { id: uuid.v4(), text: action.text}
      ]
    default:
      throw new Error();
  }
}

export default function App() {
  const [addItem, setAddItem] = useState('')
  const [todos, dispatch] = useReducer(reducer, initialTodos)

  // called when we press save
  const handleAdd = () => {
    // the todo task can not be empty
    if (addItem !== ""){
      dispatch({type: "ADD", text: addItem})
      setAddItem('')
    }
  }

  // called when we click a text field in the list
  const handleRemove = (thisId) => {
    dispatch({type: "REMOVE", id: thisId})
  }

  return (
    <View style={Styles.container}>
      <View style={{marginTop: 16, flex: 1, flexDirection: 'row', maxHeight: 40, maxWidth: 260}}>
        <TextInput
          style={Styles.userInput}
          onChangeText={setAddItem}
          placeholder='Add todo...'
          value={addItem}
        />
        <Button
          title="save"
          onPress={handleAdd}
        />
      </View>
      <FlatList
        style={{maxHeight: 600, width: '100%', backgroundColor:'#faf9f5'}}
        data={todos}
        renderItem={({item}) => (
          <Pressable onPress={() => handleRemove(item.id)}>
            <Text key={item.id} style={Styles.listItem}>{item.text}</Text>
          </Pressable>
        )}
      />
      <StatusBar style='auto'/>
    </View>
  );
}
