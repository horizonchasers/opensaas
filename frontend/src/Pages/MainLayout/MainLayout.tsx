import React, { useCallback } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames';
import { useQuery, gql } from '@apollo/client';
import { Audits } from '@frontegg/react-audits';
import { ProtectedRoute, Profile, SSO, Team } from '@frontegg/react-auth';
import { WebhookComponent, ConnectivityPage } from '@frontegg/react-connectivity';

import { Alert } from '../../Components/Alert';
import Sidebar from '../../Components/Sidebar';
import NavBar from '../../Components/NavBar';
import { NotificationContext, NotificationContextType } from '../../Components/NotificationContext';

import FormPage from './FormPage';
import SliderPage from './SliderPage';
import DatePickerPage from './DatePickerPage';
import SwitchPage from './SwitchPage';
import Table from './TablePage';
import Dashboard from './Dashboard';
import Hello from './Hello';
import Amcharts from './Amcharts';
import UIScreenPage from './UIScreenPage';
import Badges from './UIScreenPage/UIElementsPages/Badges';
import Dropdowns from './UIScreenPage/UIElementsPages/Dropdowns';
import Buttons from './UIScreenPage/UIElementsPages/Buttons';
import Paginations from './UIScreenPage/UIElementsPages/Paginations';
import Images from './UIScreenPage/UIElementsPages/Images';
import Lists from './UIScreenPage/UIElementsPages/Lists';
import ProgressBars from './UIScreenPage/UIElementsPages/ProgressBars';
import Alerts from './UIScreenPage/UIElementsPages/Alerts';
import Notifications from './UIScreenPage/UIElementsPages/Notifications';
import Tabs from './UIScreenPage/UIElementsPages/Tabs';
import Typography from './UIScreenPage/UIElementsPages/Typography';
import BreadcrumbsPage from './UIScreenPage/UIElementsPages/Breadcrumbs';
import { APIManagement } from './APIManagement';
import { MOCK_REQUESTS } from './mockRequests';
import { routes } from '../../routes';
import { Anomalies } from './Anomalies';
import { Services } from './Services';

import 'react-notifications/lib/notifications.css';
import './MainLayout.scss';

const REQUESTS = gql`
  query {
    requests {
      id
      tenantId
      url
      userAgent
      statusCode
      createdAt
    }
  }
`;

const TeamManagement = () => {
  return <Team.Page />;
};

const AuditsPage = () => {
  return <Audits.Page />;
};

const Connectivity = () => {
  return <ConnectivityPage rootPath={routes.events.path} />;
};

const Webhooks = () => {
  return <WebhookComponent rootPath={routes.webhooks.path} />;
};

const Sso = () => {
  return <SSO.Page />;
};

const ProfilePage = () => {
  return <Profile.Page />;
};

const MainDashboard = () => {
  const { loading, error, data } = useQuery(REQUESTS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error(error);
  }

  const requests = data?.requests.length ? data.requests : MOCK_REQUESTS;

  return <Dashboard requests={requests} />;
};

const MainHello = () => {
  const { loading, error, data } = useQuery(REQUESTS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error(error);
  }

  const requests = data?.requests.length ? data.requests : MOCK_REQUESTS;

  return <Hello requests={requests} />;
};

const MainAmcharts = () => {
  const { loading, error, data } = useQuery(REQUESTS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error(error);
  }

  const requests = data?.requests.length ? data.requests : MOCK_REQUESTS;

  return <Amcharts requests={requests} />;
};

const MainLayout: React.FC = () => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [fixedSidebar, setFixSidebar] = React.useState<boolean>(true);
  const handleFixSidebar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixSidebar(!fixedSidebar);
  };

  const [fixedNavbar, setFixNavbar] = React.useState<boolean>(false);
  const handlesFixNavbar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixNavbar(!fixedNavbar);
  };

  const [collapsed, collapse] = React.useState<boolean>(false);
  const handleCollapse = (event: React.ChangeEvent<HTMLInputElement>) => {
    collapse(!collapsed);
  };

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  const [hovered] = React.useState<boolean>(false);
  const context = React.useContext<NotificationContextType>(NotificationContext);
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset === 0) {
      setScrolled(false);
    }
    if (window.pageYOffset > 0 && !scrolled) {
      setScrolled(true);
    }
  }, [scrolled]);

  const handleResize = useCallback(() => {
    setWindowDimensions(getWindowDimensions());
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  React.useEffect(() => {
    collapse(windowDimensions.width < 768);
  }, [windowDimensions]);

  const switches = [
    {
      label: 'Fix sidebar',
      state: [fixedSidebar, setFixSidebar],
    },
    {
      label: 'Fix navbar',
      state: [fixedNavbar, setFixNavbar],
    },
  ];

  const [palletType, setPalletType] = React.useState<'light' | 'dark' | 'navbar' | 'sidebar'>('light');
  const palette = palletType === 'navbar' || palletType === 'sidebar' ? 'light' : palletType;
  const darkTheme = createMuiTheme({
    palette: {
      type: palette,
      primary: {
        main: '#2196f3',
      },
    },
  });

  React.useEffect(() => {
    document.getElementById('root')?.classList.add('theme-light');
  }, []);

  const handleThemeChange = (value: 'light' | 'dark' | 'navbar' | 'sidebar') => {
    setPalletType(value);
    document.getElementById('root')!.className = '';
    document.getElementById('root')?.classList.add(`theme-${value}`);
  };

  const handleChangeNavbar = (value: string, param: string, theme: string) => {
    document.getElementById('root')?.classList.add(`theme-${theme}`);
    const app: HTMLElement | null = document.querySelector('.app');
    app?.style.setProperty(param, value);
  };

  const navBarClassName = !collapsed || (hovered && fixedSidebar) ? 'expanded' : 'collapsed';

  const sideBarClassName =
    !collapsed || (getWindowDimensions().width > 767 && hovered && fixedSidebar) ? 'expanded' : 'collapsed';

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='fixed fixed-bottom'>
        {Object.entries(context.notifications).map(([key, value]) => {
          if (value.position === 'fixed-bottom') {
            return (
              <Alert
                notificationKey={key}
                {...value}
                className={classNames('relative', value.className)}
                style={{ zIndex: 1000 }}>
                {value.text}
              </Alert>
            );
          }
          return null;
        })}
      </div>
      <div className='fixed fixed-top'>
        {Object.entries(context.notifications).map(([key, value]) => {
          if (value.position === 'fixed-top') {
            return (
              <Alert
                notificationKey={key}
                {...value}
                className={classNames('relative', value.className)}
                style={{ zIndex: 1000 }}>
                {value.text}
              </Alert>
            );
          }
          return null;
        })}
      </div>
      <NotificationContainer />
      <div
        className={classNames('main-layout', {
          scrolled,
          'on-top': !scrolled,
          'fixed-sidebar': fixedSidebar,
          'fixed-navbar': fixedNavbar,
        })}>
        <NavBar
          handleChangeNavbar={handleChangeNavbar}
          settings={switches}
          handleThemeChange={handleThemeChange}
          palletType={palletType}
          className={classNames(navBarClassName, {
            absolute: !fixedNavbar,
            fixed: fixedNavbar,
          })}
        />
        <Sidebar className={sideBarClassName} />
        <div className='main'>
          {Object.entries(context.notifications).map(([key, value]) => {
            if (value.position === 'top') {
              return (
                <Alert notificationKey={key} {...value} style={{ zIndex: 1000 }}>
                  {value.text}
                </Alert>
              );
            }
            return null;
          })}
          <div className='content'>
            <Switch>
              <ProtectedRoute exact path='/' render={() => <Redirect to='/dashboard' />} />
              <ProtectedRoute path={routes.dashboard.path} component={MainDashboard} />
              <ProtectedRoute path={routes.hello.path} component={MainHello} />
              <ProtectedRoute path={routes.amcharts.path} component={MainAmcharts} />
              <ProtectedRoute path={routes.team.path} component={TeamManagement} />
              <ProtectedRoute path={routes.audits.path} component={AuditsPage} />
              <ProtectedRoute path={routes.sso.path} component={Sso} />
              <ProtectedRoute path={routes.events.path} component={Connectivity} />
              <ProtectedRoute path={routes.webhooks.path} component={Webhooks} />
              <ProtectedRoute path={routes.api.path} component={APIManagement} />
              <ProtectedRoute path={routes.profile.path} component={ProfilePage} />
              <ProtectedRoute path={routes.anomalies.path} component={Anomalies} />
              <ProtectedRoute path={routes.services.path} component={Services} />
              <ProtectedRoute path='/forms/example' component={FormPage} />
              <ProtectedRoute path='/forms/sliders' component={SliderPage} />
              <ProtectedRoute path='/forms/datepickers' component={DatePickerPage} />
              <ProtectedRoute path='/forms/switches' component={SwitchPage} />
              <ProtectedRoute path='/tables/example' component={Table} />
              <ProtectedRoute
                path='/ui-elements'
                render={(props) => (
                  <UIScreenPage>
                    <Switch>
                      <ProtectedRoute path='/ui-elements/alerts' component={Alerts} />
                      <ProtectedRoute path='/ui-elements/badges' component={Badges} />
                      <ProtectedRoute path='/ui-elements/buttons' component={Buttons} />
                      <ProtectedRoute path='/ui-elements/dropdowns' component={Dropdowns} />
                      <ProtectedRoute path='/ui-elements/pagination' component={Paginations} />
                      <ProtectedRoute path='/ui-elements/images' component={Images} />
                      <ProtectedRoute path='/ui-elements/lists' component={Lists} />
                      <ProtectedRoute path='/ui-elements/progress-bar' component={ProgressBars} />
                      <ProtectedRoute path='/ui-elements/notifications' component={Notifications} />
                      <ProtectedRoute path='/ui-elements/tabs' component={Tabs} />
                      <ProtectedRoute path='/ui-elements/typography' component={Typography} />
                      <ProtectedRoute path='/ui-elements/breadcrumbs' component={BreadcrumbsPage} />
                      <Redirect from='*' to='/404' />
                    </Switch>
                  </UIScreenPage>
                )}
              />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
        <input type='checkbox' id='collapsing' className='d-none' onChange={handleCollapse} checked={collapsed} />
        <input type='checkbox' id='fixsidebar' className='d-none' onChange={handleFixSidebar} checked={fixedSidebar} />
        <input type='checkbox' id='fixnavbar' className='d-none' onChange={handlesFixNavbar} checked={fixedNavbar} />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
