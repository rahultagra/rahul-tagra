import React, { Component } from "react";
import UsersDetail  from './UserHtml';
import get from './NetworkManager';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
    this.deleteUser = this.deleteUser.bind(this);
  }
  componentWillMount() {
    let self= this;
      get('https://reqres.in/api/users?page=1&per_page=10').then(response => {
      const parsedResponse = JSON.parse(response);
      self.setState({
        users:self.removeDuplicates(self.state.users.concat(parsedResponse.data),'id')
      });
    }, (error) => {
      
    })   
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
  deleteUser(userId) {
    var obj = this.state.users.find((obj) =>  obj.id === userId );
    const i =this.state.users.indexOf(obj);
    this.state.users.splice(i, 1);
    this.setState({
      users:this.state.users
    });
  }
  render() {
    let html = [];
    this.state.users.forEach(user => {   
     html.push(<div className="tile"><UsersDetail user={user} key={user.id} />
     <button className="delBtn" onClick={() => this.deleteUser(user.id)} data-key = {user.first_name+'_'+user.id}>Delete</button></div>)
  });
    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        <div className="main">
       {html}
       </div>
      </div>
    );
  }
}
