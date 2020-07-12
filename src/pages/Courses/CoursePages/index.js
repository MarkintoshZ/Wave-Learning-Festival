import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import PopUpHTML from '../../../components/PopUp/PopUpHTML.js'
import { Container, ContainerInner } from "../../../globalStyles.js"
import { Colors, Typography } from "../../../styles";
import { Button } from "../styles";
import { FirebaseContext } from '../../../firebaseContext'
import 'firebase/firestore'
import { Icon, Property } from "./styles";
import { FaBookOpen } from "react-icons/fa";
import { IconContext } from "react-icons";
import { getTimeDisplay, getTimezoneCode, shiftDay, shiftDayOfWeek } from "@/components/CourseCard";

import TeachersComponent from './teachers-component.js'

const CoursePage = ({ match }) => {
    const { db, storage } = useContext(FirebaseContext)
    const slug = match.params.slug;
    const [loading, setLoading] = useState(true);
    const [showSyllabus, setShowSyllabus] = useState(false);

    //Course Objects
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [prereqs, setPrereqs] = useState('');
    const [classSize, setClassSize] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [classDates, setClassDates] = useState('');
    const [classDays, setClassDays] = useState('');
    const [classTime, setClassTime] = useState('');
    const [teachersObj, setTeachersObj] = useState('');

    //Teacher Objects
    const [teachers, setTeachers] = useState([]);
    const [headshot1, setHeadshot1] = useState("");
    const [headshot2, setHeadshot2] = useState("");
    const [headshot3, setHeadshot3] = useState("");

    if (loading && (!db || !storage)) {
      return (
        <>
        <Navbar/>
        <Container>
        <ContainerInner>
          <Typography.BodyText style={{color: Colors.WLF_BLACK}}>
            Loading...
          </Typography.BodyText>
        </ContainerInner>
        </Container>
        <Footer/>
        </>
      );
    }

    if(db && loading){
      const courses = db.collection('fl_content').doc(slug);
      var offset = 0;
      courses.get()
      .then(function(doc) {
        if (doc.exists) {
          const data = doc.data();
          // console.log("here data:", data)

          //This will all move to a course object
          if (!courseTitle) {
            setCourseTitle(data.courseTitle);
          }
          if (!courseDescription) {
            setCourseDescription(data.courseDescription);
          }
          if (!syllabus) {
            setSyllabus(data.syllabusHtml);
          }
          if (!prereqs) {
            setPrereqs(data.prereqs);
          }
          if (!classSize) {
            setClassSize(data.maxClassSize);
          }
          if (!targetAudience) {
            setTargetAudience(data.targetAudience);
          }
          if (!classDates) {
            setClassDates(data.classDates);
          }
          if (!classDays) {
            setClassDays(data.classDays);
          }
          if (!classTime) {
            var arr = getTimeDisplay(data.classTime)
            setClassTime(arr[1]);
            offset = arr[0];
          }
          if (!teachersObj) {
            setTeachersObj(data.teachers);
          }
        } else {
            // doc.data() will be undefined in this case
            console.log("No teachers!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      setLoading(false);
    }

    const toggleSyllabus = () => {
      console.log("SYLLABUS CLICKED");
      setShowSyllabus(!showSyllabus)
    }

    const timezoneCode = getTimezoneCode();
    setClassDates(shiftDay(classDates, offset));
    setClassDays(shiftDayOfWeek(classDays, offset));

    return (
      <div>
          <Navbar/>
          <Container>
              <ContainerInner>
              <Typography.Header style={{color: Colors.WLF_PURPLE}}>{courseTitle}</Typography.Header>
                {courseDescription}
                {prereqs &&
                  <><br/><b>Prerequisites: </b>{prereqs}</>}
                {syllabus &&
                  <Property>
                    <br/><b>Syllabus: </b>
                    <Icon onClick={toggleSyllabus}>
                      <IconContext.Provider
                        value={{color: "black", size: "1em",
                                style: { verticalAlign: "middle" },
                              }}>
                        <div> <FaBookOpen /> </div>
                      </IconContext.Provider>
                    </Icon>
                  </Property>}
                {showSyllabus &&
                  <PopUpHTML title={"Syllabus"} content={syllabus} onClose={toggleSyllabus}/>}
                {classSize &&
                <><br/><b>Max Class Size: </b>{classSize}</>}
                {targetAudience &&
                  <><br/><b>Target Audience: </b>{targetAudience}</>}
                <p style={{clear: 'right'}}>
                {classDates && classDays && classTime &&
                  <>
                  <b>Class Dates: </b>{classDates}
                  <b><br/>Class Days: </b>{classDays}
                  <b><br/>Time ({classTime.includes("EDT") ? "EDT" : timezoneCode}): </b>{classTime}
                  </>}
                </p>

                <TeachersComponent teachersObj={teachersObj}/>

                <a target="_blank" href="/course-sign-up" className="sign-up-link">
                  <Button>
                    <p>Register Now!</p>
                  </Button>
                </a>
            </ContainerInner>
          </Container>
          <Footer/>
      </div>
  )
}

export default CoursePage
