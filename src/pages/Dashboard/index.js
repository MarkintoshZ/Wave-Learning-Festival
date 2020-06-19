import React, {useState, useContext} from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Container, ContainerInner } from "../../globalStyles"
import {FirebaseContext} from '../../firebaseContext'
import './styles.css'
import 'firebase/firestore'
import firebase from 'firebase'

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [calledOnce, setCalledOnce] = useState(false);
    const [isError, setError] = useState(false);
    const [user, setUser] = useState(null);
    const [student, setStudent] = useState(null);
    const [theError, setTheError] = useState(null);
    const [courses, setCourses] = useState([]);
    const {db} = useContext(FirebaseContext);

    if (db && !calledOnce) {
      setCalledOnce(true);
      // console.log("call " + calledOnce);
      firebase.auth().signInWithEmailAndPassword("jsr7@williams.edu", "cheesemaker123").catch(function(error) { // DELETE THIS LATER
          setError(true);
          setTheError(error);
          setLoading(false);
      }).then(function(result) {
        setUser(result.user);
        if (result.user) {
          db.collection("students2").where("userID", "==", result.user.uid).get().then(function(snapshot) {
            var students = [];
            snapshot.forEach(function(snap) {
              students.push(snap);
            });
            // console.log(students.length + " " + calledOnce);
            if (students.length > 0) {
              setStudent(students[0].data());
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
      });
    }

    /*
      if (loading) {
        return (
          <>
          <Navbar/>
          <Container>
          <ContainerInner>
              <p>
                Loading...
              </p>
          </ContainerInner>
          </Container>
          <Footer/>
          </>
        );
      }
      */

      if (isError) {
        return (
          <>
            <Navbar/>
            <Container>
            <ContainerInner>
            <p>Error. Code: {theError.code}</p>
            <p>Error Message: {theError.message}</p>
            </ContainerInner>
            </Container>

            <Footer/>
          </>);
      }

      if (loading) {
        return (
          <>
            <Navbar/>
            <Container>
            <ContainerInner>
            <p>Loading database...</p>
            </ContainerInner>
            </Container>

            <Footer/>
          </>);

      }

      if (!user) {
        return (
          <>
            <Navbar/>
            <Container>
            <ContainerInner>
            <p>Not signed in.</p>
            </ContainerInner>
            </Container>

            <Footer/>
          </>);

      }
      else if (student) {
      return (<>
          <div>
              <Navbar/>
              <Container>
              <ContainerInner>

              <h1>Profile</h1>
              <p><a href="/dashboard/edit-profile">Edit</a></p>
              <p><b>Name: </b>{student.name}</p>
              <p><b>Email: </b>{student.email}</p>
              <p><b>Parent Name: </b>{student.parentName}</p>
              <p><b>Parent Email: </b>{student.parentEmail}</p>
              <p><b>School: </b>{student.school}</p>

              <br/><br/>
              <h1>Classes</h1>
              <select name="wave" id="wave">
                <option value="wave2" selected="selected">Wave 2</option>
                <option value="wave1">Wave 1</option>
              </select>
              <div class="row">
                <div class="course">
                  <p>
                  <b>Course Name: </b><a href="/course-learn-python">Learn Python</a><br/>
                  <b>Instructor: </b>Fatima-Zahra Chriha<br/>
                  <b>Dates/Times: </b>every time.<br/>
                  <b><a href="about:blank">Course Documents</a></b><br/>
                  <b><a href="about:blank">Zoom Link</a></b>
                  </p>
                </div>
              </div>

              </ContainerInner>
              </Container>

              <Footer/>
          </div>
          </>);
        } else {

            return (
              <>
                <Navbar/>
                <Container>
                <ContainerInner>
                <p>Loading information for {user.email}...</p>
                </ContainerInner>
                </Container>

                <Footer/>
              </>);
        }





}

export default Dashboard
