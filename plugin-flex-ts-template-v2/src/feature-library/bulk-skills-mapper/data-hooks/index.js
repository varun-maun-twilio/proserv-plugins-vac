import {getFeatureFlags} from "../../../utils/configuration"
export const fetchEndpoint = (path)=>{
    const custom_data = getFeatureFlags() || {};

    // use serverless_functions_domain from ui_attributes, or .env or set as undefined

   let serverlessProtocol = 'https';
    let serverlessDomain = '';

    if (process.env?.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN)
      serverlessDomain = process.env?.FLEX_APP_SERVERLESS_FUNCTONS_DOMAIN;

    if (custom_data?.serverless_functions_domain) serverlessDomain = custom_data.serverless_functions_domain;

    if (custom_data?.serverless_functions_protocol) serverlessProtocol = custom_data.serverless_functions_protocol;

    if (custom_data?.serverless_functions_port) serverlessDomain += `:${custom_data.serverless_functions_port}`;


    return  `${serverlessProtocol}://${serverlessDomain}${path}`;
}