import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
  TOP_NAVIGATION_ROUTES,
  ORDER_MENU_TABS,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
  CONTRACTOR_ADD_MENU_TABS,
  CONTRACTOR_EDIT_MENU_TABS,
} from '../../constants/ui-constants';
import zIndex from '@material-ui/core/styles/zIndex';
import { withTranslation } from 'react-i18next';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

const CustomizedTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [label, setLabel] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLabel(label);
    props.parentCallback(newValue);
  };

  if (props.currentTab == TOP_NAVIGATION_ROUTES[4]) {
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            {ORDER_MENU_TABS.map((label, index) => (
              <AntTab key={index} label={props.t(label)} />
            ))}
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  }
  if (props.currentTab == TOP_NAVIGATION_ROUTES[1]) {
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            {(props.isEdit ? CONTRACTOR_EDIT_MENU_TABS : CONTRACTOR_ADD_MENU_TABS).map(
              (name, index) => {
                return <AntTab key={index} label={props.t(name)} />;
              },
            )}
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  } else if (props.currentTab == TOP_NAVIGATION_ROUTES[0]) {
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label={props.t('Overview')} />
            <AntTab label={props.t('Order')} />
            <AntTab label={props.t('Special Order')} />
            <AntTab label={props.t('Contact Person')} />
            <AntTab label={props.t('Fuel Price')} />
            <AntTab label={props.t('Comments')} />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  } else if (props.currentTab == TOP_NAVIGATION_ROUTES[2]) {
    //alert(props.currentTab);
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label={props.t('Overview')} />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  } else if (props.currentTab == TOP_NAVIGATION_ROUTES[3]) {
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label={props.t('Overview')} />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  } else if (props.currentTab == BOTTOM_NAVIGATION_ROUTES[0]) {
    //  alert('GOD MODE');
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            {SYSTEM_NAVIGATION_ROUTES.map((name) => (
              <AntTab label={props.t(name)} />
            ))}
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  } else if (props.currentTab == BOTTOM_NAVIGATION_ROUTES[4]) {
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label={props.t('Overview')} />
            {/*<AntTab label={props.t("Order")} />*/}
            {/*<AntTab label={props.t("Special Order")} />*/}
            {/*<AntTab label={props.t("Contact Person")} />*/}
            {/*<AntTab label={props.t("Fuel Price")} />*/}
            {/*<AntTab label={props.t("Comments")} />*/}
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  } else {
    //  alert(props.currentTab);
    return (
      <div className={classes.root}>
        <div className={classes.demo1}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
            <AntTab label={props.t('Check toptab.js dude')} />
            <AntTab label={props.t('History')} />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
    );
  }
};

export default withTranslation('common')(CustomizedTabs);
