import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import { withTranslation } from 'react-i18next';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SelectOrderTabs = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={props.t('Select Orders')} {...a11yProps(0)} />
        <Tab label={props.t('Selected Orders')} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} />
      <TabPanel value={value} index={1} />
    </div>
  );
};

export default withTranslation('common')(SelectOrderTabs);
