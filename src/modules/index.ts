import contact from 'src/modules/contact/routes';

const routes = [contact];

export default routes.reduce((allRoutes, moduleRoutes) => allRoutes.concat(moduleRoutes));
