const Title = ({todoCount}) => {
    return (
        <div>
            <div>
                <h1>To do ({todoCount})</h1>
            </div>
        </div>
    );
}

const ToDoListTitle = ({dataLength}) => {
    if (dataLength > 0) {
        return (
            <div>
                <div>
                    <h1>To do List:</h1>
                </div>
            </div>
        );
    }
    return false;
}

const DoneListTitle = ({doneDataLength}) => {

    if (doneDataLength > 0) {
        return (
            <div>
                <div>
                    <h1>Done List:</h1>
                </div>
            </div>
        );
    }
    return false;
}

const TodoForm = ({addTodo}) => {
    // Input Tracker
    let input;
    // Return JSX
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = '';
        }}>
            <input className="form-control col-md-12" ref={node => {
                input = node;
            }}/>
            <br/>
        </form>
    );
};

const Todo = ({todo, remove, color}) => {
    // Each Todo
    return (
        <a href="#" className="list-group-item"
           onClick={() => {
               remove(todo.id)
           }}
           onContextMenu={(e) => {
               e.preventDefault();
               todo.marked = true;
               remove(todo.id)
           }}
           style={{backgroundColor: color}}>{todo.text}</a>
    );
}

const TodoList = ({todos, remove}) => {
    // Map through the todos
    // Tworzy tablicę koponentów Todo
    const todoNode = todos.map((todo) => {
        if(todo.marked)
            return (<Todo todo={todo} key={todo.id} remove={remove} color={'red'}/>)
        else
            return (<Todo todo={todo} key={todo.id} remove={remove} color={'white'}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{todoNode}</div>);
}

const DoneList = ({dones, remove}) => {
    // Tworzy tablicę koponentów Done
    const doneMarkedNode = dones.map((done) => {
        if(done.marked)
            return (<Todo todo={done} key={done.id} remove={remove} color={'red'}/>)
    });

    const doneNotMarkedNode = dones.map((done) => {
        if (!done.marked)
            return (<Todo todo={done} key={done.id} remove={remove} color={'white'}/>)
    });

    return (<div className="list-group" style={{marginTop: '30px'}}>{doneMarkedNode}{doneNotMarkedNode}</div>);
}

// Container Component
// Todo Id
window.id = 0;

class TodoApp extends React.Component {
    constructor(props) {
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            data: [],
            doneData: []
        }
    }

    // Lifecycle method
    componentDidMount() {
        this.setState({data: this.state.data});
        this.setState({doneData: this.state.doneData});
    }

    // Add todo handler
    // Taki sposób definiowania funkcji addTodo sprawia, że `this` jest w niej prawidłowo ustawiony
    addTodo = (val) => {
        // Assemble data
        const todo = {text: val, id: window.id++, marked: false};
        // Update data
        this.setState({data: this.state.data.concat([todo])});
        // inny sposób: spread operator
        // this.setState({data: [...this.state.data, todo]});

    }
    // Handle remove
    // Przy takim sposobie definiowania funkcji hadleRemove Musimy `this` "zbindować" później!
    handleRemove(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.doneData.filter((todo) => {
            if (todo.id !== id)
                return todo;
        });

        this.setState({doneData: remainder});
    }

    handleMoveToDone(id) {
        // Filter all todos except the one to be removed
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) return todo;
        });

        const doneElem = this.state.data.filter((todo) => {
            if (todo.id === id)
                return todo;
        });

        this.setState({data: remainder});
        this.setState({doneData: this.state.doneData.concat(doneElem)});

    }

    render() {
        // Render JSX
        return (
            <div>
                <Title todoCount={this.state.data.length}/>
                {/*<TodoForm addTodo={this.addTodo.bind(this)}/>*/}
                <TodoForm addTodo={this.addTodo}/>
                <ToDoListTitle dataLength={this.state.data.length}/>
                <TodoList
                    todos={this.state.data}
                    remove={this.handleMoveToDone.bind(this)}
                />
                <DoneListTitle doneDataLength={this.state.doneData.length}/>
                <DoneList
                    dones={this.state.doneData}
                    remove={this.handleRemove.bind(this)}
                />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp/>, document.getElementById('root'));