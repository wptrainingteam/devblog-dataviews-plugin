import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews';
import { getTopicsElementsFormat } from './utils';
import { useState, useMemo } from '@wordpress/element';
import {
	SelectControl,
	Button,
	__experimentalText as Text,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	Spinner,
	withNotices,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import './style.scss';

// source "data" definition
import { dataPhotos } from './data';

// "defaultLayouts" definition
const primaryField = 'id';
const mediaField = 'img_src';

const defaultLayouts = {
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
const App = withNotices( ( { noticeOperations, noticeUI } ) => {
	const { createNotice } = noticeOperations;

	const [ isUploadingItems, setIsUploadingItems ] = useState( [] );

	// "view" and "setView" definition
	const [ view, setView ] = useState( {
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

	// "processedData" and "paginationInfo" definition
	const { data: processedData, paginationInfo } = useMemo( () => {
		return filterSortAndPaginate( dataPhotos, view, fields );
	}, [ view ] );

	const onSuccessMediaUpload = ( oImageUploaded ) => {
		const title = oImageUploaded.title.rendered;
		setIsUploadingItems( ( prevIsUploadingItems ) =>
			prevIsUploadingItems.filter(
				( slugLoading ) => slugLoading !== title
			)
		);

		createNotice( {
			status: 'success',
			// translators: %s is the image title
			content:
				`${ title }.jpg ` +
				__( 'succesfully uploaded to Media Library' ),
			isDismissible: true,
		} );
	};

	const onErrorMediaUpload = ( error ) => {
		setIsUploadingItems( [] );
		console.log( error );
		createNotice( {
			status: 'error',
			content: __( 'An error occurred!' ),
			isDismissible: true,
		} );
	};

	// "actions" definition
	const actions = [
		{
			id: 'upload-media',
			label: __( 'Upload Media' ),
			isPrimary: true,
			icon: 'upload',
			supportsBulk: true,
			callback: ( images ) => {
				window.scrollTo( 0, 0 );
				images.forEach( async ( image ) => {
					setIsUploadingItems( ( prevIsUploadingItems ) => [
						...prevIsUploadingItems,
						image.slug,
					] );

					// 1- Download the image and convert it to a blob
					const responseRequestImage = await fetch( image.urls.raw );
					const blobImage = await responseRequestImage.blob();

					// 2- Create FormData with the image blob
					const formDataWithImage = new FormData();
					formDataWithImage.append(
						'file',
						blobImage,
						`${ image.slug }.jpg`
					);

					// 3- Send the request to the WP REST API with apiFetch
					await apiFetch( {
						path: '/wp/v2/media',
						method: 'POST',
						body: formDataWithImage,
					} )
						.then( onSuccessMediaUpload )
						.catch( onErrorMediaUpload );
				} );
			},
		},
		{
			id: 'see-original',
			label: __( 'See Original' ),
			modalHeader: __( 'See Original Image', 'action label' ),
			RenderModal: ( { items: [ item ], closeModal } ) => {
				const [ size, setSize ] = useState( 'raw' );
				return (
					<VStack spacing="5">
						<Text>
							{ `Select the size you want to open for "${ item.slug }"` }
						</Text>
						<HStack justify="left">
							<SelectControl
								__nextHasNoMarginBottom
								label="Size"
								value={ size }
								options={ Object.keys( item.urls )
									.filter( ( url ) => url !== 'small_s3' )
									.map( ( url ) => ( {
										label: url,
										value: url,
									} ) ) }
								onChange={ setSize }
							/>
						</HStack>
						<HStack justify="right">
							<Button
								__next40pxDefaultSize
								variant="primary"
								onClick={ () => {
									closeModal();
									window.open( item.urls[ size ], '_blank' );
								} }
							>
								Open image from original location
							</Button>
						</HStack>
					</VStack>
				);
			},
		},
	];
	return (
		<>
			{ !! isUploadingItems.length && <Spinner /> }
			{ noticeUI }
			<DataViews
				data={ processedData }
				fields={ fields }
				view={ view }
				onChangeView={ setView }
				defaultLayouts={ defaultLayouts }
				actions={ actions }
				paginationInfo={ paginationInfo }
			/>
		</>
	);
} );

export default App;
