import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js'
import Grid from '@mui/material/Grid';

class AddStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            student: {
                name: '',
                email: ''
            }
        }
        //Start open for testing
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({
            student: {
                name: event.target.value,
                email: event.target.value
                //[event.target.name]: event.target.value,
                //[event.target.email] : event.target.value
                //name: event.target.value, email: event.target.value
            }
        });
    }

    // Save student and close modal form
    handleAdd = () => {
        console.log("state" + JSON.stringify(this.state));
        this.props.addStudent(this.state.student);
        this.handleClose();
    }

      // add student
  addstudent = (student) => {
    const token = Cookies.get('xsrf-token');
 
    fetch(`${SERVER_URL}/student`,
      { 
        method: 'post', 
        headers: { 'content-type': 'application/json',
                   'x-xsrf-token': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
          toast.success("student successfully added", {
              position: toast.position.bottom_left
          });
        } else {
          toast.error("error when adding", {
              position: toast.position.bottom_left
          });
          console.error('post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("error when adding", {
            position: toast.position.bottom_left
        });
        console.error(err);
    })
  } 

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={this.handleClickOpen}>
                    Add Student
                </Button>
                <div style={{ width: '100%' }}>
                    For DEBUG:  display state.
                    {JSON.stringify(this.state)}
                </div>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogContent style={{ paddingTop: 20 }} >
                        {/*<TextField autoFocus fullWidth label="Student Name" name="student_name" value={name} onChange={this.handleChange} />*/}
                        {/*<TextField fullWidth label="Student Email" name="student_email" value={email} onChange={this.handleChange} />*/}
                        <TextField autoFocus fullWidth label="Student Name" name="name" onChange={this.handleChange} />
                        <TextField autoFocus fullWidth label="Student Email" name="email" onChange={this.handleChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button color="primary" onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
    addStudent: PropTypes.func.isRequired
}

export default AddStudent;