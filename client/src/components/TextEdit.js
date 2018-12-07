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

        var body = this.props.body;
        var tags = this.parseTags(body);
        
        this.state = {
            editorState: body ? EditorState.createWithContent(ContentState.createFromText(body)) : EditorState.createEmpty(),
            saveTimer: null,
            tags: tags
        };

        this.props.tagger(this.props.id, tags);

        this.onChange = this.onChange.bind(this);
        this.parseTags = this.parseTags.bind(this);
    }



    onChange(editorState) {
        var current = editorState.getCurrentContent().getPlainText();
        var theTimer = null;

        // COMPARE CURRENT TEXT WITH PREVIOUS CHANGE
        if (current !== this.state.editorState.getCurrentContent().getPlainText()) {
            console.log('change!');
            // RESET THE SAVE TIMER
            var tags = this.parseTags(current);
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

    parseTags(content) {
        var hashtagger = /\B#(\w)\w+/g;
        var results = [];
        var m = hashtagger.exec(content);
        while (m) {
            results.push(m[0].substring(1));
            m = hashtagger.exec(content);
        }
        return results;
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        console.log('when does this get called?');
        return {editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.body))}
    }
*/
    render() {

        var rawtags = this.state.tags;
        var tags = [];
        rawtags.forEach((tag) => {
            tags.push(<p key={tag}>{tag}</p>);
        });
        
        return (
            <div className='editor-container col-xs-3'>
                <Editor 
                    className='editor'
                    editorState={this.state.editorState} 
                    onChange={this.onChange}
                    readOnly={this.props.readOnly}
                />
                <div className="tags">
                    <p>hi</p>
                    {tags}
                </div>

            </div>
        );
    }
}

export default TextEdit;
