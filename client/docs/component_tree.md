
# COMPONENT TREE
Notation:

  `- SomeComponent`

  `* some.piece.of.state`

  `+ some_function`

```

    - Tabs
    * state.collections
        [
            - TabBar
                - [TabMarker]
            - TabView
                - CollectionHeader
                    * collection.name
                    * collection.app.mode
                    * collection.app.is_saved
                - PointList
                    * collection.points
                    [
                        - Point
                            - PointEditor
                                - EditPointForm
                                    + edit_point
                                - NewTagForm
                                    + submit_new_tag
                                - TagSearch
                                    * point.searching_tags
                                    + search_tags
                                    + add_point_tag
                                - RemoveTags
                                    * point.associated_tags
                                    + remove_tag_from_collection
                            - PointCard
                                    + _toggle_point_visibility
                    ]
                    - PointSearch
                - PointForm
                    + submit_new_point
                - CollectionEditor
                    * collection.app
                    * collection.tags
                    - EditNameForm
                    - NewTagForm
                    - TagSearch
                    - RemoveTags
                    - ModeRadios
                    - FilterForm
                - NewCollection
        ]

    client/docs/component_tree.md

```
