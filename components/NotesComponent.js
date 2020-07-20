import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    categories: state.categories,
    notes: state.notes
  };
};

class Notes extends Component {

  render() {

    return (
      <View>
        <Text>Notes Screen</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Notes);