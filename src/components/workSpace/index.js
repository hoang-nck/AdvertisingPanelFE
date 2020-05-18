import _ from 'lodash'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContentLoader from "react-content-loader"
import Select from 'react-select'
import Slider from "react-slick"

import houseCtr from '../../api/controller/house'
import houseAc from '../../actions/house'
import Table from './table'
import Menu from './menu'

import './table.scss'

class WorkSpace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      house: null,
      area: {},
      tables: [],
      settings: {
        dots: true,
        infinite: false,
        speed: 400,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 4000,
            settings: {
              slidesToShow: 9,
              slidesToScroll: 9,
              dots: true
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      }
    }
  }

  slide = y => {
    y > 0 ? (
      !!this.slider && this.slider.slickNext()
    ) : (
        !!this.slider && this.slider.slickPrev()
      )
  }

  gotoItem = n => {

    let at = _.get(this, 'slider.state.breakpoint', -1)
    const total = _.get(this, 'slider.props.children.length', 0)
    const st = _.get(this.state, 'settings.responsive', []).find(i => i.breakpoint == at)
    at = _.get(st, 'settings.slidesToScroll', -1)
    if (at != -1) {
      const to = n - _.toInteger(at / 2)
      total - _.toInteger(at / 2) < to ? this.slider.slickGoTo(total) : this.slider.slickGoTo(to)
    }
  }

  onClickTable = (id, gotoItem = false) => {
    const { tables } = this.state
    for (const item of tables) {
      if (!!item.active) {
        item.active = ''
        break
      }
    }
    let n = 0
    for (const item of tables) {
      if (item._id == id) {
        item.active = 'active'
        break
      }
      n++
    }
    !!id && gotoItem && this.gotoItem(n)
    this.setState({ tables })
  }

  getTables = async (ids, options) => {
    let tables = [1, 1, 1, 1, 1]

    this.setState({ tables })

    const rs = await houseCtr.getTables(ids, options)()
    if (rs.success) {
      tables = rs.data || []
      this.setState({ tables })
    } else {
      tables = [1, 1, 1, 1, 1].map(i => ({ code: rs.message }))
      this.setState({ tables })
      console.log('error: ', rs)
    }
  }

  selectTable = table => this.onClickTable((table || {}).value || '', true)

  selectArea = area => {
    if (area) {
      this.setState({ area: _.get(this.state, 'house.areas', []).find(i => i._id == area.value) })
      this.getTables([_.get(this.state, 'house._id', ''), area.value], { match: { deletedAt: null }, sort: { name: 1 } })
    } else {
      this.setState({ area: {}, tables: [] })
    }
  }

  componentWillMount = async () => {
    const call = await this.props.houseAc.getByUser({ field: { "areas.tables": 0, users: 0 } })
    console.log({ call })
  }

  componentWillReceiveProps = newProps => {
    const { house } = this.state
    const state = {}
    !_.isEqual(house, newProps.houseSt.house) && (state.house = newProps.houseSt.house)
    this.setState(state)
  }

  renderHouse = () => {
    const { house, area, tables } = this.state
    const tableId = _.get((tables || []).find(tb => tb.active), '_id', '')
    if (house == null)
      return (
        <div>
          <ContentLoader width={150} speed={2} primaryColor="#5bcfec8f" secondaryColor="#ecebeb">
            <rect x="0" y="10" rx="5" ry="5" width="100%" height="2" />
            <rect x="0" y="40" rx="5" ry="5" width="100%" height="2" />
          </ContentLoader>
        </div>
      )

    return (
      <div className="clsHouse">
        <strong>{house.name}</strong>
        <Select placeholder="select area..." value={area._id} onChange={this.selectArea} options={house.areas.map(area => ({ value: area._id, label: area.name }))} />
        <Select placeholder="select table..." value={tableId} onChange={this.selectTable} options={tables.map(table => ({ value: table._id, label: table.name }))} />
        <span className="clsBtn" onClick={() => this.getTables([house._id, area._id], { match: { deletedAt: null }, sort: { name: 1 } })}><i className="fas fa-sync-alt" aria-hidden="true"></i></span>
      </div>
    )
  }

  render = () => {
    const { house, area, tables, settings } = this.state

    return (
      <div>
        {this.renderHouse()}
        <div id="divTables">
          <Slider {...settings} ref={slider => this.slider = slider}>
            {tables.map((i, idx) => i == 1 ?
              <ContentLoader key={idx} width={150} speed={2} primaryColor="#5bcfec8f" secondaryColor="#ecebeb">
                <rect x="0" y="10" rx="5" ry="5" width="100%" height="10" />
                <rect x="0" y="40" rx="5" ry="5" width="100%" height="10" />
                <rect x="0" y="70" rx="5" ry="5" width="100%" height="10" />
                <rect x="0" y="100" rx="5" ry="5" width="100%" height="10" />
              </ContentLoader> :
              <div key={idx}>
                <Table {...{ data: i, onClick: this.onClickTable }} />
              </div>
            )}
          </Slider>
        </div>
        <Menu />
      </div>
    )
  }

  componentDidMount = () => {
    document.getElementById("divTables").addEventListener('wheel', (e) => {
      this.slide(e.wheelDelta)
    })
  }

}

const mapStateToProps = (state, ownProps) => ({
  user: state.auth.user,
  houseSt: state.house
})

const mapDispatchToProps = (dispatch) => ({
  houseAc: bindActionCreators(houseAc, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkSpace)
