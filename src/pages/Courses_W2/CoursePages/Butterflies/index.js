import React from 'react'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import '../styles.css'
import { Container, ContainerInner } from '../../../../globalStyles'

import Profile from "../../teacherheadshots/Callia Chuang.jpg"

const CourseButterflies = () => {
    return(
        <div>
            <Navbar/>
            <Container>
                <ContainerInner>
                <h1>Butterflies, Berries, and “Beauty to Set the World Right:” Hip-Hop and Social Activism</h1>
                  <p>
                  At the 2016 Grammy Awards, Kendrick Lamar rapped about police brutality inside a jail cell. Beyoncé shot a music video on a former slave plantation. Jay Z dropped tracks alluding to Malcolm X. This class will examine the role of hip-hop and rap music in speaking out about important political issues. We will briefly examine some of the history behind the genre, beginning with the Harlem Renaissance and the rise of hip-hop in the late 1980s. We will then use that context to evaluate some contemporary works of socially-critical songs and albums, such as Kendrick Lamar’s “Alright,” Kanye West’s “New Slaves,” and Beyoncé’s “Formation.” The course will involve analyzing song lyrics, listening to music, reading news articles, and watching music videos to understand the intersection between art, culture, politics, and systemic injustice.
                  <br/><i>Note: This course may contain explicit lyrics and touch on sensitive topics, such as violence and hate crimes.</i>
                  </p>
                  <p style={{clear: 'right'}}>
                  <b>Class Date: </b>???
                  <br/><b>Format: </b>???
                  <br/><b>Time (EDT): </b>???
                  </p>
                  <p>
                  <img src={Profile} class="img-left"/>
                  <b>Taught by: </b>Callia Chuang & Talia Blatt<br/>
                  <b>Teacher Bio: </b>Hi! My name is Callia Chuang, and I am a rising sophomore at Harvard University, class of 2023. I am planning 	on concentrating in History and Literature with a secondary in Psychology. This course grew out of an essay I wrote this year on the connection between philosopher W.E.B. Du Bois and rapper Kendrick Lamar, and I can’t wait to share my passion for music, history, and social activism with you!
                  </p>
                  <h1>Register for this course!</h1>
                    <iframe
                  title="form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdEci1eOpQ8IvYSFCxsgQOXfKL5LpJhZRWvfBLrrzAPrgyuZw/viewform?embedded=true"
                  width="100%"
                  height="500"
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0">Loading…</iframe>
              </ContainerInner>
            </Container>
            <Footer/>
        </div>
    )
}

export default CourseButterflies