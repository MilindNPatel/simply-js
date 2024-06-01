import { Schema, model } from 'mongoose';

const SettingSchema = new Schema(
    {
        apps: [
            {
                appName: { type: String, required: true },
                appCode: { type: Number, required: true },
                appVersion: { type: String, required: true },
                appPlatform: [
                    {
                        type: String,
                        enum: ['android', 'windows'],
                        required: true,
                    },
                ],
            },
        ],
        messages: {
            broadcast: { type: String },
            hold: { type: String },
            delete: { type: String },
            expiry: { type: String },
            expired: { type: String },
            block: { type: String },
        },
        channel: [
            {
                meetingId: { type: String, required: true },
                meetingPassword: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String },
                email: { type: String },
                type: { type: String },
                active: { type: Boolean, default: true, required: true },
                app: [{ type: Number }],
            },
        ],
        schedule: [
            {
                eventName: { type: String, required: true },
                date: { type: String, required: true },
                time: { type: String },
                type: { type: String },
                active: { type: Boolean, default: true, required: true },
                app: [{ type: Number }],
            },
        ],
    },
    { timestamps: true, versionKey: false }
);

const Setting = new model('Setting', SettingSchema);

export default Setting;
