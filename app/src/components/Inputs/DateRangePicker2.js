import * as React from 'react';
import { DateRange, DateRangePicker, Calendar, DefinedRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import DatePicker from './DatePicker';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    };
  }
  handleSelect = (ranges) => {
    console.log(ranges);

    let selection = {
      startDate: ranges.startDate,
      endDate: ranges.endDate,
      key: 'selection',
    };
    this.setState({ selection: selection });
    this.callbackValueRange(this.props.isEdit ? this.props.dbid : this.props.name, [
      ranges.startDate,
      ranges.endDate,
    ]);
  };
  render() {
    if (this.props.processorDelivery === 'Delivery Period') {
      return (
        <DateRangePicker
          ranges={[this.state.selection]}
          onChange={(item) => this.setState({ selection: item.selection })}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          required={this.props.required}
          months={2}
        />
      );
    } else {
      return (
        <div>
          <DatePicker
            key={'Delivery Date'}
            id={'Delivery Date'}
            callbackValue={this.props.callbackDateChange}
            required={this.props.required}
            label={'Delivery Date'}
            name={'Delievery Date'}
            dbid={'deliveryDate'}
          />
        </div>
      );
    }
  }
}

export default MyComponent;
