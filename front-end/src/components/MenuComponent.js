import React, { Component } from 'react';
import {
    Card, CardImg,
    CardTitle,CardImgOverlay,Breadcrumb,BreadcrumbItem
  } from 'reactstrap';

import {Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';

  function RenderMenuItem ({dish}){
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}




class Menu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const menu=this.props.dishes.dishes.map((dish)=>{
            return(
                <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}>
                  <RenderMenuItem dish={dish}></RenderMenuItem>
                </Card>
              </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;