import { DataViews } from "@wordpress/dataviews";
import { getTopicsElementsFormat } from "./utils";
import "./style.scss";

// source "data" definition
import { dataPhotos } from "./data";

// "defaultLayouts" definition
// "fields" definition
const fields = [
  {
    id: "img_src",
    label: "Image",
    render: ({ item }) => (
      <img alt={item.alt_description} src={item.urls.thumb} />
    ),
    enableSorting: false,
  },
  {
    id: "id",
    label: "ID",
    enableGlobalSearch: true,
  },
  {
    id: "author",
    label: "Author",
    getValue: ({ item }) => `${item.user.first_name} ${item.user.last_name}`,
    render: ({ item }) => (
      <a target="_blank" href={item.user.url}>
        {item.user.first_name} {item.user.last_name}
      </a>
    ),
    enableGlobalSearch: true,
  },
  {
    id: "alt_description",
    label: "Description",
    enableGlobalSearch: true,
  },
  {
    id: "topics",
    label: "Topics",
    elements: getTopicsElementsFormat(dataPhotos),
    render: ({ item }) => {
      return (
        <div class="topic_photos">
          {item.topics.map((topic) => (
            <span class="topic_photo_item">{topic.toUpperCase()}</span>
          ))}
        </div>
      );
    },
    filterBy: {
      operators: ["isAny", "isNone", "isAll", "isNotAll"],
    },
    enableSorting: false,
  },
  {
    id: "width",
    label: "Width",
    getValue: ({ item }) => parseInt(item.width),
    enableSorting: true,
  },
  {
    id: "height",
    label: "Height",
    getValue: ({ item }) => parseInt(item.height),
    enableSorting: true,
  },
];
const App = () => {
  // "view" and "setView" definition
  // "processedData" and "paginationInfo" definition
  // "actions" definition

  return (
    <DataViews
      data={processedData}
      fields={fields}
      view={view}
      onChangeView={setView}
      defaultLayouts={defaultLayouts}
      actions={actions}
      paginationInfo={paginationInfo}
    />
  );
};

export default App;
