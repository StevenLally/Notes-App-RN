import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, ScrollView, Button, Modal, StyleSheet, Alert } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from './LoadingComponent';
import { postCategory, deleteCategory, deleteCategoryNotes } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    categories: state.categories,
    notes: state.notes
  };
};

const mapDispatchToProps = {
  postCategory,
  deleteCategory,
  deleteCategoryNotes
};


function RenderCategories(props) {
  const { notes } = props;
  const { categories } = props;
  const { navigate } = props;

  function RenderCategoryItem({ item }) {
    const categoryNotes = notes.filter(note => note.categoryId === item.id);
    const numCategoryNotes = categoryNotes.length;
    return (
      <View>
        <TouchableOpacity onPress={() => navigate('Notes', { categoryId: item.id })}>
          <Card title={item.category}>
            <Text style={{ textAlign: 'center' }}>{`${numCategoryNotes} Total Notes`}</Text>
            <View style={styles.cardRow}>
              <Icon
                name="trash"
                type="font-awesome"
                color='#5637DD'
                raised
                reverse
                style={styles.cardItem}
                onPress={() => {
                  Alert.alert(
                    'Delete Note?',
                    'Are you sure you wish to delete this note?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Not Deleted'),
                        style: 'cancel'
                      },
                      {
                        text: 'OK',
                        onPress: () => props.handleDelete(item.id, numCategoryNotes)
                      }
                    ],
                    { cancelable: false }
                  )
                }}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      renderItem={RenderCategoryItem}
      keyExtractor={item => item.id.toString()}
    />
  )
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

  handleDelete(categoryId, numCategoryNotes) {
    if (numCategoryNotes === 0) {
      this.props.deleteCategory(categoryId);
    } else {
      Alert.alert(
        'Notes Exist In Category',
        'Are you sure you wish to delete this category and all its contents?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Not Deleted'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => {
              this.props.deleteCategoryNotes(categoryId);
              this.props.deleteCategory(categoryId);
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;

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
        <RenderCategories
          categories={this.props.categories.categories}
          notes={this.props.notes.notes}
          navigate={navigate}
          handleDelete={(categoryId, numCategoryNotes) => this.handleDelete(categoryId, numCategoryNotes)}
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
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  cardItem: {
    flex: 1,
    marginBottom: 5,
    borderRadius: 5,
    height: 30
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);