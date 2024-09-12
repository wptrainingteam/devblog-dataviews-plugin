import {
	DataViews,
	filterSortAndPaginate,
	View,
	Field,
	Action,
} from '@wordpress/dataviews';
import { getTopicsElementsFormat } from './utils';
import { useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './style.scss';

// Import and type the data
import { dataPhotos, Photo } from './data';

// Type definitions for
interface PaginationInfo {
	totalItems: number;
	totalPages: number;
}

// Type definitions for layouts
interface Layout {
	primaryField: string;
	mediaField?: string;
}

interface Layouts {
	[ key: string ]: {
		layout: Layout;
	};
}

const primaryField = 'id';
const mediaField = 'img_src';

const defaultLayouts: Layouts = {
	table: {
		layout: {
			primaryField,
		},
	},
	grid: {
		layout: {
			primaryField,
			mediaField,
		},
	},
};

// Type definition for fields
const fields: Field< Photo >[] = [
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
		enableSorting: true,
	},
	{
		id: 'height',
		label: __( 'Height' ),
		enableSorting: true,
	},
];

const App: React.FC = () => {
	const [ view, setView ] = useState< View >( {
		type: 'table',
		perPage: 10,
		layout: defaultLayouts.table.layout,
		fields: [
			'img_src',
			'id',
			'alt_description',
			'author',
			'topics',
			'width',
			'height',
		],
	} );

	const { data: processedData, paginationInfo } = useMemo< {
		data: Photo[];
		paginationInfo: PaginationInfo;
	} >( () => {
		return filterSortAndPaginate( dataPhotos, view, fields );
	}, [ view ] );

	const actions: Action< Photo >[] = [
		{
			id: 'see-original',
			label: __( 'See Original' ),
			callback: ( items: Photo[] ) => {
				const urlImage = items[ 0 ].urls.raw;
				window.open( urlImage, '_blank' );
			},
		},
	];

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
