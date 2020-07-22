// import React, {components} from "react";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import { updateRecords , deleteRecords } from "@/utils/RecordsApi";

export default class Record extends Component {
  constructor(props){
    super(props);

    this.dateInput = null;
    this.setDateInputRef = element => {
      this.dateInput = element;
    };

    this.titleInput = null;
    this.setTitleInputRef = element => {
      this.titleInput = element;
    };

    this.amountInput = null;
    this.setAmountInputRef = element => {
      this.amountInput = element;
    };

    this.state = {
      edit:false
    }
  }

  // 事件- 切换
  handleToggle(){
    this.setState({ edit: !this.state.edit})
  }
  // 事件-更新
  handleEdit(event) {
    event.preventDefault();
    const record = {
      date: this.dateInput.value,
      title: this.titleInput.value,
      amount: Number.parseInt(this.amountInput.value, 0)
    }
    updateRecords(this.props.id, record)
      .then((res)=> {
        this.props.updateRecord(res.data);
        this.setState({ edit: false })
      })
      .catch(err => console.log(err))
  }
  // 事件-删除
  handleDeleteRecord(event){
    event.preventDefault();
    // console.log(deleteRecords)
    deleteRecords(this.props.id).then(res=> {
      console.log(res.data);
      this.props.handleDeleteRecord({
        id: this.props.id,
        date: this.props.date,
        title: this.props.title,
        amount: this.props.amount
      })
    }).catch(err=> {
      console.log(err)
    })
  }
  // 没有编辑状态
  recordRow(){
    return (
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={ ()=> this.handleToggle()}>Edit</button>
          <button className="btn btn-danger" onClick= { (event)=> this.handleDeleteRecord(event) }>Delete</button>
        </td>
      </tr>
    )
  }
  // 编辑状态
  recordFrom(){
    return (
      <tr>
        <td>
          <input type="text" className="from-conrol" defaultValue={this.props.date}
            ref={this.setDateInputRef}
          />
        </td>
        <td>
          <input type="text" className="from-conrol" defaultValue={this.props.title}
            ref={this.setTitleInputRef}
          />
        </td>
        <td>
          <input type="text" className="from-conrol" defaultValue={this.props.amount} ref={this.setAmountInputRef}/>
        </td>
        <td>
          <button className="btn btn-info mr-1" onClick={(e)=> this.handleEdit(e)}>Update</button>
          <button className="btn btn-danger" onClick={()=>  this.handleToggle()}>Cancel</button>
        </td>
      </tr>
    )
  }
  render() {
    if (this.state.edit){
      return this.recordFrom()
    } else {
      return this.recordRow()
    }
  }
}

Record.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
}