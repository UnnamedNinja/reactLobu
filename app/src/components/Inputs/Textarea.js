import React from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <TextareaAutosize required={this.props.required}/>;
  }
}
