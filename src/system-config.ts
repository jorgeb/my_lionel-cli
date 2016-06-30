/***********************************************************************************************
 * User Configuration. jas
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  '@ngrx/store',
  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});


cliSystemConfigPackages['moment'] = {format: 'cjs'};
cliSystemConfigPackages['ng2-bootstrap'] = {format: 'cjs'};
cliSystemConfigPackages['angular2-fontawesome'] = {
      defaultExtension: 'js',
      main: 'components.js'
    };

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    '@angular2-material': 'vendor/@angular2-material',
    'rxjs': 'vendor/rxjs',
    '@ngrx': 'vendor/@ngrx',
    'main': 'main.js',
    'moment': 'vendor/moment/moment.js',
    'ng2-bootstrap':'vendor/ng2-bootstrap',
    'angular2-fontawesome':'vendor/angular2-fontawesome/lib'
  },
  packages: cliSystemConfigPackages
});

// put the names of any of your Material components here
const materialPkgs:string[] = [
  'core',
  'button',
  'card',
  'tabs',
  'list',
  'icon'
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

// Apply the user's configuration.
System.config({ map, packages });
