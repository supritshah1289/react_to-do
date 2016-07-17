'use strict'

// import the libs we need
import React            from 'react';
import ReactDOM         from 'react-dom'
import Nav              from './nav.jsx'
import Footer           from './footer.jsx'
import Taskform         from './Taskform.jsx'
import Tasklist         from './Tasklist.jsx'
import ajax             from '../helpers/ajaxAdapter.js'
import util             from '../helpers/util.js'


// create a React Component called _App_
export default class App extends React.Component{

  // every class gets a constructor.
  // this is where we init the state.
  constructor() {

    // we also need to wake up our ancestors
    super();

    // here's our state
    this.state = {
      tasks : {}
    }
  }

  // this is right after the component is mounted on the screen.
  componentDidMount(){
    // go to the db and get the freshest tasks
    ajax.getTasks().then( data=>
      // when the data comes back, update the state
      this.setState({tasks: data.indexByKey('task_id') })
    )
  }


  // note that classes do **not** have commas between their methods
  addTask( newTask ){

    // send this change to the db (ajax)
    ajax.createTask(newTask).then( data=>{

      // when the data comes back, update the state.
      this.state.tasks[ data[0].task_id ] = data[0]
      this.setState({tasks: this.state.tasks})
    })
  }

  /* TOGGLE TASK (WE ONLY NEED THE KEY HERE) */
  toggleTask( key ){
    let myTask = this.state.tasks[key];

    myTask.completed = !myTask.completed;

    //send out this new change to the db (ajax)
    ajax.updateTask( myTask )
      .then( data=>{
        this.state.tasks[ data.task_id ] = data
        this.setState({tasks: this.state.tasks})
      })


  }


  // 90% of your components will render()
  // REMEMBER you can only return **one** root element from a render fn.
  render(){
    return(
      <container>
        <header>
          <Nav />
        </header>
        <div className="container">
          <Taskform addTask={this.addTask.bind(this)}/>
          <section className="row">

            {/*OPEN ITEMS*/}
            <article className="col-md-6">
              <h3>Open Items</h3>
              <Tasklist
                list={this.state.tasks}
                f={x=>!x}
                action={this.toggleTask.bind(this)}/>
            </article>

            {/* COMPLETED ITEMS */}
            <article className="col-md-6">
              <h3>Completed Items</h3>
              <Tasklist
                list={this.state.tasks}
                f={x=>x}
                action={this.toggleTask.bind(this)}/>
            </article>

          </section>
        </div>
        <Footer />
      </container>
      )
  }
}

// mount our App at #container
ReactDOM.render(<App/>, document.querySelector('#container'))
