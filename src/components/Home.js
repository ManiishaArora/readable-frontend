import React, { Component } from 'react';
import {Container,Button} from 'reactstrap'
import PostsList from './PostsList'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllCategories} from '../middleware/category'

class Home extends Component {
  state ={
    category: this.props.match.params?this.props.match.params.category:''
  }
  componentDidMount(){
    this.props.loadAllCategories();
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      category:newProps.match.params?newProps.match.params.category:''
    })
  }
  render() {
    return (
      <div>
      <div className="sidenav">
          <h6 className="text-white"> Categories </h6>
          <Link to="/" >Home</Link>
          {this.props.categories && this.props.categories.length!==0 && this.props.categories.map(category =>
             <Link to={{ pathname: `/category/${category.name}`}} key={category.name}>{category.name}</Link>
            )
          }
      </div>
      <Container className="mt-5 root">
          <Link to="/posts/add" >
            <Button color="info" className="float-right mb-3 clickable" >Add Posts</Button>
          </Link>
          <PostsList selectedCategory={this.state.category}/>
      </Container>
      </div>
    );
  }
}

function mapStateToProps({home,postList}){
  return{
    categories:home.categories
  }
  
}
function mapDispatchToProps(dispatch){
  return{
    loadAllCategories: () => fetchAllCategories(dispatch)
  }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(Home) ;
