<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'mysql' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Q?mBvdcp^kQ1n]J.p8C3u.VMK,uiik,/x: /u]_czxDLel!(3C|3wSTbp0$D:cBZ' );
define( 'SECURE_AUTH_KEY',  '!!dgm4?K{Mx?Ith@c5N/_y|B(ei[rKsy%9Iq*^>PJi2XyS=K~:g%(CsTZ=n`u;xl' );
define( 'LOGGED_IN_KEY',    'Un1QI(`X^?vXw&BsCqNk92xVh:^sffZG?PF/|/5)_IS<-%QcpI>p/RQKmfu,S32S' );
define( 'NONCE_KEY',        'CW4{6wWq06@]f5^75nFO*W:<_~0rU JFK4Q;G#?r793:16><~6v$,1REXtcSOe$3' );
define( 'AUTH_SALT',        '/Sr0E6c!rN(<t(O|b?k.EnT>Ii|`%xbI;*:<$to:*.;nE:%Pz1;=Z |I0tfHIxd@' );
define( 'SECURE_AUTH_SALT', '<mlg~swIq7qTSoTZaYC2dcuNu|)9LoK@O*>T)QjiF)PbnF=uJs?8t~@W4<0=?lE.' );
define( 'LOGGED_IN_SALT',   'C,J62JKGOO/(xwda1HDYy%P4B#RE3OxDCe]T08QksloGyL{_fBi%58Kq O6zUr+:' );
define( 'NONCE_SALT',       'b3J2:wA},(>Y33kIS7v+m,?3,^&+6Y`CpsZ_Y*[9 5=e7sz}P#27CtJUFpc1{y2l' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
