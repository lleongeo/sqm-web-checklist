import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilAccountLogout, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useMsal } from '@azure/msal-react'
import languageConfig from 'src/config/languageConfig';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from 'src/redux/actions/ux/uxActions';
import Swal from 'sweetalert2'

const AppHeaderDropdown = () => {
  var dispatch = useDispatch()
  const { instance, accounts } = useMsal()
  const lang = useSelector(state => state.ux.language)
  const localLanguage = localStorage.getItem("language") === null ? "ES" : localStorage.getItem("language");

  const handleLogout = async () => {
    await instance
      .logoutRedirect({ account: accounts[0] })
      .catch((err) => console.log({ err }))
  }

  const toggleLanguage = (selected) => {
    Swal.fire({
      title: languageConfig[localLanguage].reload.title,
      text: languageConfig[localLanguage].reload.description,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#80BC00',
      cancelButtonColor: '#c1c1c1',
      confirmButtonText: languageConfig[localLanguage].defaultConfirmContinue,
      cancelButtonText: languageConfig[localLanguage].defaultConfirmCancel,
    }).then((result) => {
      if (result.value) {
        dispatch(setLanguage(selected));
        localStorage.setItem("language", selected);
        window.location.reload();
      }
    })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {accounts[0].name} <CIcon icon={cilUser} className="me-2" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          {accounts[0].username}
        </CDropdownHeader>
        <CDropdownItem onClick={() => toggleLanguage(lang === "ES" ? "EN" : "ES")} style={{ cursor: 'pointer' }}>
          <i className="fal fa-language"></i>
          {" "}
          {languageConfig[lang].userMenuLanguage}
          {" "}
          <CBadge className="float-right ms-auto" color="primary">{lang}</CBadge>
        </CDropdownItem>
        <Link to="/home/support" style={{ textDecoration: 'none' }}>
          <CDropdownItem>
            <i className="fal fa-support"></i>
            {" "}
            {languageConfig[lang].menuSupport}
          </CDropdownItem>
        </Link>
        <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          {" "}
          {languageConfig[lang].userMenuLogout}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
