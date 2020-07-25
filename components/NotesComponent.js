import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList, Modal, StyleSheet, Button, Alert } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import Loading from './LoadingComponent';
import { connect } from 'react-redux';
import { deleteNote, postNote } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = {
  postNote,
  deleteNote
};

function RenderNotes(props) {
  const { notes } = props;

  const renderNoteItem = ({ item }) => {

    return (
      <View>
        <Card title={item.title}>
          <Text>{item.text}</Text>
          <View style={styles.cardRow}>
            <Icon
              name="pencil"
              type="font-awesome"
              color='#5637DD'
              raised
              reverse
              style={styles.cardItem}
            />
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
                      onPress: () => props.handleDelete(item.id)
                    }
                  ],
                  { cancelable: false }
                )
              }}
            />
          </View>
        </Card>
      </View>
    );
  };

  return (
    <FlatList
      data={notes}
      renderItem={renderNoteItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: '',
      text: ''
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

  handleAddNote(categoryId) {
    this.props.postNote(categoryId, this.state.title, this.state.text);
    this.toggleModal;
  }

  resetForm() {
    this.setState({
      showModal: false,
      title: '',
      text: ''
    });
  }

  handleDelete(noteId) {
    this.props.deleteNote(noteId);
  }

  render() {
    const { categoryId } = this.props.route.params;
    const notes = this.props.notes.notes.filter(note => note.categoryId === categoryId);

    if (this.props.notes.isLoading) {
      return <Loading />
    }

    if (this.props.notes.errMess) {
      return (
        <View>
          <Text>{this.props.notes.errMess}</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <RenderNotes
          notes={notes}
          handleDelete={(noteId) => this.handleDelete(noteId)}
        />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Input
              placeholder='Note Title'
              onChangeText={(title) => this.setState({ title: title })}
              value={this.state.title}
            />

            <Input
              placeholder=''
              onChangeText={(text) => this.setState({ text: text })}
              value={this.state.text}
            />

            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleAddNote(categoryId);
                  this.resetForm();
                }}
                color='#5637DD'
                title='Add Note'
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
    margin: 10
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);