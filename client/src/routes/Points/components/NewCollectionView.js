
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CollectionNameForm from './CollectionNameForm'
import CollectionSearch from './CollectionSearch'



class NewCollectionView extends React.Component {

  render(){

    let collection = this.props.collection;

    if (!collection){
      return <div>waiting for new colleccc</div>;
    }

    let form_in_focus = collection.app.sections.new_collection.sub_sections.collection_name_form.in_focus;
    let search_in_focus = collection.app.sections.new_collection.sub_sections.collection_search.in_focus;

    return (
      <div>
        New collectionnnnnnnnnn
        <CollectionNameForm
          name={collection.name}
          update_collection_name={this.props.update_collection_name}
          in_focus={form_in_focus}
        />
        <CollectionSearch
          section={collection.app.sections.collection_search}
          in_focus={search_in_focus}
        />
      </div>
    )
  }
}


export default NewCollectionView
