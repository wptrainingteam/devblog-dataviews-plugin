var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DataViews, filterSortAndPaginate, } from '@wordpress/dataviews';
import { getTopicsElementsFormat } from './utils';
import { useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './style.scss';
// Import and type the data
import { dataPhotos } from './data';
var primaryField = 'id';
var mediaField = 'img_src';
var defaultLayouts = {
    table: {
        layout: {
            primaryField: primaryField,
        },
    },
    grid: {
        layout: {
            primaryField: primaryField,
            mediaField: mediaField,
        },
    },
};
// Type definition for fields
var fields = [
    {
        id: 'img_src',
        label: __('Image'),
        render: function (_a) {
            var item = _a.item;
            return (_jsx("img", { alt: item.alt_description, src: item.urls.thumb }));
        },
        enableSorting: false,
    },
    {
        id: 'id',
        label: __('ID'),
        enableGlobalSearch: true,
    },
    {
        id: 'author',
        label: __('Author'),
        getValue: function (_a) {
            var item = _a.item;
            return "".concat(item.user.first_name, " ").concat(item.user.last_name);
        },
        render: function (_a) {
            var item = _a.item;
            return (_jsxs("a", { target: "_blank", href: item.user.url, rel: "noreferrer", children: [item.user.first_name, " ", item.user.last_name] }));
        },
        enableGlobalSearch: true,
    },
    {
        id: 'alt_description',
        label: __('Description'),
        enableGlobalSearch: true,
    },
    {
        id: 'topics',
        label: __('Topics'),
        elements: getTopicsElementsFormat(dataPhotos),
        render: function (_a) {
            var item = _a.item;
            return (_jsx("div", { className: "topic_photos", children: item.topics.map(function (topic) { return (_jsx("span", { className: "topic_photo_item", children: topic.toUpperCase() }, topic)); }) }));
        },
        filterBy: {
            operators: ['isAny', 'isNone', 'isAll', 'isNotAll'],
        },
        enableSorting: false,
    },
    {
        id: 'width',
        label: __('Width'),
        enableSorting: true,
    },
    {
        id: 'height',
        label: __('Height'),
        enableSorting: true,
    },
];
var App = function () {
    var _a = __read(useState({
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
    }), 2), view = _a[0], setView = _a[1];
    var _b = useMemo(function () {
        return filterSortAndPaginate(dataPhotos, view, fields);
    }, [view]), processedData = _b.data, paginationInfo = _b.paginationInfo;
    var actions = [
        {
            id: 'see-original',
            label: __('See Original'),
            callback: function (items) {
                var urlImage = items[0].urls.raw;
                window.open(urlImage, '_blank');
            },
        },
    ];
    return (_jsx(DataViews, { data: processedData, fields: fields, view: view, onChangeView: setView, defaultLayouts: defaultLayouts, actions: actions, paginationInfo: paginationInfo }));
};
export default App;
