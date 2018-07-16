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
        var current = this.state.editorState.getCurrentContent().getPlainText();
        this.setState({
            editorState: editorState,
            saveTimer: setTimeout(() => this.props.save(this.props.id, current), 2000)
        });
        
        /*if (current === 'logout') {
            this.socket.emit('logout', this.state.userdata);
        } else {
            this.socket.emit('update', current);
        }
        */
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.body))}
    }

    render() {
        console.log(this.props.readOnly);
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
