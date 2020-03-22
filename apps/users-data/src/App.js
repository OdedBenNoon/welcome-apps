import React from "react";
import PersonComponent from "./components/user/user-component";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], settings: {} };
  }

  componentDidMount() {
    monday.listen("settings", this.getSettings);
    this.fetchUsers();
  }

  fetchUsers = () => {
    const query = `query { users(kind: non_guests) { id, name, photo_thumb, title } }`;
    monday.api(query).then(res => {
      const users = res && res.data && res.data.users;
      this.setState({ users });
    });
  };

  getSettings = res => {
    this.setState({ settings: res.data });
  };

  getContext = res => {
    this.setState({ context: res.data });
  };

  render() {
    const { users } = this.state;

    return (
      <div className="monday-app">
        <div>Hello monday!</div>
        {users &&
          users.map(user => {
            return <PersonComponent user={user} key={user.id} />;
          })}
      </div>
    );
  }
}

export default App;
