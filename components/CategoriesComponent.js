import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Button, Modal, StyleSheet } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import { postCategory, deleteCategory } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    categories: state.categories,
    notes: state.notes
  };
};

const mapDispatchToProps = {
  postCategory,
  deleteCategory
};

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      categoryName: ''
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => <Icon
        name='plus'
        type="font-awesome"
        color='#5637DD'
        raised
        reverse
        onPress={() => this.toggleModal()}
      />
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleAddCategory() {
    this.props.postCategory(this.state.categoryName);
    this.toggleModal;
  }

  resetForm() {
    this.setState({
      showModal: false,
      categoryName: ''
    });
  }

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
      <ScrollView>
        <FlatList
          data={this.props.categories.categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id.toString()}
        />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Input
              placeholder='Category Name'
              onChangeText={(category) => this.setState({ categoryName: category })}
              value={this.state.categoryName}
            />

            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleAddCategory();
                  this.resetForm();
                }}
                color='#5637DD'
                title='Add Category'
              />
            </View>

            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color='#808080'
                title='Cancel'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);