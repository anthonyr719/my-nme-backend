import axios from 'axios';
import React from 'react'
import TeacherList from './TeacherList';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            teacherName: '',
            teacherMeta: '',
            teacherStudent: ''
        }
        this.handleTeacherNameChange = this.handleTeacherNameChange.bind(this)
        this.handleTeacherMetaChange = this.handleTeacherMetaChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        axios.post('/teachers', {
            name: this.state.teacherName,
            meta: this.state.teacherMeta
        }).then((response) => {
            axios.get('/teachers').then((response) => {
                this.setState({
                    teachers: response.data
                })
            })
        })
    }

    handleTeacherNameChange(e) {
        this.setState({
            teacherName: e.target.value
        })
    }
    handleTeacherMetaChange(e) {
        this.setState({
            teacherMeta: e.target.value
        })
    }

    componentDidMount() {
        axios.get("/teachers")
        .then(res => {
            this.setState ({
                teachers: res.data
            })
        })
    }


    render() {
        return (
            <div className="App">
                <TeacherList teachers={this.state.teachers} 
                            handleTeacherNameChange={this.handleTeacherNameChange}
                            handleTeacherMetaChange={this.handleTeacherMetaChange}
                            name={this.state.teacherName}
                            meta={this.state.teacherMeta}
                            handleSubmit={this.handleSubmit}/>
            </div>
        );
    }

}

//add handleteacherstudent
export default App;