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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
export var getTopicsElementsFormat = function (photos) {
    var topics = photos.reduce(function (acc, photo) {
        return acc.concat(photo.topics);
    }, []);
    return __spreadArray([], __read(new Set(topics)), false).map(function (topic) {
        var spacedTopic = topic.replace(/-/g, ' ');
        var capitalizedTopic = spacedTopic.replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        });
        return {
            label: capitalizedTopic,
            value: topic,
        };
    });
};
