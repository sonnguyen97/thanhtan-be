const thanhvien = require('../../database/models/thanhvien');
const { ENUM } = require('../../utils/index');
const { Op } = require("sequelize");

module.exports = {
    // Creating thanhvien
    create: async(res) => {
        try {
            return await thanhvien.create({
                ten: res.name,
                nguoitao_id: res.user_id,
                trangthai: res.state
            })
        } catch (error) {
            return error
        }

    },
    // Updating thanhvien
    update: async(res) => {
        try {
            return await nhomthanhvien.update({
                ten: res.name,
                trangthai: res.state,
                nguoitao_id: res.user_id
            }, {
                where: {
                    id: res.id
                }
            })
        } catch (error) {
            return error
        }

    },
    // get one thanhvien
    getOne: async(id) => {
        try {
            return await thanhvien.findOne({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    },
    // get many san pham
    getMany: async(body) => {
        let limit = body.limit;
        let offset = body.offset;
        let quyen = body.quyen;
        try {
            return await thanhvien.findAll({
                where: {
                    state: quyen == "admin" ? "" : ENUM.ENABLE
                },
                order: [
                    ['ngaytao', 'DESC']
                ],
                offset: offset,
                limit: limit
            })
        } catch (error) {
            return error
        }
    },
    // disable thanhvien
    disable: async(id) => {
        try {
            return await thanhvien.update({
                state: ENUM.DISABLE
            }, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    }
}