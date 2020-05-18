import _ from 'lodash'
import React from 'react'

import './menu.scss'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shFood: false,
      shMenu: false
    }
  }

  showHide = name => this.setState({ [name]: !this.state[name] })

  componentWillMount = async () => {

  }

  componentWillReceiveProps = newProps => {

  }

  render = () => {
    const { shFood, shMenu } = this.state

    return (
      <div className="tableMenu row">
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <span onClick={() => this.showHide('shMenu')} className="clsBtn" data-toggle="collapse" href="#divMenu" role="button" aria-expanded="true" aria-controls="collapseExample">
            <i className={`far fa-eye${shMenu ? '' : '-slash'}`} aria-hidden="true"></i>
          </span>
          <div className="collapse show" id="divMenu">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <span onClick={() => this.showHide('shFood')} className="clsBtn" data-toggle="collapse" href="#divFood" role="button" aria-expanded="true" aria-controls="collapseExample">
            <i className={`far fa-eye${shFood ? '' : '-slash'}`} aria-hidden="true"></i>
          </span>
          <div className="collapse show" id="divFood">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
        </div>
      </div>
    )
  }
}

export default Menu
