# Dataviews Plugin

[![](https://img.shields.io/badge/playground-live%20preview-blue?logo=wordpress)](https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/wptrainingteam/devblog-dataviews-plugin/main/_playground/blueprint.json)

An exploration of using the Dataview component inside of a plugin

The process to build this project is explained in the following article of the [WordPress Developer Blog](https://developer.wordpress.org/news/): 
- [Using Data Views to display and interact with data in plugins](https://developer.wordpress.org/news/2024/08/27/using-data-views-to-display-and-interact-with-data-in-plugins/)
- [Actions from Data Views: Adding images to the Media Library](https://developer.wordpress.org/news/2024/09/23/actions-from-data-views-adding-images-to-the-media-library/)


## Development

1. Set up a local WordPress development environment.
2. Clone / download this repository into the `wp-content/plugins` folder.
3. Navigate to the `wp-content/plugins/devblog-dataviews-plugin` folder in the command line.
4. Run `npm install` to install the plugin's dependencies within a `/node_modules/` folder.
5. Run `npm run start` to compile and watch source files for changes while developing.
6. Login to your local WordPress development environment, navigate from _Dashboard > Plugins_ and activate _"DevBlog Dataviews Plugin"_

Refer to `package.json` for additional commands.
