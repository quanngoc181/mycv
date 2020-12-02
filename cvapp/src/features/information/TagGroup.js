import React from 'react'
import { Tag, Input, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

class TagGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: props.tags,
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
    }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter((tag) => tag !== removedTag)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    })
  }

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value })
  }

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags]
      newTags[editInputIndex] = editInputValue

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      }
    })
  }

  saveInputRef = (input) => {
    this.input = input
  }

  saveEditInputRef = (input) => {
    this.editInput = input
  }

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return <Input ref={this.saveEditInputRef} key={tag} style={{ margin: '5px 10px 5px 0' }} size='small' className='tag-input' value={editInputValue} onChange={this.handleEditInputChange} onBlur={this.handleEditInputConfirm} onPressEnter={this.handleEditInputConfirm} />
          }

          const isLongTag = tag.length > 20

          const tagElem = (
            <Tag className='edit-tag' key={tag} style={{ margin: '5px 10px 5px 0' }} closable={true} onClose={() => this.handleClose(tag)}>
              <span
                onDoubleClick={(e) => {
                  this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                    this.editInput.focus()
                  })
                  e.preventDefault()
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && <Input ref={this.saveInputRef} type='text' size='small' className='tag-input' style={{ margin: '5px 10px 5px 0' }} value={inputValue} onChange={this.handleInputChange} onBlur={this.handleInputConfirm} onPressEnter={this.handleInputConfirm} />}
        {!inputVisible && (
          <Tag className='site-tag-plus' style={{ margin: '5px 10px 5px 0' }} onClick={this.showInput}>
            <PlusOutlined /> Thẻ mới
          </Tag>
        )}
      </>
    )
  }
}

export default TagGroup
