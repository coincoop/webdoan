import express from 'express';
import { addCtHoaDon, getProductsDashboard, getTotalRevenue, getTodayRevenue,getCTHDByMahd ,getCthoadonByMakh,getAllCthoadon,delCTHoadon,editCTHoadon,getCTHDByMahdnMasp} from '../controllers/CTHDController.js';

const router = express.Router();
router.post('/cthoadon/:mahd', addCtHoaDon);
router.get('/admin/pro/dashboardpro/ad', getProductsDashboard);
router.get('/admin/pro/totaltoday', getTodayRevenue);
router.get('/admin/pro/totalall', getTotalRevenue);
router.get('/admin/cthoadon',getCTHDByMahd); 
router.get('/admin/cthoadon/:makh', getCthoadonByMakh);
router.get('/admin/cthoadons/all',getAllCthoadon);
router.patch('/admin/cthoadon/:mahd/:masp',editCTHoadon); 
router.delete('/admin/cthoadon/:mahd/:masp',delCTHoadon);
router.get('/admin/cthoadon/:mahd/:masp',getCTHDByMahdnMasp);

export default router