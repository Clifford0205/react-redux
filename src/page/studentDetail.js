import React from 'react';
import { connect } from 'react-redux';

class studentDetail extends React.Component {
  render() {
    const studentData = this.props.list.find(
      item => item.id === +this.props.match.params.id
    );
    console.log(studentData);
    return (
      <>
        {studentData ? (
          <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">姓名：{studentData.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">學號：{studentData.id}</li>
              <li className="list-group-item">
                出生年月日：{studentData.birth}
              </li>
            </ul>
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            沒找到資料
          </div>
        )}
      </>
    );
  }
}

const stateToProps = state => {
  return {
    list: state.list,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(studentDetail);
