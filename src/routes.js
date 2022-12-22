import React from 'react'

const BodegasGrid = React.lazy(() => import('./components/References/Bodegas'))
const CarrierAliases = React.lazy(() => import('./components/Naves/CarrierAliases'))
const ChecklistContainer = React.lazy(() => import('./containers/Checklist'))
const ChecklistLogGrid = React.lazy(() => import('./components/Checklist/ChecklistLog'))
const CheckListRecepcionBodega = React.lazy(() => import('./components/Reportes/CheckListRecepcionBodega'))
const CondicionesGrid = React.lazy(() => import('./components/References/Condiciones'))
const ContenedoresMaster = React.lazy(() => import('./containers/Contenedores/Master'))
const ContenedoresStatusGrid = React.lazy(() => import('./components/Contenedores/contenedoresStatus'))
const ControlDesviaciones = React.lazy(() => import('./components/Reportes/ControlDesviaciones'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DefectosGrid = React.lazy(() => import('./components/References/Defectos'))
const DespachosDetails = React.lazy(() => import('./containers/Despachos/Details'))
const DespachosMaster = React.lazy(() => import('./containers/Despachos/Master'))
const Embarques = React.lazy(() => import('./components/Naves/Embarques/index'))
const EnvasesGrid = React.lazy(() => import('./components/References/Envases'))
const Home = React.lazy(() => import('./components/Home/Home'))
const ImportEmbarques = React.lazy(() => import('./components/Naves/Embarques/import'))
const ImportLitio = React.lazy(() => import('./components/Naves/Litio/import'))
const ImportYodo = React.lazy(() => import('./components/Naves/Yodo/import'))
const Litio = React.lazy(() => import('./components/Naves/Litio/index'))
const LocalizacionesGrid = React.lazy(() => import('./components/References/Localizaciones'))
const LockUnlockContainer = React.lazy(() => import('./containers/LockUnlock'))
const LotesDespachoDetails = React.lazy(() => import('./containers/LotesDespacho/Details'))
const LotesDespachoMaster = React.lazy(() => import('./containers/LotesDespacho/Master'))
const LugarRevisionesGrid = React.lazy(() => import('./components/Contenedores/lugarRevisiones'))
const OceanInsight = React.lazy(() => import('./components/Naves/OceanInsight/index'))
const PalletsCantidades = React.lazy(() => import('./components/Despachos/palletCantidades'))
const PAPerfil = React.lazy(() => import('./components/References/PersonalApoyoPerfil'))
const PAPerfilLocalizacion = React.lazy(() => import('./components/References/PersonalApoyoPerfilLocalizaciones'))
const PersonalApoyo = React.lazy(() => import('./components/References/PersonalApoyo'))
const PosicionesBodegaGrid = React.lazy(() => import('./components/References/PosicionesBodega'))
const ProductosGrid = React.lazy(() => import('./components/References/Productos'))
const ReferencesContainer = React.lazy(() => import('./containers/References'))
const ReporteContenedores = React.lazy(() => import('./components/Reportes/Contenedores'))
const ReporteDespacho = React.lazy(() => import('./components/Reportes/Despacho'))
const ReporteLotesDespacho = React.lazy(() => import('./components/Reportes/LotesDespacho'))
const ShowMenu = React.lazy(() => import('./components/Profile/ShowMenu'))
const ShowProfile = React.lazy(() => import('./components/Profile/ShowProfile'))
const ShowUser = React.lazy(() => import('./components/Profile/ShowUser'))
const Support = React.lazy(() => import('./components/Home/Support'))
const TipoContenedoresGrid = React.lazy(() => import('./components/Contenedores/tipoContenedores'))
const TipoMaxi = React.lazy(() => import('./components/Despachos/tipoMaxi'))
const TipoPallets = React.lazy(() => import('./components/Despachos/tipoPallets'))
const TransportistasGrid = React.lazy(() => import('./components/Contenedores/transportistas'))
const Yodo = React.lazy(() => import('./components/Naves/Yodo/index'))
const ControlDescarga = React.lazy(() => import('./components/ControlDescarga/index'))

const routes = [
  { code: 0, path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { code: 60002, path: '/home/LockUnlock', exact: true, name: 'Lock/Unlock', element: LockUnlockContainer },
  { code: 60003, path: '/home/referencias', exact: true, name: 'References', element: ReferencesContainer },
  { code: 60006, path: '/home/referencias/productos', exact: true, name: 'Locations', element: ProductosGrid },
  { code: 60007, path: '/home/referencias/defectos', exact: true, name: 'Products', element: DefectosGrid },
  { code: 60008, path: '/home/referencias/condiciones', exact: true, name: 'Cellars', element: CondicionesGrid },
  { code: 60009, path: '/home/referencias/envases', exact: true, name: 'Defects', element: EnvasesGrid },
  { code: 60010, path: '/home/referencias/posicionesbodega', exact: true, name: 'Conditions', element: PosicionesBodegaGrid },
  { code: 60011, path: '/profile/ShowUser', exact: true, name: 'Users', element: ShowUser },
  { code: 60012, path: '/profile/ShowMenu', exact: true, name: 'Menu', element: ShowMenu },
  { code: 60013, path: '/profile/ShowProfile', exact: true, name: 'Profiles', element: ShowProfile },
  { code: 60014, path: '/home/checklist', exact: true, name: 'CheckList', element: ChecklistContainer },
  { code: 60015, path: '/home/checklist/checklistlog', exact: true, name: 'ChecklistLog', element: ChecklistLogGrid },
  { code: 60016, path: '/home/referencias/localizaciones', exact: true, name: 'Containers', element: LocalizacionesGrid },
  { code: 60018, path: '/home/reportes/controldesviaciones', exact: true, name: 'Deviations Control', element: ControlDesviaciones },
  { code: 60019, path: '/home/reportes/checkListrecepcionbodega', exact: true, name: 'Cellar Reception CheckList', element: CheckListRecepcionBodega },
  { code: 60019, path: '/home/reportes/contenedores', exact: true, name: 'Contenedores', element: ReporteContenedores },
  { code: 60019, path: '/home/reportes/despachos', exact: true, name: 'Despachos', element: ReporteDespacho },
  { code: 60019, path: '/home/reportes/lotesdespacho', exact: true, name: 'Lotes Despachos', element: ReporteLotesDespacho },
  { code: 60022, path: '/home/referencias/bodegas', exact: true, name: 'Cellar Positions', element: BodegasGrid },
  { code: 60024, path: '/home/naves/embarques', exact: true, name: 'Shippings', element: Embarques },
  { code: 60025, path: '/home/naves/embarques/import', exact: true, name: 'Imports', element: ImportEmbarques },
  { code: 60026, path: '/home/naves/litio', exact: true, name: 'Lithium', element: Litio },
  { code: 60027, path: '/home/naves/litio/import', exact: true, name: 'Import Lithium', element: ImportLitio },
  { code: 60028, path: '/home/naves/yodo', exact: true, name: 'Iodine', element: Yodo },
  { code: 60029, path: '/home/naves/yodo/import', exact: true, name: 'Import Iodine', element: ImportYodo },
  { code: 60032, path: '/home/naves/oceaninsight', exact: true, name: 'Ocean Insight', element: OceanInsight },
  { code: 60033, path: '/home/naves/carrieraliases', exact: true, name: 'Carrier Alias', element: CarrierAliases },
  { code: 60034, path: '/home/lotesdespacho', exact: true, name: 'Lotes Despacho' },
  { code: 60036, path: '/home/lotesdespacho/master', exact: true, name: 'Lock/Unlock', element: LotesDespachoMaster },
  { code: 60040, path: '/home/lotesdespacho/details', exact: true, name: 'CheckList', element: LotesDespachoDetails },
  { code: 60043, path: '/home/contenedores', exact: true, name: 'Contenedores' },
  { code: 60044, path: '/home/contenedores/master', exact: true, name: 'Lock/Unlock', element: ContenedoresMaster },
  { code: 60045, path: '/home/contenedores/transportistas', exact: true, name: 'Transportistas', element: TransportistasGrid },
  { code: 60046, path: '/home/contenedores/tipoContenedores', exact: true, name: 'Tipo Contenedores', element: TipoContenedoresGrid },
  { code: 60047, path: '/home/contenedores/contenedoresStatus', exact: true, name: 'Contenedores Status', element: ContenedoresStatusGrid },
  { code: 60048, path: '/home/contenedores/lugarRevisiones', exact: true, name: 'Lugar Revisiones', element: LugarRevisionesGrid },
  { code: 60049, path: '/home/despachos', exact: true, name: 'Despachos' },
  { code: 60050, path: '/home/despachos/master', exact: true, name: 'Lock/Unlock', element: DespachosMaster },
  { code: 60054, path: '/home/despachos/palletscantidades', exact: true, name: 'Pallets Cantidades', element: PalletsCantidades },
  { code: 60055, path: '/home/despachos/tipomaxi', exact: true, name: 'Tipo Maxi', element: TipoMaxi },
  { code: 60056, path: '/home/despachos/tipopallets', exact: true, name: 'Tipo Pallets', element: TipoPallets },
  { code: 60057, path: '/home/referencias/personalapoyo', exact: true, name: 'Personal Apoyo', element: PersonalApoyo },
  { code: 60058, path: '/home/referencias/personalapoyoperfil', exact: true, name: 'P.A. Perfiles', element: PAPerfil },
  { code: 60059, path: '/home/referencias/personalapoyoperfillocalizaciones', exact: true, name: 'P.A. Perfil-Localización', element: PAPerfilLocalizacion },
  { code: 60060, path: '/home/despachos/details', exact: true, name: 'Checklist', element: DespachosDetails },
  { code: 60061, path: '/home/controldescarga', exact: true, name: 'Control Descarga' },
  { code: 60062, path: '/home/controldescarga/master', exact: true, name: 'Checklist', element: ControlDescarga },
  { code: 60100, path: '/home/support', exact: true, name: 'Soporte', element: Support },
  { code: 60023, path: '/', exact: true, name: 'Inicio', element: Home },
]

export default routes
