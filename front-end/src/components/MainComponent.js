import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment,fetchDishes, fetchComments,fetchPromos,fetchLeaders,postFeedback} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

const mapDispatchToProps=(dispatch)=>({
  postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
  postFeedback:(firstname,lastname,telnum,email,agree,contactType,message)=>dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  fetchDishes:()=>dispatch(fetchDishes()),
  fetchComments:()=>dispatch(fetchComments()),
  fetchPromos:()=>dispatch(fetchPromos()),
  fetchLeaders:()=>dispatch(fetchLeaders()),
  resetFeedbackForm:()=>dispatch(actions.reset('feedback'))
})


class Main extends Component{
      constructor(props){
          super(props);
      }

      componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

      render(){

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}

                leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMess={this.props.leaders.errMess}

                promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}
                ></Home>
            );
          }
          
          const DishWithId=({match})=>{
              return(
                  <Dishdetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId))[0]}
                  isLoading={this.props.dishes.isLoading}
                  dishErrMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId))}
                    postComment={this.props.postComment}
                    commentsErrMess={this.props.comments.errMess}
                  ></Dishdetail>
              )
          }

          return(
              <>
              <Header/>

          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location} >
                  <Route path="/home" component={HomePage}></Route>
                  <Route exact path="/menu" component={()=>{return(<Menu dishes={this.props.dishes} />)}}></Route>
                  <Route path="/menu/:dishId" component={DishWithId}></Route>
                  <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}></About>}></Route>
                  <Route exact path="/contactus" component={()=>{return(<Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />)}}></Route>
                  <Redirect to="/home"></Redirect>
              </Switch>
              </CSSTransition>
              </TransitionGroup>
              <Footer/>
              </>
          )
      }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));