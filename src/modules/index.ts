import contact from 'src/modules/contact/routes';
import sms from 'src/modules/sms/routes';

const routes = [contact, sms];

export default routes.reduce((allRoutes, moduleRoutes) => allRoutes.concat(moduleRoutes));
