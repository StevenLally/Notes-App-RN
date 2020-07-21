import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { fetchCategories, fetchNotes } from '../redux/ActionCreators';
import Categories from './CategoriesComponent';
import Notes from './NotesComponent';

const mapDispatchToProps = {
  fetchCategories,
  fetchNotes
};

const Stack = createStackNavigator();

class Main extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchNotes();
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Categories" component={Categories} options={{ title: 'Note Categories' }} />
          <Stack.Screen name="Notes" component={Notes} options={{ title: 'Notes' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);