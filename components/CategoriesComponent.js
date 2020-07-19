import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { postCategory } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = {
  postCategory
};

class Categories extends Component {

  static navigationOptions = {
    title: 'Note Categories'
  };

  render() {

    const renderCategory = ({ item }) => {
      return (
        <View>
          <Card
            title={item.category}
          />
        </View>
      );
    };

    if (this.props.categories.isLoading) {
      return <Loading />
    }

    if (this.props.categories.errMess) {
      return (
        <View>
          <Text>{this.props.categories.errMess}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.categories.categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);