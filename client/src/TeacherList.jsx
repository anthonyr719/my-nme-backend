import React from 'react';

const TeacherList = props => {
    let teachers;
    if (props.teachers.length ) {
        teachers = props.teachers.map(( teacher, index) => {
            return <p className='teacherrow' key={index}>{teacher.name} </p>
        })
    } else {
        // No data yet
        teachers = <p>No Teacher Data!</p>
    }
    return (
        <div className='TeacherList'>
        <h3>All the teachers:</h3>
        {teachers}
        <hr />
        <form onSubmit={props.handleSubmit}>
            <input onChange={props.handleTeacherNameChange} type="text" name="name" value={props.name} />
            <input onChange={props.handleTeacherMetaChange} type="text" name="meta" value={props.meta} />
            <input type="submit" value="Add Teacher" />
        </form>
        </div>
    )
}

export default TeacherList;