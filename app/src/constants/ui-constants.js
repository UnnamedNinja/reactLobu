export const mobileBreakpoint = 766;

export const TOP_NAVIGATION_ROUTES = ['CLIENTS', 'CONTRACTORS', 'ARTICLES', 'PERSON', 'ORDERS'];
export const BOTTOM_NAVIGATION_ROUTES = ['SYSTEM', 'COMPANIES', 'USER MANAGEMENT', 'MAPS', 'TOURS'];
export const MID_NAVIGATION_ROUTES = ['BILL RUN'];

export const CONTRACTOR_ADD_MENU_TABS = [
  'Overview',
  'Order',
  'Special Order',
  'Contact Person',
  'Fuel Price',
  'Comments',
];

export const CONTRACTOR_EDIT_MENU_TABS = [
  'Overview',
  'Order',
  'Fuel Price',
  'Special Order',
  'Invoices',
  'Contact Person',
  'Comments',
  'History',
];

export const CLIENT_ADD_MENU_TABS = [
  'Overview',
  'Order',
  'Special Order',
  'Contact Person',
  'Fuel Price',
  'Comments',
];

export const CLIENT_EDIT_MENU_TABS = [
  'Overview',
  'Order',
  'Special Order',
  'Invoices',
  'Contact Person',
  'Fuel Price',
  'Comments',
  'History',
];

export const EDIT_MENU_TABS = [
  'Overview',
  'Orders',
  'Special Orders',
  'Invoices',
  'Contact Person',
  'Fuel Price',
  'Comments',
  'History',
  'Position',
  'Fuel Price Carrier',
  'Price Corridor',
];

export const SYSTEM_NAVIGATION_ROUTES = ['Banks', 'Client Groups', 'Fuel table', 'Holidays'];

export const CLIENT_NAVIGATION_ROUTES = [
  'Overview',
  'Order',
  'Special Order',
  'Contact Person',
  'Fuel Price',
  'Comments',
  'History',
];

export const ORDER_MENU_TABS = [
  'Order Details',
  'Fuel price contractor',
  'Price corridor',
  'Comments',
  // 'History, // eventually (on all edits except article edit)
];

export const ARTICLE_ITEM_TYPE_MENU_CHOICES = ['Waste', 'Services', 'Product'];

export const CLIENT_TABLE_COLUMNS = [
  { title: 'Group', field: 'group' },
  { title: 'Client-No', field: 'clientNumber' },
  { title: 'Name1', field: 'Name1' },
  { title: 'Name2', field: 'Name2' },
  { title: 'Address', field: 'street' },
  { title: 'Last Billed', field: 'lastBilled' },
  { title: 'Account Manager Name', field: 'accountManagerName' },
];

export const SPECIAL_ORDERS_TABLE_COLUMNS = [
  { title: 'Company', field: 'company' },
  { title: 'Order number', field: 'orderNumber' },
  { title: 'Order Name', field: 'orderName' },
  { title: 'Client No', field: 'clientNumber' },
  { title: 'Client Name', field: 'clientName' },
  { title: 'Client City', field: 'clientCity' },
  { title: 'Contractor Number', field: 'contractorNumber' },
  { title: 'Contractor name', field: 'contractorName' },
  { title: 'Contractor price', field: 'contractorPrice' },
  { title: 'Client price', field: 'clientPrice' },
  { title: 'Manager', field: 'manager' },
];

export const PRICE_HISTORY_COLUMNS = [
  { title: 'Contractor', field: 'contractor' },
  { title: 'Valid From', field: 'validFrom' },
  { title: 'Valid To', field: 'validTo' },
];

// export const CARRIER_TABLE_COLUMNS = [
//   { title: 'Carrier Number', field: 'carrierNumber' },
//   { title: 'Name1', field: 'name1' },
//   { title: 'Name2', field: 'name2' },
//   { title: 'City', field: 'street' },
// ];

export const CONTRACTOR_TABLE_COLUMNS = [
  { title: 'Contractor Number', field: 'contractorNumber' },
  { title: 'Name1', field: 'name1' },
  { title: 'Name2', field: 'name2' },
  { title: 'City', field: 'city' },
];

export const HOLIDAY_TABLE_COLUMNS = [
  { title: 'Date', field: 'holidayDate' },
  { title: 'Description', field: 'description' },
];

export const ARTICLE_TABLE_COLUMNS = [
  { title: 'Article number', field: 'articleNumber' },
  { title: 'Description', field: 'description' },
  { title: 'Client price', field: 'clientPrice' },
  { title: 'Contractor price', field: 'contractorPrice' },
];

export const PERSON_TABLE_COLUMNS = [
  { title: 'Salutation', field: 'salutation' },
  { title: 'First Name', field: 'firstName' },
  { title: 'Surname', field: 'surname' },
  { title: 'Phone', field: 'mobileNumber' },
  { title: 'E-mail', field: 'email' },
];

export const CONTACT_PERSON_TABLE_COLUMNS = [
  { title: 'Salutation', field: 'salutation' },
  { title: 'First Name', field: 'firstName' },
  { title: 'Surname', field: 'surname' },
];

export const ORDER_TABLE_COLUMNS = [
  { title: 'Company', field: 'company' },
  { title: 'Order number', field: 'orderNumber' },
  { title: 'Description', field: 'orderName' },
  { title: 'Valid from', field: 'validFrom' },
  { title: 'Date of Expiry', field: 'dateOfExpiry' },
  { title: 'Client-No', field: 'clientNumber' },
  { title: 'Client name', field: 'client' },
  { title: 'Client city', field: 'city' },
  { title: 'Contractor number', field: 'contractorNumber' },
  { title: 'Contractor name', field: 'contractor' },
  { title: 'Contractor price', field: 'contractorPrice' },
  { title: 'Client price', field: 'clientPrice' },
  { title: 'Manager', field: 'accountManagerName' },
];

export const BANK_TABLE_COLUMNS = [
  { title: 'Company Code', field: 'companyCode' },
  { title: 'Bank Number', field: 'bankNumber' },
  { title: 'Bank Name', field: 'bankName' },
  { title: 'Account Number', field: 'accountNumber' },
  { title: 'Bank Code', field: 'bankCode' },
  { title: 'IBAN', field: 'iban' },
  { title: 'BIC', field: 'bic' },
];

export const COMPANY_TABLE_COLUMNS = [
  { title: 'Company Number', field: 'companyNumber' },
  { title: 'Company Code', field: 'companyCode' },
  { title: 'Name1', field: 'name1' },
  { title: 'Name2', field: 'name2' },
  { title: 'Country', field: 'country' },
  { title: 'City', field: 'city' },
  { title: 'Street', field: 'street' },
];

export const GROUP_TABLE_COLUMNS = [
  { title: 'Number', field: 'groupNumber' },
  { title: 'Name', field: 'groupName' },
  { title: 'Company', field: 'company' },
];

export const USER_TABLE_COLUMNS = [
  { title: 'User Id', field: 'id' },
  { title: 'User Name', field: 'firstName' },
  { title: 'Email', field: 'email' },
];

export const TOURS_TABLE_COLUMNS = [
  { title: 'Number', field: 'tourNumber' },
  { title: 'Name', field: 'tourName' },
  { title: 'Stops', field: 'tourStopName' },
  { title: 'Start date', field: 'tourStartDate' },
  { title: 'End date', field: 'tourEndDate' },
];

export const ORDER_TABS_SELECT = [
  { title: 'Tour description', field: 'tourDesc' },
  { title: 'Week days', field: 'weekDays' },
  { title: 'Prices', field: 'priceBasis' },
];

export const ORDER_TABS_SELECTED = [
  { title: 'Tour name', field: 'tourNane' },
  { title: 'Week', field: 'week' },
  { title: 'Prices', field: 'priceBasis' },
];

export default {
  TOP_NAVIGATION_ROUTES,
  BOTTOM_NAVIGATION_ROUTES,
  SYSTEM_NAVIGATION_ROUTES,
  CLIENT_TABLE_COLUMNS,
  ARTICLE_TABLE_COLUMNS,
  PERSON_TABLE_COLUMNS,
  ORDER_TABLE_COLUMNS,
  BANK_TABLE_COLUMNS,
  GROUP_TABLE_COLUMNS,
  COMPANY_TABLE_COLUMNS,
  TOURS_TABLE_COLUMNS,
  SPECIAL_ORDERS_TABLE_COLUMNS,
  ORDER_TABS_SELECT,
  ORDER_TABS_SELECTED,
  USER_TABLE_COLUMNS
};
