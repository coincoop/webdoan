import { addHoadon,deleteHoadon,getHoadonToday, getHoadonAll,getAllHoadon,editHoadon ,getHoadonBymahd,delHoadon} from "../controllers/ReceiptController.js";
import express from 'express';

const router = express.Router();

router.get('/admin/counthoadon/hd',getHoadonAll);
router.get('/admin/counthoadontoday/hdtoday',getHoadonToday);
router.post('/hoadon/:makh',addHoadon);
router.delete('/hoadon/:mahd',deleteHoadon);
router.get('/admin/hoadon',getAllHoadon);
router.patch('/admin/hoadon/:mahd',editHoadon);
router.get('/admin/hoadon/:mahd',getHoadonBymahd);
router.delete('/admin/hoadon/:mahd',delHoadon);
export default router;
