
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import NewCollectionView from './NewCollectionView'



class TabView extends React.Component {

  //validate_collection(){
    //let collection = this.props.collection;
    //if (!collection){
      //return false;
    //}
    //let has_points = collection.points.length > 0;
    //let has_tags = collection.tags.length > 0;
    //let has_name = collection.name.length > 0 && collection.name !== 'new_collection';
    //return has_points || has_tags || has_name;
  //}

  render(){

    if (!this.props.collection){
      return (
        <div>Welcome to study app ya'll</div>
      )
    }

    if (this.props.collection.app.is_new){
      return (
        <NewCollectionView
          update_collection_name={this.props.update_collection_name}
          collection={this.props.collection}
        />
      )
    }

    return (
      <div>
        {this.props.collection.name} 
      </div>
    )
  }

}


export default TabView
