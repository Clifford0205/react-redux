import React from 'react';
import {
  FormControl,
  Button,
  Container,
  Row,
  Col,
  ButtonToolbar,
  InputGroup,
  Table,
} from 'react-bootstrap';

import {
  getInputChangeAction,
  searchChangeAction,
  DeleteItemAction,
  showregistermodal,
  getInitList,
  showEditModal,
} from '../store/actionCreators.js';
import { FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';
import StudentModal from '../component/StudentModal.js';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
class TodoList extends React.Component {
  //生命週期:一開始載入資料
  componentDidMount() {
    this.props.handlegetInitList();
  }

  render() {
    let data = this.props.list;
    console.log(this.props.list);

    if (this.props.searchText && this.props.searchText.trim() !== '') {
      data = this.props.list.filter(item => {
        return item.name.includes(this.props.searchText);
      });
    }

    return (
      <>
        <StudentModal />
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <h1>學生管理資料庫</h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <ButtonToolbar>
                <Button
                  variant="primary"
                  onClick={() => this.props.handleAddModalShow()}
                >
                  <FaPlus /> 新增
                </Button>
              </ButtonToolbar>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  name="searchText"
                  placeholder="輸入姓名進行搜尋"
                  value={this.props.searchText}
                  onChange={e => this.props.handleSearchTextChange(e)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>學號</th>
                    <th>姓名</th>
                    <th>出生年月日</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.birth}</td>

                      <td>
                        <Button
                          variant="warning ml-1"
                          size="sm"
                          onClick={() =>
                            this.props.handleEditModalShow(item.id)
                          }
                        >
                          <FaPen /> 編輯
                        </Button>
                        <Button
                          variant="danger ml-1"
                          size="sm"
                          onClick={() => this.props.handleItemDelete(item)}
                        >
                          <FaTrashAlt /> 刪除
                        </Button>
                        <Button variant="success ml-1">
                          <Link
                            to={'/student/' + item.id}
                            className="text-body "
                          >
                            詳細頁面
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
const stateToProps = state => {
  return {
    searchText: state.searchText,
    list: state.list,
  };
};

const dispatchToProps = dispatch => {
  return {
    // 處理搜尋字串的填寫，因為是可控元件
    handleSearchTextChange(e) {
      const action = searchChangeAction(e.target.value);
      dispatch(action);
    },
    //控制modal出現
    handleAddModalShow() {
      const action = showregistermodal();
      dispatch(action);
    },

    //刪除一整列
    handleItemDelete(item) {
      const action = DeleteItemAction(item);
      dispatch(action);
    },

    // 開啟編輯用的跳出視窗
    handleEditModalShow(id) {
      const action = showEditModal(id);
      dispatch(action);
    },

    handlegetInitList() {
      const action = getInitList();
      dispatch(action);
    },
  };
};

export default connect(stateToProps, dispatchToProps)(TodoList);
