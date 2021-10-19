import React from "react";
import _ from 'lodash';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import StudentForm from "@app/studentForm";
import StudentTable from "@app/studentTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        home: {
            width: '98%',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 'auto'
        }
    }),
);

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.home}>
            <StudentForm></StudentForm>   
            <StudentTable></StudentTable>
        </div>
    );
}
