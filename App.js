import React from 'react';
import {AsyncStorage} from 'react-native';
import { Button, ScrollView, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';



export default class HelloWorldApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Anonymous",
      message : "",
      messageTab: []
    };
  };

  _displayResult() {
    if (this.state.message !== "") {
      var tab= this.state.messageTab;
      tab.push({
        message: this.state.message
      });
      this.setState({messageTab: tab})
    }
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('userName', this.state.userName);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        this.setState({userName});
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Welcome To the Chat</Text>
        </View>
        <View style={styles.viewText}>
          <TextInput style={styles.name}
            onChangeText={(userName) => this.setState({userName})}
            placeholder="Entrer votre nom"
            value={this.state.userName}
          />
          <Button style={styles.buttonInput}
            onPress={() => {this._storeData()}}
            title="enter"
          />
        </View>
        <View style={styles.messages}>
          <ScrollView>
            {this.state.messageTab.map((item, key) => {
              return <Text key={key}>{this.state.userName} : {item.message}</Text>
            })}
          </ScrollView>
        </View>
        <View style={styles.viewInputMessage}>
          <TextInput
            style={styles.inputMessage}
            onChangeText={(message) => this.setState({message})}
            placeholder="Enter your message"
          />
          <Button style={styles.buttonInput}
            onPress={() => {this._displayResult()}}
            title="Send"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  viewTitle: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2089dc"
  },
  title: {
    color: "#ffffff"
  },
  viewText: {
    flex:1,
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1.5,
  },
  name: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center"
  },
  viewInputMessage: {
    flex: 1,
    flexDirection: "row",
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1.5,
  },
  inputMessage: {
    flex: 1,
  },
  messages: {
    flex: 6
  },
  buttonInput: {
    alignItems: "center",
    justifyContent: "center"
  }
});
