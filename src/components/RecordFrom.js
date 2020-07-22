import React, {Component} from 'react';
import { creatRecords } from "@/utils/RecordsApi"

export default class RecordFrom extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
  }
  // Creat 按钮是否能点击
  valid(){
    return this.state.date && this.state.title && this.state.amount
  }
  // 改变指标的值
  changeInput(e){
    const {name ,value} = e.target;
    this.setState({[name] : value })
  }
  // 提交数据
  handleSubmit(event){
    event.preventDefault();
    const state = {
      date: this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount, 0)
    }
    creatRecords(state).then((res) =>{
      this.props.handleNewRecords(res.data);
      this.setState ({
        date: '',
        title: '',
        amount: ''
      })
    });
    
    // console.log(event);
  }
  render() {
    return (
      <form className="form-inline d-inline-flex mb-1" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group  mr-1">
          <input 
            type="text" 
            className="form-control  mr-1" 
            onChange={(e) => this.changeInput(e)}
            placeholder="Date" 
            name="date" 
            value={this.state.date}/>
        </div>
        <div className="form-group  mr-1">
          <input 
            type="text" 
            onChange={(e) => this.changeInput(e)}
            className="form-control" 
            placeholder="Title" 
            name="title" 
            value={this.state.title}/>
        </div>
        <div className="form-group  mr-1">
          <input type="text" 
            onChange={(e) => this.changeInput(e)}
            className="form-control" 
            placeholder="Amount" name="amount" 
            value={this.state.amount}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={ !this.valid() }>Creat Record</button>
      </form>
    )
  }
}