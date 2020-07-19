import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchCategories, fetchNotes } from '../redux/ActionCreators';
import Categories from './CategoriesComponent';

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchNotes
};

const CategoriesNavigator = createStackNavigator(
  {
    Categories: { screen: Categories }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#5637DD'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: <Icon
        name='home'
        type='font-awesome'
        iconStyle={styles.stackIcon}
        onPress={() => navigation.toggleDrawer()}
      />
    })
  }
);

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Notes App</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const MainNavigator = createDrawerNavigator(
  {
    Categories: {
      screen: CategoriesNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='home'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    }
  },
  {
    drawerBackgroundColor: '#CEC8FF',
    contentComponent: CustomDrawerContentComponent
  }
);

class Main extends Component {

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchNotes();
  }

  render() {
    return (
      <View style={{
        flex: 1, paddingTop: Platform.OS === 'ios' ? 0 :
          // @ts-ignore
          Expo.Constants.statusBarHeight
      }}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#5637DD',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60
  },
  stackIcon: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 24
  }
});

export default connect(null, mapDispatchToProps)(Main);