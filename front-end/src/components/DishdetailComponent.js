import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader,Button, ModalBody,Label, Row,Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required=(val)=>val && val.length;
const minLength=(len)=>(val)=>val && (val.length>=len);
const maxLength=(len)=>(val)=>!(val) || (val.length <= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        // console.log("current state is: "+JSON.stringify(values));
        // alert("current state is: "+JSON.stringify(values));
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
    }

    render(){
        return(
            <>
              <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
              <div className="row row-content">
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                   <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                   <ModalBody>
                       <div className="col-12">
                       <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                          <Row className="form-group">
                           <Label htmlFor="rating" xs={12}>Rating</Label>
                           <Col xs={12} >
                                <Control.select model=".rating" name="rating" className="form-control" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                </Control.select>
                             </Col>
                           </Row>

                          <Row className="form-group">
                           <Label htmlFor="author" xs={12}>Your Name</Label>
                           <Col xs={12}>
                               <Control.text model=".author" id="author" name="author" placeholder="Your name"  className="form-control" 
                               validators={{required, minLength:minLength(3), maxLength:maxLength(15)}}/>
                               <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required:"Required",
                                        minLength:"Name should be >=3 characters long",
                                        maxLength:"Name should be <=15 characters long"
                                    }}
                                    />
                            </Col>
                           </Row>

                          <Row className="form-group">
                           <Label htmlFor="comment" xs={12}>Comment</Label>
                           <Col xs={12}>
                               <Control.textarea model=".comment" id="comment" name="comment" row="6"  className="form-control" />
                               </Col>
                           </Row>

                           <Button type="submit" value="submit" color="primary">Submit</Button>
                       </LocalForm>
                       </div>
                   </ModalBody>
               </Modal>
              </div>
               
            </>
        )
    }
}


function RenderComments({comments,dishId,postComment,errMess}){
    const commentsList=<Stagger in>{comments.map((comment)=>{
        return(
            <Fade in>
           <li key={comment.id}>
           <p>{comment.comment}</p>
           <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
       </li>
       </Fade>
        )
    })}
    </Stagger>

    if(errMess){
        return {errMess};
    }

   else if (comments != null) 
   return(
       <div>
           <h4>Comments</h4>
           <ul className="list-unstyled">
               {commentsList}
           </ul>
           <CommentForm dishId={dishId} postComment={postComment} />
       </div>
   );
else 
   return(
       <div></div>
   );
}

function RenderDish({dish,isLoading,errMess}){

    if(isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    }

    else if(errMess){
        return(
            <div className="container">
                <div className="row">
                    <h3>{errMess}</h3>
                </div>
            </div>
        )
    }

    else if(dish!=null){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
            <CardImg top src={baseUrl+dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
        )        
    }
    else{
        return(
            <div></div>
        )
    }
    
 }

 

 class Dishdetail extends Component{
     constructor(props){
         super(props);
     }  
     render(){     
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={this.props.dish} isLoading={this.props.isLoading} errMess={this.props.dishErrMess} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={this.props.comments} dishId={this.props.dish.id} postComment={this.props.postComment} errMess={this.props.commetsErrMess} />
                </div>
            </div>
            </div>
        );
            }  
 }

 export default Dishdetail;