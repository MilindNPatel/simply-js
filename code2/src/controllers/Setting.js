import { settingModel } from '../models';

const addSetting = async (req, res) => {
    try {
        const { body } = req;
        const data = await new settingModel(body);
        const addSetting = await data.save();
        res.status(200).json({
            success: true,
            message: 'Successfully Add/Update',
            data: addSetting,
        });
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message,
        });
    }
};

const getSetting = async (req, res) => {
    try {
        const { body } = req;
        const filter = {
            ...body,
        };
        const getSetting = await settingModel.find(filter);
        if (!getSetting) throw new Error('No Data Found');
        res.status(200).json({
            success: true,
            length: getSetting.length,
            data: getSetting,
        });
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message,
        });
    }
};

export default {
    addSetting,
    getSetting,
};
