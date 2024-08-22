import { DataViews } from '@wordpress/dataviews';
import './style.scss';

// source "data" definition
import { dataPhotos } from './data';

// "defaultLayouts" definition
// "fields" definition

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
