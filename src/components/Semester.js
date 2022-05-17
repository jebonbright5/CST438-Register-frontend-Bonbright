import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import { SEMESTER_LIST } from '../constants.js'


//My imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js'
import PropTypes from 'prop-types';

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1 };
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
    }


    //Will try to move these to separate file=====================
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event) => {
        this.setState({ student: { student_id: event.target.value } });
    }

    // Save student and close modal form
    handleAdd = () => {
        this.props.addStudent(this.state.student);
        this.handleClose();
    }

    // add student
    addstudent = (student) => {
        const token = Cookies.get('xsrf-token');

        fetch(`${SERVER_URL}/student`,
            {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'x-xsrf-token': token
                },
                body: JSON.stringify(student)
            })
            .then(res => {
                if (res.ok) {
                    toast.success("student successfully added", {
                        position: toast.position.bottom_left
                    });
                    //  this.fetchcourses();
                } else {
                    toast.error("error when adding", {
                        position: toast.position.bottom_left
                    });
                    console.error('post http status =' + res.status);
                }
            })
            .catch(err => {
                toast.error("error when adding", {
                    position: toast.position.bottom_left
                });
                console.error(err);
            })
    }
    //Will try to move these to separate file=====================

  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                

                <Button component={Link}
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
                </Button>
                

                {/*Add student dialog button*/}
                {/*<Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={this.handleClickOpen}>*/}
                {/*    Add Student*/}
                {/*</Button>*/}
                {/*<Dialog open={this.state.open} onClose={this.handleClose}>*/}
                {/*    <DialogTitle>Add Student</DialogTitle>*/}
                {/*    <DialogContent style={{ paddingTop: 20 }} >*/}
                {/*        <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChange} />*/}
                {/*        */}{/*<TextField fullWidth label="Student Email" name="student_email" onChange={this.handleChange} />*/}
                {/*    </DialogContent>*/}
                {/*    <DialogActions>*/}
                {/*        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>*/}
                {/*        <Button color="primary" onClick={this.handleAdd}>Add</Button>*/}
                {/*    </DialogActions>*/}
                {/*</Dialog>*/}


                {/*Add student link button*/}
                <Button component={Link}
                    to={{
                        pathname: '/student'
                    }}
                    variant="outlined" color="primary" style={{ margin: 10 }}>
                    Add Student
                </Button>

          </div>
      </div>
    )
  }
}

//required property:  addStudent is a function to call to perform the Add action
//Semester.propTypes = {
//    AddStudent: PropTypes.func.isRequired
//}

export default Semester;