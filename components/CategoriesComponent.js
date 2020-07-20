import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import { postCategory } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    categories: state.categories,
    notes: state.notes
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
    const { navigate } = this.props.navigation;

    const renderCategory = ({ item }) => {

      const categoryNotes = this.props.notes.notes.filter(note => note.categoryId === item.id);

      return (
        <View>
          <TouchableOpacity onPress={() => navigate('Notes', { categoryId: item.id })}>
            <Card title={item.category}>
              <Text style={{ textAlign: 'center' }}>{`${categoryNotes.length} Total Notes`}</Text>
            </Card>
          </TouchableOpacity>
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