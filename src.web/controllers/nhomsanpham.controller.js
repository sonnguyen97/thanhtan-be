const nhomsanpham = require('../../database/models/nhomsanpham');
const { ENUM } = require('../../utils/index');
const { Op } = require("sequelize");
const sanpham = require('../../database/models/sanpham');

module.exports = {
    // Creating sanpham
    create: async(res) => {
        try {
            return await nhomsanpham.create({
                ten: res.name,
                nguoitao_id: res.user_id,
                trangthai: res.state
            })
        } catch (error) {
            return error
        }

    },
    // Updating sanpham
    update: async(res) => {
        try {
            return await nhomsanpham.update({
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
    // get one sanpham
    getOne: async(id) => {
        try {
            return await sanpham.findOne({
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    },
    // get many san pham
    getMany: async(id) => {
        try {
            return await nhomsanpham.findAll({
                include: [{
                    model: sanpham,
                    trangthai: 1
                }],
                where: {
                    id: id,
                    trangthai: ENUM.ENABLE
                },
                order: [
                    ['ngaytao', 'DESC']
                ]
            })
        } catch (error) {
            return error
        }
    },
    // disable sanpham
    disable: async(id) => {
        try {
            return await nhomsanpham.update({
                state: ENUM.DISABLE
            }, {
                where: {
                    id: id
                }
            })
        } catch (error) {
            return error
        }
    },
    // get many san pham
    getAll: async() => {
        // let nhomsanpham_id = body.nhomsanpham_id || "";
        try {
            return await nhomsanpham.findAll({
                where: {
                    trangthai: ENUM.ENABLE
                },
                order: [
                    ['ngaytao', 'DESC']
                ]
            })
        } catch (error) {
            return error
        }
    }
}