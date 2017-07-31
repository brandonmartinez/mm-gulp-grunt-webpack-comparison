const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

const Title = ({ todoCount }) => {
    return (
        <h1>Todo Manager ({todoCount})</h1>
    );
}

const TodoForm = ({ addTodo }) => {
    let nameInput, textInput;

    return (
        <form className="form-horizontal" onSubmit={(e) => {
            e.preventDefault();
            addTodo(nameInput.value, textInput.value);
            nameInput.value = '';
            textInput.value = '';
        }}>
            <div className="form-group">
                <label htmlFor="nameInput" className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="nameInput" placeholder="Name" ref={node => {
                        nameInput = node;
                    }} />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="textInput" className="col-sm-2 control-label">Text</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="textInput" placeholder="Text" ref={node => {
                        textInput = node;
                    }} />
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-default">Add Todo</button>
                </div>
            </div>
        </form>

    );
};

const Todo = ({ todo }) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>{todo.text}</td>
        </tr>
    );
}

const TodoList = ({ todos }) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} />)
    });
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Text</th>
                </tr>
            </thead>
            <tbody>
                {todoNode}
            </tbody>
        </table>
    );
}

// Contaner Component
// Todo Id
window.id = 0;
class TodoApp extends React.Component {
    constructor(props) {
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            data: []
        }
        this.apiUrl = '/api/todos'
    }
    // Lifecycle method
    componentDidMount() {
        // Make HTTP reques with Axios
        axios.get(this.apiUrl)
            .then((res) => {
                // Set state with result
                this.setState({ data: res.data });
            });
    }

    addTodo(name, text) {
        // Assemble data
        const todo = { name: name, text: text }
        // Update data
        axios.post(this.apiUrl, todo)
            .then((res) => {
                this.state.data.push(res.data);
                this.setState({ data: this.state.data });
            });
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Title todoCount={this.state.data.length} />
                        <p>This is a sample application used to demonstrate basic web development asset management in a build toolchain.</p>
                        <p>To use this sample application, enter values in the boxes. New values will be added on the server and populate the screen.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <TodoForm addTodo={this.addTodo.bind(this)} />
                    </div>
                    <div className="col-md-8">
                        <TodoList todos={this.state.data} />
                    </div>
                </div>
            </div>
        );
    }
}
ReactDOM.render(<TodoApp />, document.getElementById('container'));