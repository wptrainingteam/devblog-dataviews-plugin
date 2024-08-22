<?php
/**
 * Plugin Name: DevBlog Dataviews Plugin
 * Description: A companion plugin for a WordPress Developer Blog article.
 * Version: 1.0.1
 * Requires at least: 6.1
 * Requires PHP: 7.4
 * Author: JuanMa Garrido
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * Text Domain: devblog-dataviews-plugin
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu', 'devblog_dataviews_admin_menu' );

/**
 * Creates a new Media subsection and set the HTML for it.
 */
function devblog_dataviews_admin_menu() {
	add_media_page(
		__( 'Add Media from third party service', 'devblog-dataviews-plugin' ),
		__( 'Add Media from third party service', 'devblog-dataviews-plugin' ),
		'manage_options',
		'add-media-from-third-party-service',
		function () {
			printf(
				'<h1>%s</h1><div id="add-media-from-third-party-service"></div>',
				esc_html__( 'Add Media from third party service', 'devblog-dataviews-plugin' )
			);
		}
	);
}

