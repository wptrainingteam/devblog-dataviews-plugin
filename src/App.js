import { DataViews } from '@wordpress/dataviews';
import { getTopicsElementsFormat } from './utils';
import { __ } from '@wordpress/i18n';
import './style.scss';

// source "data" definition
import { dataPhotos } from './data';

// "defaultLayouts" definition
// "fields" definition
const fields = [
	{
		id: 'img_src',
		label: __( 'Image' ),
		render: ( { item } ) => (
			<img alt={ item.alt_description } src={ item.urls.thumb } />
		),
		enableSorting: false,
	},
	{
		id: 'id',
		label: __( 'ID' ),
		enableGlobalSearch: true,
	},
	{
		id: 'author',
		label: __( 'Author' ),
		getValue: ( { item } ) =>
			`${ item.user.first_name } ${ item.user.last_name }`,
		render: ( { item } ) => (
			<a target="_blank" href={ item.user.url } rel="noreferrer">
				{ item.user.first_name } { item.user.last_name }
			</a>
		),
		enableGlobalSearch: true,
	},
	{
		id: 'alt_description',
		label: __( 'Description' ),
		enableGlobalSearch: true,
	},
	{
		id: 'topics',
		label: __( 'Topics' ),
		elements: getTopicsElementsFormat( dataPhotos ),
		render: ( { item } ) => {
			return (
				<div className="topic_photos">
					{ item.topics.map( ( topic ) => (
						<span key={ topic } className="topic_photo_item">
							{ topic.toUpperCase() }
						</span>
					) ) }
				</div>
			);
		},
		filterBy: {
			operators: [ 'isAny', 'isNone', 'isAll', 'isNotAll' ],
		},
		enableSorting: false,
	},
	{
		id: 'width',
		label: __( 'Width' ),
		getValue: ( { item } ) => parseInt( item.width ),
		enableSorting: true,
	},
	{
		id: 'height',
		label: __( 'Height' ),
		getValue: ( { item } ) => parseInt( item.height ),
		enableSorting: true,
	},
];
const App = () => {
	// "view" and "setView" definition
	// "processedData" and "paginationInfo" definition
	// "actions" definition

	return (
		<DataViews
			data={ processedData }
			fields={ fields }
			view={ view }
			onChangeView={ setView }
			defaultLayouts={ defaultLayouts }
			actions={ actions }
			paginationInfo={ paginationInfo }
		/>
	);
};

export default App;
