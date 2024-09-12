interface Photo {
	topics: string[];
}

interface TopicElement {
	label: string;
	value: string;
}

/**
 * Retrieves the unique topics from an array of photos
 * and returns them in the format expected
 * by the "elements" property ("field" prop) of the Dataviews component.
 *
 * @param {Photo[]} photos - The array of photos.
 * @return {TopicElement[]} - An array of objects containing the label and value of each topic.
 * @example
 *  Call - getTopics([{ topics: ["nature", "water"] }, { topics: ["nature", "mountain"] }]);
 *  Returns - [{ label: "Nature", value: "nature" }, { label: "Water", value: "water" }, { label: "Mountain", value: "mountain" }]
 * @link https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dataviews/#fields-elements
 */
export const getTopicsElementsFormat = ( photos: Photo[] ): TopicElement[] => {
	const topics = photos.reduce( ( acc: string[], photo: Photo ) => {
		return acc.concat( photo.topics );
	}, [] );

	return [ ...new Set( topics ) ].map( ( topic: string ) => {
		const spacedTopic = topic.replace( /-/g, ' ' );
		const capitalizedTopic = spacedTopic.replace( /\b\w/g, ( l ) =>
			l.toUpperCase()
		);
		return {
			label: capitalizedTopic,
			value: topic,
		};
	} );
};
