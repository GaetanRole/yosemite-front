import React from 'react';
import { Col, Container, Card, CardImg, CardText, CardTitle, } from 'reactstrap';
import ImageUpload from '../ImageUpload'
import "./Profil.scss"
import ReactFileReader from 'react-file-reader';
import axios from 'axios'
import Tab from '../../Header/Tab/Tab'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import allTheActions from '../../../actions'

const config = require('../../../config/config')

class Profil extends React.Component {

  state = {
    loading: true,
  }

  getData = () => {
    const token = localStorage.getItem("token")
    const uuid = localStorage.getItem("uuid")
    axios({
      method: 'Get',
      url: `http://localhost:${config.port}/users/${uuid}`,
      headers: {
        'x-access-token': `${token}`
      }
    })
      .then(res => {
        const result = res.data
        this.setState({ result, loading: false })
        console.log("getData", this.state)
      })

  }

  componentDidMount = () => {
    this.getData()
  }


  handleFiles = files => {
    console.log(files)
  }

  render() {
    if (this.state.loading) {
      return (<div>loading</div>)
    } else {
      const data = this.state.result[0]
      return (
        <section id="project" className="project-section bg-light">
          <Container>
            <div className="row align-items-center no-gutters mb-4 mb-lg-5">

              <Col xl="2" lg="2">
                <Card>
                  <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />

                  <ReactFileReader handleFiles={this.handleFiles}>
                    <button className='btn'>Upload</button>
                  </ReactFileReader>
                </Card>
              </Col>

              <Col xl="5" lg="5">
                <CardTitle icon="user-plus" ><h4> {data.name} {data.firstname} (User ID:2323)</h4></CardTitle>
                <CardText icon="user-plus" >Your phone : {data.phone}</CardText>
                <CardText icon="user-plus" >Email Addres : {data.mail} </CardText>
                <CardText icon="user-plus" >Status : </CardText>
                
                <Tab icon="map-marker-alt" tab="Tracking" />


              </Col>



            </div>
            <div className="row align-items-center no-gutters mb-4 mb-lg-5">


              <Col xl="12" lg="12">
                <CardTitle className="cardtitleinformation" icon="user-plus" ><h4> Mes information</h4></CardTitle>
              </Col>


              <Col xl="4" lg="4">
                <CardText icon="user-plus" >Role : {data.role} </CardText>
                <CardText icon="user-plus">Pseudo : {data.pseudo}  </CardText>
                <CardText icon="user-plus" >Password : {data.password}</CardText>
                <CardText icon="user-plus" >date of birth : {data.dateOfBirth}{this.props.dateOfBirth} </CardText>



              </Col>



              <Col xl="4" lg="4">
                <CardText icon="user-plus" >Addres :{data.address} </CardText>
                <CardText icon="user-plus" >Postcode : {data.postcode} </CardText>
                <CardText icon="user-plus" >City :  {data.city} </CardText>
                <CardText icon="user-plus" >Country :{data.country} </CardText>


              </Col>

              {/* <Col xl="12" lg="12">
                <CardText icon="user-plus" >Description :</CardText>
              </Col> */}

            </div>
          </Container>
        </section>

      );
    }
  }
}

const mapStateToProps = state => {
  return {
    lastName: state.formReducer.lastName,
    firstName: state.formReducer.firstName,
    phone: state.formReducer.phone,
    email: state.formReducer.email,
    dateOfBirth: state.formReducer.dateOfBirth,
    address: state.formReducer.address,
    postCode: state.formReducer.postCode,
    city: state.formReducer.city,
    country: state.formReducer.country
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil)