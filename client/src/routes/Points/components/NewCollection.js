
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CollectionNameForm from './CollectionNameForm'
import CollectionSearch from './CollectionSearch'



class NewCollectionView extends React.Component {

  componentDidMount(e){
    document.getElementById('new_collection_search').focus();
  }

  render(){

    let collection = this.props.collection;

    if (!collection){
      return <div>waiting for new colleccc</div>;
    }

    let sections = collection.app.sections;
    let form_in_focus = sections.collection_name_form.in_focus;
    let search_in_focus = sections.collection_search.in_focus;

    return (
      <div>
        <CollectionSearch
          in_focus={search_in_focus}
          search_collection={this.props.search_collection}
          app={sections.collection_search}
        />
        <CollectionNameForm
          name={collection.name}
          post_collection={this.props.post_collection}
          in_focus={form_in_focus}
        />
      </div>
    )
  }
}


export default NewCollectionView
