import React from 'react'
import ContentLoader from "react-content-loader"

import Texbox from '../common/inputs/textbox'
import Select from 'react-select'
import DatePicker from '../common/date'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value1: "",
      value2: "",
      value3: "",
      time: null,
      select: ""
    }
  }

  select = value => this.setState({ select: value })

  render = () => {
    const bool = true
    const style = {
      styleP: { width: "100px" }
    }
    return (
      <div>

        <h1>{this.props.logged ? this.props.user.name : "Welcome"}</h1>
        <DatePicker config={{ lr: "clsLeft", time: this.state.time, dateFormat: ['YYYY', 'MM', 'DD'], showFormat: "YYYY/MM/DD", selectTime: this.selectTime }} />
        <Texbox title="Year" style={style} name="value1" type="text" value={this.state.value1} events={{ onChange: this.changeInput }} />
        <Texbox title="Month" style={style} name="value2" type="number" value={this.state.value2} events={{ onChange: this.changeInput }} />
        <Texbox title="Day" style={style} name="value3" type="text" value={this.state.value3} events={{ onChange: this.changeInput }} />

        <span className="clsBtn">Close <i className="fa fa-reply-all" aria-hidden="true"></i></span> &nbsp;
                <strong style={{ color: '#066ef6' }} className="clsBtn">Enter <i className="far fa-paper-plane" aria-hidden="true"></i></strong>

        <DatePicker config={{ lr: "clsLeft", time: this.state.time, dateFormat: ['YYYY', 'MM', 'DD'], showFormat: "YYYY/MM/DD", selectTime: this.selectTime }} />
        <DatePicker config={{ lr: "clsRight", time: this.state.time, dateFormat: ['YYYY', 'MM', 'DD'], showFormat: "YYYY/MM/DD", selectTime: this.selectTime }} />
        <DatePicker config={{ lr: "clsRight", time: this.state.time, dateFormat: ['YYYY', 'MM', 'DD', 'hh', 'mm'], showFormat: "YYYY/MM/DD hh:mm", selectTime: this.selectTime }} /><strong style={{ color: '#066ef6' }} className="clsBtn">Enter <i className="far fa-paper-plane" aria-hidden="true"></i></strong><br />
        <DatePicker config={{ lr: "clsLeft", time: this.state.time, dateFormat: ['YYYY', 'MM', 'DD', 'hh', 'mm'], showFormat: "YYYY/MM/DD hh:mm", selectTime: this.selectTime }} />
        <Select
          name="form-field-name"
          value={this.state.select}
          onChange={this.select}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />

        {bool && <ContentLoader height={160} width={400} speed={2} primaryColor="#5bcfec8f" secondaryColor="#ecebeb">
          <rect x="0" y="5" rx="5" ry="5" width="100%" height="5" />
          <rect x="0" y="15" rx="5" ry="5" width="100%" height="5" />
          <rect x="0" y="25" rx="5" ry="5" width="100%" height="5" />
          <rect x="0" y="35" rx="5" ry="5" width="100%" height="5" />
        </ContentLoader>}

        <p>
          Removed $badge-color variable and its usage on .badge. We use a color contrast function to pick a color based on the background-color, so the variable is unnecessary.
  Renamed grayscale() function to gray() to avoid breaking conflict with the CSS native grayscale filter.
  Renamed .table-inverse, .thead-inverse, and .thead-default to .*-dark and .*-light, matching our color schemes used elsewhere.
  Responsive tables now generate classes for each grid breakpoint. This breaks from Beta 1 in that the .table-responsive you’ve been using is more like .table-responsive-md. You may now use .table-responsive or .table-responsive
  Dropped Bower support as the package manager has been deprecated for alternatives (e.g., Yarn or npm). See bower/bower#2298 for details.
  Bootstrap still requires jQuery 1.9.1 or higher, but you’re advised to use version 3.x since v3.x’s supported browsers are the ones Bootstrap supports plus v3.x has some security fixes.
  Removed the unused .form-control-label class. If you did make use of this class, it was duplicate of the .col-form-label class that vertically centered a  with it’s associated input in horizontal form layouts.
  Changed the color-yiq from a mixin that included the color property to a function that returns a value, allowing you to use it for any CSS property. For example, instead of color-yiq(#000), you’d write color: color-yiq(#000);.
  Highlights
  Introduced new pointer-events usage on modals. The outer .modal-dialog passes through events with pointer-events: none for custom click handling (making it possible to just listen on the .modal-backdrop for any clicks), and then counteracts it for the actual .modal-content with pointer-events: auto.
          </p>

      </div>
    )
  }
}

export default Home
