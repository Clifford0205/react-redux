import React from 'react';
import store from '../store/index.js';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import {
  closeRegisterModal,
  modalInputChangeAction,
  addItemAction,
  editItemAction,
} from '../store/actionCreators.js';
import { connect } from 'react-redux';

class StudentModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.showModal}
          onHide={() => this.props.handleModalClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              學生資料 {this.props.disableIdField ? '編輯' : '新增'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  學號
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="id"
                disabled={this.props.disableIdField}
                value={
                  /* 因為this.props預設為0，不要該數字0出現，應該是出現空白字串 */
                  this.props.id ? this.props.id : ''
                }
                onChange={e => this.props.handleModalFormInputChange(e)}
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  姓名
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="name"
                value={this.props.name}
                onChange={e => this.props.handleModalFormInputChange(e)}
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  出生年月日
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="birth"
                value={
                  /* 因為this.props預設為0，不要該數字0出現，應該是出現空白字串(第二種寫法) */
                  this.props.birth || ''
                }
                onChange={e => this.props.handleModalFormInputChange(e)}
              />
            </InputGroup>
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.props.handleModalClose()}
            >
              關閉
            </Button>
            <Button
              variant="primary"
              onClick={() => this.props.handleBtnClickSave()}
            >
              儲存
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const stateToProps = state => {
  return {
    showModal: state.showModal,
    disableIdField: state.disableIdField,
    birth: state.birth,
    id: state.id,
    name: state.name,
  };
};

const dispatchToProps = dispatch => {
  return {
    // 處理跳出視窗的關閉
    handleModalClose() {
      const action = closeRegisterModal();
      dispatch(action);
    },

    //處理輸入欄位
    handleModalFormInputChange(e) {
      const action = modalInputChangeAction(e.target.value, e.target.name);
      dispatch(action);
    },

    //處理儲存資料
    handleBtnClickSave() {
      if (this.state.disableIdField) {
        const newData = {
          id: this.state.id,
          name: this.state.name,
          birth: this.state.birth,
        };

        console.log(newData);
        const action = editItemAction(newData);
        dispatch(action);
        return;
      }

      // 注意：id(學號)與生日，需先轉為數字類型再進入state中
      const item = {
        id: +this.state.id,
        name: this.state.name,
        birth: +this.state.birth,
      };
      // const stateList = this.state.list;
      // console.log(stateList);

      const action = addItemAction(item);
      console.log(action);
      dispatch(action);
    },
  };
};

export default connect(stateToProps, dispatchToProps)(StudentModal);
