import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from '@material-ui/icons/Edit';
import {
  TOP_NAVIGATION_ROUTES,
  MID_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
  CLIENT_TABLE_COLUMNS,
  CONTRACTOR_TABLE_COLUMNS,
  ARTICLE_TABLE_COLUMNS,
  PERSON_TABLE_COLUMNS,
  ORDER_TABLE_COLUMNS,
  BANK_TABLE_COLUMNS,
  GROUP_TABLE_COLUMNS,
  HOLIDAY_TABLE_COLUMNS,
  COMPANY_TABLE_COLUMNS,
  TOURS_TABLE_COLUMNS,
} from '../../constants/ui-constants';
import EditTable from '../../components/data-tables/edit-table';
import { FaHandHoldingUsd, FaFileInvoiceDollar, ShieldCheck } from 'react-icons/fa';
import { FiTruck, FiHelpCircle } from 'react-icons/fi';
import { BsPerson, BsBuilding } from 'react-icons/bs';
import { RiRoadMapLine, RiMoneyPoundBoxLine, RiPinDistanceLine } from 'react-icons/ri';
import { GiReceiveMoney, GiPathDistance } from 'react-icons/gi';
import { MdLibraryBooks, MdPerson, MdPlaylistAddCheck, MdDesktopWindows } from 'react-icons/md';
import { GrSystem } from 'react-icons/gr';
import LanguageSelectBox from '../language-box/languageSelectBox';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  imageIcon: {
    height: '100%',
  },
  iconRoot: {
    textAlign: 'center',
  },
}));

export default function MiniDrawer(props) {

  console.log("opening minidrawer here is ",props)
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentMenu, setMenu] = React.useState('');
  const [t] = useTranslation('common');

  const renderIcons = (text) => {
    if (text === 'PARTNER' || text === 'CLIENTS' || text === 'AUFTRAGGEBER') {
      return <FaHandHoldingUsd size={26} />;
    } else if (text === 'CARRIERS' || text === 'CONTRACTORS' || text === 'LEISTUNGSPARTNER') {
      return <FiTruck size={26} />;
    } else if (text === 'ARTICLES' || text === 'ARTIKEL') {
      return <EditIcon size={26} />;
    } else if (text === 'PERSON' || text === 'PERSONEN') {
      return <BsPerson size={26} />;
    } else if (text === 'ORDERS' || text === 'AUFTRAGE') {
      return <GiPathDistance size={26} />;
    } else if (text === 'BILL RUN' || text === 'RECHNUNGSLAUF') {
      return <RiMoneyPoundBoxLine size={26} />;
    } else if (text === 'PAYMENT RUN' || text === 'ZAHLUNGSLAUF') {
      return <GiReceiveMoney size={26} />;
    } else if (text === 'ACCOUNT BOOKS' || text === 'RECHNUNGSBUCH') {
      return <MdLibraryBooks size={26} />;
    } else if (text === 'COMPLETED ORDERS') {
      return <FaFileInvoiceDollar size={26} />;
    } else if (text === 'ENTER INVOICES' || text === 'RECHNUNGEN VERBUCHEN') {
      return <DescriptionIcon size={26} />;
    } else if (text === 'SYSTEM' || text === 'SYSTEM') {
      return <MdDesktopWindows size={26} />;
    } else if (text === 'COMPANIES' || text === 'FIRMEN') {
      return <BsBuilding size={26} />;
    } else if (text === 'USER MANAGEMENT' || text === 'NUTZER MANAGEMENT') {
      return <MdPerson size={26} />;
    } else if (text === 'MAPS' || text === 'KARTE') {
      return <RiRoadMapLine size={26} />;
    } else if (text === 'TOURS' || text === 'TOUREN') {
      return <RiPinDistanceLine size={26} />;
    } else {
      return <FiHelpCircle size={26} />;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSetMenu = (text) => {

    if (props.currentAction =="EDIT") {
      var txt;
      var r = confirm(t("doggy"));
      if (r == true) {
      txt = "You pressed OK!";
      } else {
      return;
      }
  }

    console.log('SET' + text);
    if (text == TOP_NAVIGATION_ROUTES[0]) {
      let columns = CLIENT_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == TOP_NAVIGATION_ROUTES[1]) {
      // let columns = CARRIER_TABLE_COLUMNS;
      let columns = CONTRACTOR_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == TOP_NAVIGATION_ROUTES[2]) {
      let columns = ARTICLE_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == TOP_NAVIGATION_ROUTES[3]) {
      let columns = PERSON_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == TOP_NAVIGATION_ROUTES[4]) {
      let columns = ORDER_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == SYSTEM_NAVIGATION_ROUTES[0]) {
      let columns = BANK_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == SYSTEM_NAVIGATION_ROUTES[1]) {
      let columns = GROUP_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == SYSTEM_NAVIGATION_ROUTES[3]) {
      let columns = HOLIDAY_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == BOTTOM_NAVIGATION_ROUTES[1]) {
      let columns = COMPANY_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == BOTTOM_NAVIGATION_ROUTES[4]) {
      let columns = TOURS_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else if (text == MID_NAVIGATION_ROUTES[0]) {
      let columns = COMPANY_TABLE_COLUMNS;
      props.parentCallback(text, columns);
      setMenu(text);
    } else {
      //alert(text);
      props.parentCallback(text, [{ title: 'BOB' }]);
      setMenu(text);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {t(props.currentTab)}
          </Typography>
          <LanguageSelectBox />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className={'uppercase-span'}>
          {TOP_NAVIGATION_ROUTES.map((text, index) => (
            <ListItem button key={index} onClick={() => handleSetMenu(text)}>
              <ListItemIcon>{renderIcons(text)}</ListItemIcon>
              <ListItemText primary={t(text)} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className={'uppercase-span'}>
          {MID_NAVIGATION_ROUTES.map((text, index) => (
            <ListItem button key={index} onClick={() => handleSetMenu(text)}>
              <ListItemIcon>{renderIcons(text)}</ListItemIcon>
              <ListItemText primary={t(text)} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className={'uppercase-span'}>
          {BOTTOM_NAVIGATION_ROUTES.map((text, index) => (
            <ListItem button key={index} onClick={() => handleSetMenu(text)}>
              <ListItemIcon>{renderIcons(text)}</ListItemIcon>
              <ListItemText primary={t(text)} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
