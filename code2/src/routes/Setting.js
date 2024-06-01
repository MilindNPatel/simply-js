import express from 'express';

import { settingController } from '../controllers';
import { ROUTER_LINKS } from '../config';

export default express
    .Router()
    .post(ROUTER_LINKS.SETTING.GET_SETTINGS, settingController.getSetting)
    .post(ROUTER_LINKS.SETTING.ADD_SETTINGS, settingController.addSetting);
