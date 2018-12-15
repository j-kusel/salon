import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import io from 'socket.io-client';
import axios from 'axios';
import parseTags from '../util/parseTags';
import styled from 'styled-components';


class TextEdit extends Component {
    /* props
     * key: index of Editor on the page
     * editable: boolean - can be edited or not
     */

    constructor(props) {
        super(props);

        var body = this.props.body;
        var tags = parseTags(body);
        
        this.state = {
            editorState: body ? EditorState.createWithContent(ContentState.createFromText(body)) : EditorState.createEmpty(),
            saveTimer: null,
            tags: tags
        };

        this.props.tagger(this.props.id, tags);

        this.onChange = this.onChange.bind(this);
    }



    onChange(editorState) {
        var current = editorState.getCurrentContent().getPlainText();
        var theTimer = null;

        // COMPARE CURRENT TEXT WITH PREVIOUS CHANGE
        if (current !== this.state.editorState.getCurrentContent().getPlainText()) {
            console.log('change!');
            // RESET THE SAVE TIMER
            var tags = parseTags(current);
            this.setState((oldState) => ({tags: tags}));
            this.props.tagger(this.props.id, tags);
            if (this.state.saveTimer) clearTimeout(this.state.saveTimer);
            theTimer = setTimeout(() => this.props.save(this.props.id, current), 2000);
        }
        this.setState({
            editorState: editorState,
            saveTimer: theTimer
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.readOnly) return ({
            editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.body))
        });
        return {};
    } 

    render() {

        var read = this.props.readOnly;
        const EditorContainer = styled.div`
            height: ${read ? '50vh' : '100vh'}
        `;
        return (
            <EditorContainer className={(read ? 'col-sm-6':'col-sm-12') + " editor-container"}>
                <Editor 
                    className='editor'
                    editorState={this.state.editorState} 
                    onChange={this.onChange}
                    readOnly={this.props.readOnly}
                />
            </EditorContainer>
        );
    }
}

export default TextEdit;
