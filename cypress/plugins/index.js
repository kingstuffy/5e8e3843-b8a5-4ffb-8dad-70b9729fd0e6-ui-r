/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

require('dotenv').config();

module.exports = (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.baseApiUrl = process.env.REACT_APP_BASE_API_URL;
  config.env.defaultProductSlug = process.env.REACT_APP_DEFAULT_PRODUCT_SLUG;
  config.env.productUrl = `${process.env.REACT_APP_BASE_API_URL}/product/${process.env.REACT_APP_DEFAULT_PRODUCT_SLUG}`;
  config.env.reviewUrl = `${process.env.REACT_APP_BASE_API_URL}/review`;

  // do not forget to return the changed config object!
  return config;
};
