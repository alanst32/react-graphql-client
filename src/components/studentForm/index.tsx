import { Button, TextField, createStyles, makeStyles, Theme, Box, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Image, Jumbotron } from "react-bootstrap";
import ReactImage from '@assets/svg/logo.svg';
import StudentModel from "@models/studentModel";
import { useMutation, useQuery } from "@apollo/client";
import { IGetStudentsData, GET_STUDENTS_QUERY, INSERT_STUDENT_GQL } from "@graphql/studentGraph";
import { get } from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loading: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        },
        header: {
            display: 'inline-block',
            width: '100%',
            marginBottom: '20px',
        },
        jumbotron: {
            height: '300px',
            width: '100%',
            display: 'grid',
            justifyContent: 'center',
            margin: 'auto',
            backgroundColor: 'lightblue',
            marginBottom: '10px',
        },
        form: {
            display: 'flex',
            justifyContent: 'center'
        },
        infoBox: {
            display: 'flex',
            justifyContent: 'center',
            verticalAlign: 'center'
        },
        labelStyle: {
            fontSize: '32px',
            fontWeight: 'bold',
            verticalAlign: 'center'
        },
        insertBtn: {
            marginLeft: '20px'
        }
    }),
);

export default function StudentForm(props) {
    const classes = useStyles();
    const [totalStudents, setTotalStudents] = useState(0);
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    // Error not used, left here to visualize it exists.
    const { loading, error, data } = useQuery<IGetStudentsData>(
        GET_STUDENTS_QUERY,
        {
            variables: { studentRequest: {} }
        }
    );

    const [ insertStudentMutation ] = useMutation<StudentModel>(
        INSERT_STUDENT_GQL,
        {
            refetchQueries: [GET_STUDENTS_QUERY, 'getStudents'],
        }
    );

    useEffect(() => {
        if (data) {
            const students: StudentModel[] = get(data, 'students', []);
            setTotalStudents(students.length);
        }
    }, [data]);
    
    const insertStudentAsync = () => {
        const request: StudentModel = {
            firstName,
            lastName,
            country,
            dateOfBirth,
            skills: [] 
        };
        insertStudentMutation({
            variables: {
                input: request,
            },
        });
    }

    return (
        <div className={classes.header}>
            {
                loading ?
                (
                    <Box className={classes.loading}>
                        <CircularProgress />
                    </Box>
                )
                : (
                    <Jumbotron className={classes.jumbotron}>
                        <Image src={ReactImage}/>
                        <h1>Students skills list: {totalStudents}</h1>
                    </Jumbotron>
                )
            }
            <form 
                className={classes.form}
                noValidate 
                autoComplete="off">
                <TextField 
                    id="firstName" 
                    label="First Name" 
                    variant="outlined" 
                    onChange={e => setFirstName(e.target.value)}/>
                <TextField 
                    id="lastName" 
                    label="Last Name" 
                    variant="outlined"
                    onChange={e => setLastName(e.target.value)}/>
                <TextField 
                    id="country" 
                    label="Country" 
                    variant="outlined"
                    onChange={e => setCountry(e.target.value)}/>
                <TextField 
                    id="dateOfBirth" 
                    label="DOB"
                    type="date" 
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setDateOfBirth(e.target.value)}/>
                <Button 
                    id="insertBtn"
                    className={classes.insertBtn}
                    variant="contained" 
                    color="primary"
                    onClick={insertStudentAsync}>
                    Insert
                </Button>
            </form>
        </div>
    );
}
