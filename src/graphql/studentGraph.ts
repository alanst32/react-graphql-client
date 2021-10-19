import { gql, useMutation, useQuery } from '@apollo/client';
import StudentModel, { StudentRequest } from '@models/studentModel';

export interface IGetStudentsData {
    students: StudentModel[];
};

// Using GQL queries from straight JS variables, it can be done via Webpack as well
/*
    query getStudents: the name of the query - does not need to match backend name
    students: name of variable of the response = data.students.[]
    type: "StudentList" - uses the type to cache the data
    attributes: then you need to specify the attributes of the response. (in this case students attributes)
*/
export const GET_STUDENTS_QUERY = gql`
    query getStudents($studentRequest: StudentRequest) {
        students(body: $studentRequest) 
        @rest(
            type: "StudentList", 
            path: "/student/list",
            method: "POST",
            bodyKey: "body"
        ) {
            _id,
            firstName,
            lastName,
            dateOfBirth,
            country,
            skills
        }
    },
`;

export const INSERT_STUDENT_GQL = gql`
    mutation InsertStudent($input: StudentRequest!) {
        createStudent(input: $input) 
        @rest(
            type: "StudentModel", 
            path: "/student",
            method: "POST",
            bodyKey: "input"
        ) {
            NoResponse
        }
    },
`;

export const DELETE_STUDENT_GQL = gql`
    mutation DeleteStudent($ids: [String!]!) {
        deleteStudent(input: {
            ids: $ids
        }) 
        @rest(
            type: "StudentModel",
            path: "/student/inactive",
            method: "POST",
            bodyKey: "input"
        ) {
            NoResponse
        }
    },
`;

export const UPDATE_STUDENT_GQL = gql`
    mutation UpdateStudent($input: StudentRequest!) {
        updateStudent(input: $input)
        @rest(
            type: "StudentModel",
            path: "/student",
            method: "PUT",
            bodyKey: "input"
        ) {
            NoResponse
        }
    }
`;
