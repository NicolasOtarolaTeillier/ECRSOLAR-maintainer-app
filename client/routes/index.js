
// NextJS Material Dashboard 2 PRO components
import MDAvatar from '/components/MDAvatar'

// @mui icons
import Icon from '@mui/material/Icon'

// Images
import profilePicture from '/assets/images/team-4.jpg'

const routes = [
  {
    type: 'collapse',
    name: 'Victor Muñoz',
    key: 'brooklyn-alice',
    icon: <MDAvatar src={profilePicture.src} alt='Brooklyn Alice' size='sm' />,
    collapse: [
      {
        name: 'My Profile',
        key: 'my-profile',
        route: '/pages/profile/profile-overview'
      },
      {
        name: 'Settings',
        key: 'profile-settings',
        route: '/pages/account/settings'
      },
      {
        name: 'Logout',
        key: 'logout',
        route: '/authentication/sign-in/basic'
      }
    ]
  },
  { type: 'divider', key: 'divider-0' },
  {
    type: 'collapse',
    name: 'Modulo Comercial',
    key: 'commercial',
    icon: <Icon fontSize='medium'>dashboard</Icon>,
    collapse: [
      {
        name: 'Nuevo servicio',
        key: 'service',
        route: '/commercial/service'
      },
      {
        name: 'Agregar Proveedores',
        key: 'sales',
        route: '/dashboards/sales'
      }
    ]
  },
  {
    type: 'collapse',
    name: 'Modulo Operaciones',
    key:  'operations',
    icon: <Icon fontSize='medium'>dashboard</Icon>,
    collapse: [
      {
        name: 'Planificar Servicios',
        key: 'servicesPlanning',
        route: '/operations/servicesPlanning'
      },
      {
        name: 'Resumen de Servicios',
        key: 'servicesSummary',
        route: '/operations/servicesSummary'
      },
    ]
  },
  { type: 'divider', key: 'divider-0' },
  { type: 'title', title: 'Pages', key: 'title-pages' },
   {
     type: 'collapse',
     name: 'Pages',
     key: 'pages',
     icon: <Icon fontSize='medium'>image</Icon>,
     collapse: [
       {
         name: 'Profile',
         key: 'profile',
         collapse: [
           {
             name: 'Profile Overview',
             key: 'profile-overview',
             route: '/pages/profile/profile-overview'
           },
           {
             name: 'All Projects',
             key: 'all-projects',
             route: '/pages/profile/all-projects'
           }
         ]
       },
       {
         name: 'Users',
         key: 'users',
         collapse: [
           {
             name: 'New User',
             key: 'new-user',
             route: '/pages/users/new-user'
           }
         ]
       },
       {
         name: 'Account',
         key: 'account',
         collapse: [
           {
             name: 'Settings',
             key: 'settings',
             route: '/pages/account/settings'
           },
           {
             name: 'Billing',
             key: 'billing',
             route: '/pages/account/billing'
           },
           {
             name: 'Invoice',
             key: 'invoice',
             route: '/pages/account/invoice'
           }
         ]
       },
       {
         name: 'Projects',
         key: 'projects',
         collapse: [
           {
             name: 'Timeline',
             key: 'timeline',
             route: '/pages/projects/timeline'
           }
         ]
       },
       {
         name: 'Pricing Page',
         key: 'pricing-page',
         route: '/pages/pricing-page'
       },
       { name: 'RTL', key: 'rtl', route: '/pages/rtl' },
       {
         name: 'Widgets',
         key: 'widgets',
         route: '/pages/widgets'
       },
       {
         name: 'Charts',
         key: 'charts',
         route: '/pages/charts'
       },
       {
         name: 'Notfications',
         key: 'notifications',
         route: '/pages/notifications'
       }
     ]
   },
{
    type: 'collapse',
    name: 'Aplicaciones',
    key: 'applications',
    icon: <Icon fontSize='medium'>apps</Icon>,
    collapse: [
       {
         name: 'Kanban',
         key: 'kanban',
         route: '/applications/kanban'
       },
      {
        name: 'Calendar',
        key: 'calendar',
        route: '/applications/calendar'
      }
    ]
  },

]

export default routes
