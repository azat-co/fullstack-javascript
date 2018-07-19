'use strict';
const baseApiUrl = `http://localhost:1337`
const cEl = React.createElement

const Header = React.createClass({
  displayName: 'Header',

  render() {
    return cEl(
      'h1',
      null,
      'Chat'
    );
  }
});

const Footer = React.createClass({
  displayName: 'Footer',

  render() {
    return cEl(
      'div',
      null,
      cEl('hr', null),
      cEl(
        'div',
        { className: 'row-fluid' },
        cEl(
          'div',
          { className: 'col-md-12' },
          cEl(
            'div',
            null,
            'Rapid Prototyping with JavaScript and NodeJS (',
            cEl(
              'a',
              { href: 'http://twitter.com/azatmardan' },
              '@azatmardan'
            ),
            ')'
          )
        )
      )
    )
  }
})

const MessageList = React.createClass({
  displayName: 'MessageList',

  render() {
    var messages = this.props.messages;
    // console.log(messages)
    if (!messages.length > 0) return cEl(
      'tr',
      null,
      cEl(
        'td',
        { colspan: '2' },
        'No messages yet'
      )
    );
    return cEl(
      'div',
      { className: 'col-md-12' },
      cEl(
        'table',
        { className: 'table table-bordered table-striped' },
        cEl(
          'caption',
          null,
          'Chat'
        ),
        cEl(
          'thead',
          null,
          cEl(
            'tr',
            null,
            cEl(
              'th',
              { className: 'span2' },
              'Name'
            ),
            cEl(
              'th',
              null,
              'Message'
            )
          )
        ),
        cEl(
          'tbody',
          null,
          messages.map((message) => {
            return cEl(
              'tr',
              { key: message._id },
              cEl(
                'td',
                null,
                message.name
              ),
              cEl(
                'td',
                null,
                message.message
              )
            );
          })
        )
      )
    );
  }
});

var NewMessage = React.createClass({
  displayName: 'NewMessage',

  addMessage() {
    this.props.addMessageCb({
      name: React.findDOMNode(this.refs.username).value,
      message: React.findDOMNode(this.refs.message).value
    })
    React.findDOMNode(this.refs.username).value = ''
    React.findDOMNode(this.refs.message).value = ''
  },

  render() {
    return cEl(
      'div',
      { className: 'row-fluid', id: 'new-message' },
      cEl(
        'div',
        { className: 'col-md-12' },
        cEl(
          'form',
          { className: 'well form-inline' },
          cEl('input', { type: 'text', name: 'username', className: 'input-small', placeholder: 'Username', ref: 'username' }),
          cEl('input', { type: 'text', name: 'message', className: 'input-small', placeholder: 'Message Text', ref: 'message' }),
          cEl(
            'a',
            { id: 'send', className: 'btn btn-primary', onClick: this.addMessage },
            'SEND'
          )
        )
      )
    );
  }
})

const MessageBoard = React.createClass({

  displayName: 'MessageBoard',

  getInitialState: function getInitialState() {
    // return {messages: []}
    return { messages: [{ _id: 1, name: 'Azat', message: 'hi' }] }
  },

  componentWillMount() {
    const url = `${baseApiUrl}/messages.json`

    $.getJSON(url, (result) => {
      // console.log(result)
      if (!result || !result || !result.length) {
        return
      }
      // console.log(result)
      this.setState({ messages: result })
    })

  },

  addMessage: function addMessage(message) {
    const messages = this.state.messages
    $.post(`${baseApiUrl}/messages.json`, JSON.stringify(message), (result) => {
      if (!result || !result || !result.length) {
        console.error('No response')
        return false
      }
      messages.push(message)
      this.setState({ messages: messages })
    })
  },
  render: function render() {
    return cEl(
      'div',
      null,
      cEl(MessageList, { messages: this.state.messages }),
      cEl(NewMessage, { messages: this.state.messages, addMessageCb: this.addMessage })
    )
  }
})

React.render(cEl(Header, null), document.getElementById('header'))
React.render(cEl(Footer, null), document.getElementById('footer'))
React.render(cEl(MessageBoard, null), document.getElementById('message-board'))
