import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from './LoadingComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

function RenderNotes({ notes }) {

  const renderNoteItem = ({ item }) => {

    return (
      <View>
        <TouchableOpacity>
          <Card title={item.title}>
            <Text>{item.text}</Text>
          </Card>
        </TouchableOpacity>
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
  }

  render() {
    const { categoryId } = this.props.route.params;
    const notes = this.props.notes.notes.filter(note => note.categoryId === categoryId);

    if (this.props.notes.isLoading) {
      return <Loading />
    }

    if (this.props.notes.errMess) {
      return (
        <RenderNotes notes={notes} />
      );
    }

    return (
      <RenderNotes notes={notes} />
    );
  }
}

export default connect(mapStateToProps)(Notes);