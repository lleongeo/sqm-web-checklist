import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import PropTypes from 'prop-types'
import logo from 'src/assets/brand/logo.png'

const AppSidebar = ({ items }) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.base.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.base.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/" style={{ backgroundColor: '#fff' }}>
        <div className="sidebar-brand-full" height={55}>
          <img src={logo} alt="SQM" height="55" />
        </div>
        <div className="sidebar-brand-narrow" height={55}>
          <img src={logo} alt="SQM" height="55" />
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={items} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

AppSidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default React.memo(AppSidebar)
