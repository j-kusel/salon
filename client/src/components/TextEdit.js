import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import io from 'socket.io-client';
import axios from 'axios';

class TextEdit extends Component {
    /* props
     * key: index of Editor on the page
     * editable: boolean - can be edited or not
     */

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            saveTimer: null
        };
        this.onChange = this.onChange.bind(this);
    }



    onChange(editorState) {
        clearTimeout(this.state.saveTimer);
        var current = editorState.getCurrentContent().getPlainText();
        var theTimer = null;
        if (current !== this.state.editorState.getCurrentContent().getPlainText()) {
            theTimer = setTimeout(() => this.props.save(this.props.id, current), 2000);
        }
        this.setState({
            editorState: editorState,
            saveTimer: theTimer
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.body))}
    }

    render() {
        return (
            <div className='editor-container col-xs-3'>
                <Editor 
                    className='editor'
                    editorState={this.state.editorState} 
                    onChange={this.onChange}
                    readOnly={this.props.readOnly}
                />
            </div>
        );
    }
}

export default TextEdit;
