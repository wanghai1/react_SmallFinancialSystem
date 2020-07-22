import React, { Component } from "react";
import Record from "./Record";
import { records } from "@/utils/RecordsApi";
import RecordFrom from "./RecordFrom";
import AmountBox from "./AmountBox";

class Records extends Component {
  constructor(props) {
    // super(props)
    super(props);
    this.state = {
      err: '',
      isLoading: true,
      records: []
    }
  }
  // 增加数据方法
  addRecords(data)  {
    // console.log(data)
    // this.state.records.push(data);
    this.setState({
      records : [
        data, 
        ...this.state.records]
    })
  }
  updateRecord(data) {
    const recordIndex = this.state.records.findIndex((item) => item.id === data.id);
    const newRecords = this.state.records.map((item, i) => {
      if (i !== recordIndex) {
        return item
      }
      return {
        ...item,
        ...data
      }
    })
    this.setState({ records: newRecords})
  }
  deletRecord(data) {
    const newRecords = this.state.records.filter((item)=> item.id !== data.id);
    this.setState({
      records: newRecords
    })
    console.log(this.state.records);
  }
  componentDidMount(){
    records().then( (response) => {
        // 更新数据和loading状态
        this.setState({
          isLoading:false,
          records : response.data.reverse()
        })
      })
      .catch ((err) => {
        console.log(err.toJSON());
        // 捕获错误
        this.setState({
          isLoading:false,
          err:err.toJSON().message
        })
      });
  }

  // 统计数据
  credits(){
    // console.log(this.state.records.map(item => item.amount))
    return this.state.records
              .filter(item => item.amount > 0)
              .reduce((p, v) => {return  p  + v.amount }, 0);
  }
  debits() {
    return this.state.records
              .filter(item => item.amount <= 0)
              .reduce((p, v) => {return p  + v.amount }, 0);
  }
  balance(){
    return this.state.records
    .reduce((p, v) => {return p + v.amount }, 0);
  } 

  render() {
    const { err, isLoading, records} = this.state;
    let recordCompoent ;
    if ( isLoading ){
      recordCompoent = <div> isLoading </div>;
    }else if( err ) {
      recordCompoent = <div>Error: {err} </div>;
    }else {
      recordCompoent = (
        <table className="table table-bordered"> 
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              records.map((record)=> 
                <Record 
                  key={record.id} 
                  {...record} 
                  handleDeleteRecord={(data)=> this.deletRecord(data)}
                  updateRecord={(data)=> this.updateRecord(data)}>
                </Record>
              )
            }
          </tbody>
        </table>
      )
    }
    return   (
      <div>
        <h2> Records </h2>
        <div className="row mb-3">
          {/* 由于数据改变会出发render函数，所以在render中定义函数然后执行他就可以实现数据的实时更新 */}
          <AmountBox text="Credit" type="success" amount={this.credits()}/>
          <AmountBox text="Debit" type="danger"  amount={this.debits()}/>
          <AmountBox text="Balance" type="info"  amount={this.balance()}/>
        </div>
        <RecordFrom handleNewRecords={(data)=> this.addRecords(data)}/>
        { recordCompoent }
      </div> 
    )
  }
}
export default Records;

