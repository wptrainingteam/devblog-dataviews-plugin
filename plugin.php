<?php
/**
 * Plugin Name: DevBlog Dataviews Plugin
 * Description: Displays a dataset of images for upload to the Media Library.
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

add_action( 'admin_enqueue_scripts', 'devblog_dataviews_admin_enqueue_assets' );

/**
 * Enqueues JS and CSS files for our custom Media subsection page.
 *
 * @param string $hook_suffix The current admin page.
 */
function devblog_dataviews_admin_enqueue_assets( $hook_suffix ) {
	// Load only on ?page=add-media-from-third-party-service.
	if ( 'media_page_add-media-from-third-party-service' !== $hook_suffix ) {
		return;
	}

	$dir = plugin_dir_path( __FILE__ );
	$url = plugin_dir_url( __FILE__ );

	$asset_file = $dir . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'devblog-dataviews-script',
		$url . 'build/index.js',
		$asset['dependencies'],
		$asset['version'],
		array(
			'in_footer' => true,
		)
	);

	wp_enqueue_style(
		'devblog-dataviews-styles',
		$url . 'build/style-index.css',
		array( 'wp-components' ),
		$asset['version'],
	);
}
