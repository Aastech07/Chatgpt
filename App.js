
import { useState } from 'react';
import { StyleSheet, Switch, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { myColor } from './Style/Colors';

export default function App() {

  const [text1, setText] = useState([]);
  const [theme, setTheme] = useState('light');

  const apikey = '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'
  const apiUrl = "https://api.openai.com/v1/engines/text-davinci-002/completions"
  const [textinput, setTextInput] = useState('')

  const handleSend = async () => {
    const prompt = textinput
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`
      }
    });

    const text = response.data.choices[0].text

    setText(text)
    setTextInput('')
    console.log(text)
  }

  return (
    <>

      <View style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: myColor.dark }]}>
        <Switch value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{ top: 50, alignSelf: 'center' }} />

        <Text style={{ top: 20, left: 30, fontWeight: 'bold', fontSize: 25, color: "#DC0000" }}>Welcome</Text>
        <Text style={{ top: 30, left: 230, fontWeight: 'bold', fontSize: 16, color: "#00425A" }}>Chat With ChatGpt</Text>

      </View>


      <ScrollView style={theme === 'light' ? styles.text : [styles.text, { backgroundColor: myColor.black }]}>
        <Text style={{ color: "#0E5E6F", fontSize: 16, left: 5, }}>{text1}</Text>
      </ScrollView>

      <View style={theme === 'light' ? styles.input : [styles.input, { backgroundColor: "#3C4048" }]}>
        <TextInput
          style={{
            height: 40,
            // margin: 12,
            // borderWidth: 1,
            marginRight: 75,
            padding: 10,
            left: 30,
            top: 10

          }}
          value={textinput}
          onChangeText={text => setTextInput(text)}
          placeholder="Ask me anythink"
        />

        <TouchableOpacity

          onPress={() => handleSend()}>
          <Text style={{ left: 300, bottom: 25 }}>{<FontAwesome5 name='arrow-alt-circle-right' size={35} color="#00F5FF" />}</Text>

        </TouchableOpacity>

      </View>
    </>

  );
}

const styles = StyleSheet.create({

  container: {
    bottom: 10,

    flex: 0.3,

  },

  text: {
    flex: 1, bottom: 9
  },
  input: {


  }


});
